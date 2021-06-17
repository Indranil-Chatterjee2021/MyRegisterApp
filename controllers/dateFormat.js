module.exports = {
  getDate: () => {
    var date_ob = new Date();
    var date = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    return date + "/" + month + "/" + year;
  },
  getDateTime: () => {
    var dateTime = new Date();

    var date = ("0" + dateTime.getDate()).slice(-2);
    var month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
    var year = dateTime.getFullYear();

    var hrs = dateTime.getHours();
    var mins = dateTime.getMinutes();
    var scnds = dateTime.getSeconds();

    return (
      date + "/" + month + "/" + year + " " + hrs + ":" + mins + ":" + scnds
    );
  },
};
