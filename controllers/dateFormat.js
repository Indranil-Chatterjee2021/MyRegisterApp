module.exports = {
  getDate: () => {
    var date_ob = new Date();
    var date = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    return date + "/" + month + "/" + year;
  },
  getTime: () => {
    var times = new Date();
    var date = ("0" + times.getDate()).slice(-2);
    var month = ("0" + (times.getMonth() + 1)).slice(-2);
    var year = times.getFullYear();
    var Hr = new times.getHours();
    var Min = ("0" + times.getMinutes()).slice(-2);
    var Sec = ("0" + times.getSeconds()).slice(-2);
    return date + "/" + month + "/" + year + " " + Hr + ":" + Min + ":" + Sec;
  },
};
