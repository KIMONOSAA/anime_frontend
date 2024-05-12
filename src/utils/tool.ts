function getRandomNumberByRange(start: number, end: number) {
    return Math.round(Math.random() * (end - start) + start);
  }
  
  function sum(x: number, y: number) {
    return x + y;
  }
  
  function square(x: number) {
    return x * x;
  }

  function convertArrays(x : string[]){
    const str = new String(x);
    const strs = str.substring(1,str.length - 1)
    const array = strs.split(',')
    return array
  }

  function getCurrentWeekDates() {  
    // 获取当前日期  
    const now = new Date();  
    const dayOfWeek = now.getDay(); // 周日：0, 周一：1, ..., 周六：6  
    let year = now.getFullYear();  
    let month = now.getMonth() + 1; // 注意月份是从0开始的  
    let date = now.getDate();  
  
    // 格式化月份（小于10的月份前面补0）  
    if (month < 10) {  
        month = Number('0' + month);  
    }  
  
    // 格式化日期（小于10的日期前面补0）  
    if (date < 10) {  
        date = Number('0' + date);  
    }  
  
    // 当前周所有日期的数组  
    const weekDates = [];  
  
    // 从周一开始，遍历到周日  
    for (let i = 0; i < 7; i++) {  
        // 使用setDate()方法设置日期（注意：setDate()接受的是从1开始的日期）  
        // 如果计算出的日期小于1，则表示是上个月的最后几天，需要调整年份和月份  
        let targetDate = new Date(year, month - 1, date - dayOfWeek + i + 1);  
        if (targetDate.getMonth() !== month - 1) {  
            // 如果月份变了，说明是上个月的最后几天，需要回退到上个月并重新计算日期  
            targetDate.setDate(0); // 设置日期为0会回退到上个月的最后一天  
            targetDate.setDate(targetDate.getDate() + 8 - dayOfWeek + i); // 加上相应的天数  
            month = targetDate.getMonth() + 1; // 更新月份  
            year = targetDate.getFullYear(); // 更新年份  
        }  
  
        // 格式化日期并添加到数组中  
        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${targetDate.getDate() < 10 ? '0' + targetDate.getDate() : targetDate.getDate()}`;  
        weekDates.push(formattedDate);  
    }  
  
    return weekDates;  
}  
export { getRandomNumberByRange, sum, square, convertArrays, getCurrentWeekDates };
  