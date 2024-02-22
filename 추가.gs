function addDate() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('조회');
  var dbSheet2 = spreadsheet.getSheetByName('데이터2');
  var name = sheet.getRange('D9').getValue();
  var memberNumber = sheet.getRange('D8').getValue();
  var date = sheet.getRange('D16').getValue();
  var lastRow = dbSheet2.getLastRow();
  var lastColumn = dbSheet2.getLastColumn();
  var dataRange = dbSheet2.getRange(2, 3, lastRow - 1, lastColumn - 1);
  var data = dataRange.getValues();
  var dataRange1 = dbSheet2.getRange(4, 3, lastRow - 1, lastColumn - 1);
  var dateData = dataRange1.getValues();
  
  if (memberNumber == "") {
    SpreadsheetApp.getUi().alert('예약을 추가 할 회원을 지정해주세요.');
    return;
  }

  for (var i = 0; i <= data[0].length; i++) {
    if (data[0][i] == memberNumber && data[1][i] == name) { // 이름과 회원번호가 일치하는 항목 찾기
      var cLastRow = getLastRowNumberInColumn(i + 3)
      
      try {
        for (var j = 0; j <= dateData.length; j++) {
          if (dateData[j][i].getTime() === date.getTime()) {
            SpreadsheetApp.getUi().alert('이미 예약된 날짜입니다.');
            return;
          }
        }
      } catch(error) {}

      dbSheet2.getRange(cLastRow + 4, i + 3).setValue(date);
      sortDate(i + 3);
      var dates = dbSheet2.getRange(4, i + 3, cLastRow + 1).getValues();
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var futureDates = dates.filter(function(date) {
        return date[0] instanceof Date && date[0].getTime() >= today.getTime();
      });
      resetfunc1();
      sheet.getRange(3, 11, futureDates.length).setValues(futureDates);

      SpreadsheetApp.getUi().alert('추가 완료되었습니다.');
      return;
    }
  }

  dbSheet2.getRange(2, lastColumn + 1).setValue(memberNumber);
  dbSheet2.getRange(3, lastColumn + 1).setValue(name);
  dbSheet2.getRange(4, lastColumn + 1).setValue(date);

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date.getTime() >= today.getTime()) {
    resetfunc1();
    sheet.getRange(3, 11).setValue(date);
  }

  SpreadsheetApp.getUi().alert('추가 완료되었습니다.');
    
}
