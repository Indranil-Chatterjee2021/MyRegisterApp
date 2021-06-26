const Host = require("os"); // For getting the hostname..
var address = require("address"); // For getting the IP address..

const multer = require("multer");
const User = require("../models/user.model");
// For Image Upload in the database.....
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
}).single("img");
// ..............................................

exports.getLogin = (req, res) => {
  res.render("login", { logOut: req.flash("logout") });
};

exports.getRegister = (req, res) => {
  res.render("register");
};

exports.create = async (req, res) => {
  // var pwdLen = req.body.password;
  // var passlen = pwdLen.toString();
  // console.log(passlen.length);
  // if (pwdLen.value.lenght < 6) {
  //   req.flash("errs", "Password must be 6 chars !!");
  //   res.redirect("/register");
  //} else {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send("Something went wrong!");
      console.log(err);
    } else {
      if (req.body)
        User.findOne({ email: req.body.email }, function (err, data) {
          if (!data) {
            var c;
            User.findOne({}, function (err, data) {
              if (data) {
                console.log("if");
                c = data.unique_id + 1;
              } else {
                c = 1;
              }

              var newPerson = new User({
                unique_id: c,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                passwordConf: req.body.passwordConf,
                image: req.file.originalname,
                createdAt: getDateTime(),
                loginAt: "N",
                host: Host.hostname(),
                ipAddr: address.ip(),
                logoutAt: "N",
              });

              newPerson.save(function (err, users) {
                if (err) console.log(err);
                else console.log("Success");
                //res.redirect("/");
              });
            })
              .sort({ _id: -1 })
              .limit(1);
            //req.flash("Success", "You Are Registered Successfully !!");
            res.redirect("/");
          } else {
            req.flash("err", "Email is already registered !!");
            res.redirect("/register");
          }
        });
    }
  });
  //}

  //}
  // if (req.body.passwordConf != req.body.password) {
  //   req.flash("errs", "Password is not matched !!");
  //   res.redirect("/register");
  // }
};

// Create New User...
exports.creates = (req, res) => {
  console.log(req.body);
  var personInfo = req.body;
  //var RegDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  var date = new Date();
  var RegDate =
    date.toISOString().replace(/T.*/, "").split("-").reverse().join("/") +
    " " +
    date.toLocaleTimeString().split(" ")[0];

  if (
    !personInfo.email ||
    !personInfo.username ||
    !personInfo.password ||
    !personInfo.passwordConf
  ) {
    res.send();
  } else {
    if (personInfo.password == personInfo.passwordConf) {
      User.findOne({ email: personInfo.email }, function (err, data) {
        if (!data) {
          var c;
          User.findOne({}, function (err, data) {
            if (data) {
              console.log("if");
              c = data.unique_id + 1;
            } else {
              c = 1;
            }

            var newPerson = new User({
              unique_id: c,
              email: personInfo.email,
              username: personInfo.username,
              password: personInfo.password,
              passwordConf: personInfo.passwordConf,
              createdAt: RegDate,
              //loginAt: "N",
              host: Host.hostname(),
              ipAddr: address.ip(),
              //logoutAt: "N",
            });

            newPerson.save(function (err, Person) {
              if (err) console.log(err);
              else console.log("Success");
            });
          })
            .sort({ _id: -1 })
            .limit(1);
          res.send({ Success: "You are registered,You can login now." });
        } else {
          res.send({ Success: "Email is already registered." });
        }
      });
    } else {
      res.send({ Success: "Passwords are not matched" });
    }
  }
};

//Change/Forget Password...
exports.forgetPwd = (req, res) => {
  User.findOne({ email: req.body.email }, function (err, data) {
    console.log(data);
    if (!data) {
      res.send({ Success: "This Email is not registered!" });
    } else {
      // res.send({"Success":"Success!"});
      if (req.body.password == req.body.passwordConf) {
        data.password = req.body.password;
        data.passwordConf = req.body.passwordConf;

        data.save(function (err, Person) {
          if (err) console.log(err);
          else console.log("Success");
          res.send({ Success: "Password changed!" });
        });
      } else {
        res.send({
          Success: "Passwords are not matched! Both Password should be same.",
        });
      }
    }
  });
};

var userId = "";
var UsrNm = "";
var Email = "";
//Login to system...
exports.logIn = (req, res) => {
  Email = req.body.email;
  //var LoginDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  var date = new Date();
  var LoginDate =
    date.toISOString().replace(/T.*/, "").split("-").reverse().join("/") +
    " " +
    date.toLocaleTimeString().split(" ")[0];

  User.findOne({ email: req.body.email }, function (err, data) {
    if (data) {
      if (data.password == req.body.password) {
        User.updateOne(
          { email: Email },
          {
            $set: {
              loginAt: LoginDate,
              host: Host.hostname(),
              ipAddr: address.ip(),
              logoutAt: "",
            },
          },
          function (err, res) {
            if (err) throw err;
            //console.log(`LogIn At:  ${logIn_time}`);
            console.log("1 document updated : " + data.unique_id);
            req.session.userId = data.unique_id;
            req.session.userName = data.username;
            userId = req.session.userId;
            UsrNm = req.session.userName;
            console.log(req.session.userId);
            console.log(UsrNm);
          }
        );
        res.send({ Success: "Success!" });
      } else {
        res.send({ Success: "Wrong password!" });
      }
    } else {
      res.send({ Success: "This Email Is not registered!" });
    }
  });
};

//LogOut from system...
exports.logOut = (req, res) => {
  var uid = userId;
  console.log(uid);
  if (req.session) {
    var date = new Date();
    var LogOutDate =
      date.toISOString().replace(/T.*/, "").split("-").reverse().join("/") +
      " " +
      date.toLocaleTimeString().split(" ")[0];
    User.updateOne(
      { unique_id: uid },
      {
        $set: {
          logoutAt: LogOutDate,
        },
      },
      function (err, data) {
        if (err) throw err;
        //console.log(`LogOut At:  ${logOut_time}`);
        console.log("1 document updated, logout done : ");
      }
    );
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        userId = "";
        req.session = null;
        //console.log(uID);
        return res.redirect("/");
      }
    });
  }
};

exports.userList = (req, res) => {
  // console.log("USER EMAIL " + Email);
  // var usrnme = "";
  // User.findOne({ email: Email }, function (err, data) {
  //   if (data) {
  //     usrnme = data.username;
  //     console.log("USER NAME " + usrnme);
  //   }
  // });

  const postPerPage = 5;
  const page = req.query.page || 1;
  User.find({})
    .lean()
    .skip(postPerPage * page - postPerPage)
    .limit(postPerPage)
    .then((docs) => {
      User.countDocuments().then((userCount) => {
        res.render("home", {
          list: docs,
          current: parseInt(page),
          pages: Math.ceil(userCount / postPerPage),
          // UNM: usrnme,
        });
      });
    });
};
