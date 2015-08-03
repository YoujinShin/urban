Template.map.helpers({
  roundValue: function (value) {
    return parseFloat(value).toFixed(2);
  },
  isNull: function (data) {
  	if(data!=null) { return false; }
  	else { return true;}
  }
});