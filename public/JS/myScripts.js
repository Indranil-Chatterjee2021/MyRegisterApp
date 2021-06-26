// Used for Department name selection in Employee Form...
function selectChanger() {
  var d = document.getElementById("selector");
  var deptbox = d.options[d.selectedIndex].text;
  document.getElementById("deptBox").value = deptbox;
}
// Used for Validate when Update Department Record...
function ValidateDeptUpdate() {
  var dName = document.getElementById("deptName").value;
  var regEx = /^[a-zA-Z\s]*$/;
  if (dName == "") {
    alert("Department name is required !!");
    document.getElementById("deptName").focus();
    return false;
  }
  if (!regEx.test(dName)) {
    alert("Only Characters with white space are allowed !!");
    document.getElementById("deptName").focus();
    return false;
  }
}
// Used for Validate when Update Employee Record...
function ValidateEmpUpdate() {
  var eName = document.getElementById("empName").value;
  var eAddr = document.getElementById("addr").value;
  var eMobile = document.getElementById("mobile").value;
  var eEmail = document.getElementById("email").value;
  var eSalary = document.getElementById("salary").value;

  var NameregEx = /^[a-zA-Z\s]*$/;
  var AddregEx = /^[a-zA-Z0-9\s,.-]{3,}$/;
  var EmailregEx = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
  var MobregEx =
    /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/;
  var SalregEx = /^[1-9][0-9]*(\.[0-9])?/;

  if (eName == "") {
    alert("Employee name is required !!");
    document.getElementById("empName").focus();
    return false;
  }
  if (!NameregEx.test(eName)) {
    alert("Only Characters with white space are allowed !!");
    document.getElementById("empName").focus();
    return false;
  }
  if (eAddr == "") {
    alert("Address is required !!");
    document.getElementById("addr").focus();
    return false;
  }
  if (!AddregEx.test(eAddr)) {
    alert("Please enter valid address !!");
    document.getElementById("addr").focus();
    return false;
  }
  if (eEmail == "") {
    alert("Email is required !!");
    document.getElementById("email").focus();
    return false;
  }
  if (!EmailregEx.test(eEmail)) {
    alert("Invalid email address !!");
    document.getElementById("email").focus();
    return false;
  }
  if (eMobile == "") {
    alert("Mobile No is required !!");
    document.getElementById("mobile").focus();
    return false;
  }
  if (isNaN(eMobile) || eMobile.length != 10) {
    alert("Mobile No should be 10 digits long !!");
    document.getElementById("mobile").focus();
    return false;
  }
  if (!MobregEx.test(eMobile)) {
    alert("Mobile No must be start with digits 6,7,8,9 !!");
    document.getElementById("mobile").focus();
    return false;
  }
  if (eSalary == "") {
    alert("Salary is required !!");
    document.getElementById("salary").focus();
    return false;
  }
  if (isNaN(eSalary)) {
    alert("Salary must be in digits !!");
    document.getElementById("salary").focus();
    return false;
  }
  if (!SalregEx.test(eSalary)) {
    alert("Salary should be a positve value !!");
    document.getElementById("salary").focus();
    return false;
  }
}

// Used for Registered Page Validation Purpose ...
function validateRegForm() {
  var email = document.forms["form1"]["email"].value;
  var username = document.forms["form1"]["username"].value;
  var password = document.forms["form1"]["password"].value;
  var pwd = document.getElementById("pwd").value;
  var pwdconf = document.forms["form1"]["passwordConf"].value;

  var NameregEx = /^[a-zA-Z\s]*$/;
  var EmailregEx = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
  var pwdRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (email == "") {
    alert("Email is required !!");
    document.forms["form1"]["email"].focus();
    return false;
  } else if (!EmailregEx.test(email)) {
    alert("Invalid Email Address !!");
    document.forms["form1"]["email"].focus();
    return false;
  } else if (username == "") {
    alert("Username is required !!");
    document.forms["form1"]["username"].focus();
    return false;
  } else if (!NameregEx.test(username)) {
    alert("Only Characters with white space are allowed !!");
    document.forms["form1"]["username"].focus();
    return false;
  } else if (password == "") {
    alert("Password is required !!");
    document.forms["form1"]["password"].focus();
    return false;
  } else if (pwd.length < 8) {
    alert("Password must contains 8 chars long !!");
    document.forms["form1"]["password"].focus();
    return false;
  } else {
    $.ajax({
      type: "POST",
      url: "/",
      data: $("#form1").serialize(),
      dataType: "json",
      success: function (response) {
        //alert("a");
        //console.log(response.Success);
        $("#form1")[0].reset();

        document.getElementById("check").innerHTML = response.Success;
        //ADD THIS CODE
        setTimeout(function () {
          document.getElementById("check").innerHTML = "";
        }, 6000); // 6seconds
        if (response.Success == "You are registered,You can login now.") {
          document.getElementById("aa").click();
        }
      },
      error: function () {},
    });
    return true;
  }
}

// Used for Forget Password Validation Purpose ...
function validateForgetPwdForm() {
  var email = document.forms["form2"]["email"].value;
  var password = document.forms["form2"]["password"].value;
  var cnfpwd = document.forms["form2"]["passwordConf"].value;

  if (email == "") {
    alert("Enter your registered email address !!");
    document.forms["form2"]["email"].focus();
    return false;
  } else if (password == "") {
    alert("Password is required !!");
    document.forms["form2"]["password"].focus();
    return false;
  } else if (password.length < 8) {
    alert("Password must contains 8 chars long !!");
    document.forms["form2"]["password"].focus();
    return false;
  } else if (cnfpwd == "") {
    alert("Confirm Password is required !!");
    document.forms["form2"]["passwordConf"].focus();
    return false;
  } else {
    $.ajax({
      type: "POST",
      url: "/forgetpass",
      data: $("#form2").serialize(),
      dataType: "json",
      success: function (response) {
        //alert("a");
        //console.log(response.Success);
        $("#form2")[0].reset();
        //alert("abc");
        document.getElementById("check").innerHTML = response.Success;

        setTimeout(function () {
          document.getElementById("check").innerHTML = "";
        }, 6000); // 6seconds
        if (response.Success == "Password changed!") {
          document.getElementById("aa").click();
        }
      },
      error: function () {},
    });
    return true;
  }
}
// When User try to close the Browser or Tab ...
// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   e.returnValue = "";
//   $.ajax({
//     type: "GET",
//     url: "/logout",
//     dataType: "json",
//     success: function (response) {},
//     error: function () {},
//   });
// });
