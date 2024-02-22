function deleteMemberInfo() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var dbSheet = spreadsheet.getSheetByName('데이터');
  var sheet = spreadsheet.getSheetByName('조회');
  var searchName = sheet.getRange('D9').getValue();
  var searchMemberNumber = sheet.getRange('D8').getValue();
  
  var lastRow = dbSheet.getLastRow();
  var dataRange = dbSheet.getRange(4, 2, lastRow - 3, 12);
  var data = dataRange.getValues();
  

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    if (row[0] == searchMemberNumber && row[1] == searchName) { // 이름과 회원번호가 일치하는 항목 찾기

      // 일치하는 항목의 행 삭제
      dbSheet.deleteRow(i + 4); 
      resetfunc1()
      SpreadsheetApp.getUi().alert('삭제 완료되었습니다.');
      return;
      
    }
  }
  
  // 여기까지 왔다면 일치하는 항목이 없는 것임을 알림
  SpreadsheetApp.getUi().alert('일치하는 항목을 찾을 수 없습니다.');
}
