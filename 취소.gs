function cancleDate() {

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
  

  for (var i = 0; i <= data[0].length; i++) {
    if (data[0][i] == memberNumber && data[1][i] == name) { // 이름과 회원번호가 일치하는 항목 찾기
      for (var j = 2; j < data.length; j++) {
        try {
          if (data[j][i].getTime() === date.getTime()) {
            dbSheet2.getRange(j + 2, i + 3).clearContent();
            sortDate(i + 3);

            var cLastRow = getLastRowNumberInColumn(i + 3)
            var dates = dbSheet2.getRange(4, i + 3, cLastRow + 1).getValues();
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            var futureDates = dates.filter(function(date) {
            return date[0] instanceof Date && date[0].getTime() >= today.getTime();
            });
            resetfunc1();
            sheet.getRange(3, 11, futureDates.length).setValues(futureDates);

            SpreadsheetApp.getUi().alert('취소 완료되었습니다.');
            return;
          }
        } catch(error) {}
      }
      SpreadsheetApp.getUi().alert('일치하는 항목을 찾을 수 없습니다.');
      return;
    }
  } 
}
