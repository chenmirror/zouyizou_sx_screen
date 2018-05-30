// 双联动日期示例
(function(){
	  var dateFirst = $('#startDate');//开始时间
	  var dateLast = $('#endDate');//结束时间
	  var dateFirstApi;
	  var dateLastApi;
	  var nowDate=new Date(),firstOneDay=new Date();
		  dateFirst.cxCalendar(function(api){
		  api.clearDate();
		  dateFirstApi = api;
	  });
	  dateLast.cxCalendar(function(api){
	  	  api.clearDate();
	  	  dateLastApi = api;
	  });
	  dateFirst.bind('change', function(){
	      var firstTime = parseInt(dateFirstApi.getDate('TIME'), 10);
	      var lastTime = parseInt(dateLastApi.getDate('TIME'), 10);
	      if (lastTime < firstTime) {
	          dateLastApi.clearDate();
	      };
	      dateLastApi.setOptions({
	          startDate: firstTime
	      });
	      dateLastApi.gotoDate(firstTime);
	      dateLastApi.show();
	  });
	  dateFirstApi.setDate(getLastMonth());
	  dateLastApi.setDate(nowDate);
})();

function getLastMonth(){
	var nowdays = new Date();
    var year = nowdays.getFullYear();
    var month = nowdays.getMonth();
    var firstDay = year + "-" + month + "-" + "01";//上个月的第一天
    return firstDay;
}