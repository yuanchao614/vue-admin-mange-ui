 /** 
* 获得相对当月AddMonthCount个月的起止日期 
* AddMonthCount为0 代表当月 为-1代表上一个月 为1代表下一个月 以此类推
* ***/ 
export function getMonthStartAndEnd(AddMonthCount) {
    //起止日期数组
    var startStop = new Array();
    //获取当前时间
    var currentDate = new Date();
    var month = currentDate.getMonth() + AddMonthCount;
    if (month < 0) {
      var n = parseInt(-month / 12);
      month += n * 12;
      currentDate.setFullYear(currentDate.getFullYear() - n);
    }
    currentDate = new Date(currentDate.setMonth(month));
    //获得当前月份0-11
    var currentMonth = currentDate.getMonth();
    //获得当前年份4位年
    var currentYear = currentDate.getFullYear();
    //获得上一个月的第一天
    var currentMonthFirstDay = new Date(currentYear, currentMonth, 1);
    //获得上一月的最后一天
    var currentMonthLastDay = new Date(currentYear, currentMonth + 1, 0);
    //添加至数组
    startStop.push(getDateStr3(currentMonthFirstDay));
    startStop.push(getDateStr3(currentMonthLastDay));
    //返回
    return startStop;
  }

  //获取当前日期yy-mm-dd
//date 为时间对象
export function getDateStr3(date) {
  var year = "";
  var month = "";
  var day = "";
  var now = date;
  year = ""+now.getFullYear();
  if((now.getMonth()+1)<10){
    month = "0"+(now.getMonth()+1);
  }else{
    month = ""+(now.getMonth()+1);
  }
  if((now.getDate())<10){
    day = "0"+(now.getDate());
  }else{
    day = ""+(now.getDate());
  }
  return year+"-"+month+"-"+day;
}

// 获取明天日期
export function getNextDate(date) {
  var year = "";
  var month = "";
  var day = "";
  var now = date;
  year = ""+now.getFullYear();
  if((now.getMonth()+1)<10){
    month = "0"+(now.getMonth()+1);
  }else{
    month = ""+(now.getMonth()+1);
  }
  if((now.getDate())<10){
    day = "0"+(now.getDate() + 1);
  }else{
    day = ""+(now.getDate() + 1);
  }
  return year+"-"+month+"-"+day;
}