module.exports = {
  getDate: () => {
    var date_ob = new Date();
    var date = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    return date + "/" + month + "/" + year;
  },
};
