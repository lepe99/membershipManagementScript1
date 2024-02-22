function updateMemberInfo() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var dbSheet = spreadsheet.getSheetByName('데이터');
  var sheet = spreadsheet.getSheetByName('조회');
  var searchName = sheet.getRange('D9').getValue();
  var searchMemberNumber = sheet.getRange('D8').getValue();
  
  var lastRow = getLastRowNumberInColumn1();
  var dataRange = dbSheet.getRange(4, 2, lastRow - 3, 9);
  var data = dataRange.getValues();
  
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    if (row[0] == searchMemberNumber && row[1] == searchName) { // 이름과 회원번호가 일치하는 항목 찾기
      // 일치하는 항목의 정보를 시트 2의 정보로 업데이트
      row[2] = sheet.getRange('D10').getValue();; // 연락처
      row[5] = sheet.getRange('D11').getValue();; // 유입경로
      row[4] = sheet.getRange('D12').getValue();; // 출입방법
      row[3] = sheet.getRange('D13').getValue();; // 주소
      row[6] = sheet.getRange('F7').getValue();; // 회원권종
      row[7] = sheet.getRange('F8').getValue();; // 결제일
      row[8] = sheet.getRange('F9').getValue();; // 결제회차
      dataRange.offset(i, 0, 1, data[0].length).setValues([row]);

      var d5 = sheet.getRange('D20').getValue();
      dbSheet.getRange(i + 4, 14).setValue(d5);

      var d2 = dbSheet.getRange(i + 4, 11).getValue();
      var d3 = dbSheet.getRange(i + 4, 12).getValue();
      var d4 = dbSheet.getRange(i + 4, 13).getValue();
      sheet.getRange('F10').setValue(d2);
      sheet.getRange('F11').setValue(d3);
      sheet.getRange('F12').setValue(d4);
      
      // 업데이트가 끝났으므로 더 이상 반복할 필요 없음
      SpreadsheetApp.getUi().alert('수정이 완료되었습니다.');
      return;
    }
  }
  
  // 여기까지 왔다면 일치하는 항목이 없는 것임을 알림
  SpreadsheetApp.getUi().alert('일치하는 항목을 찾을 수 없습니다.');
}
