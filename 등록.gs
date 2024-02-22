function addMemberInfo(name, call, address, howEnter, route, memberType, payDate, payRound, etc) {
  var dbSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('데이터');
  var cLastRow = getLastRowNumberInColumn1();
  var num = dbSheet.getRange('A2').getValue();
  var nNum = num + 1;
  dbSheet.getRange('A2').setValue(nNum);
  dbSheet.getRange(cLastRow + 1, 2).setValue(nNum);
  dbSheet.getRange(cLastRow + 1, 3).setValue(name);
  dbSheet.getRange(cLastRow + 1, 4).setValue(call);
  dbSheet.getRange(cLastRow + 1, 5).setValue(address);
  dbSheet.getRange(cLastRow + 1, 6).setValue(howEnter);
  dbSheet.getRange(cLastRow + 1, 7).setValue(route);
  dbSheet.getRange(cLastRow + 1, 8).setValue(memberType);
  dbSheet.getRange(cLastRow + 1, 9).setValue(payDate);
  dbSheet.getRange(cLastRow + 1, 10).setValue(payRound);
  dbSheet.getRange(cLastRow + 1, 14).setValue(etc);

}

function onInputButtonClick() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('조회');
  var dbSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('데이터');
  var cLastRow = getLastRowNumberInColumn1();

  var name = sheet.getRange('D9').getValue();
  var call = sheet.getRange('D10').getValue();
  var address = sheet.getRange('D13').getValue();
  var howEnter = sheet.getRange('D12').getValue();
  var route = sheet.getRange('D11').getValue();
  var memberType = sheet.getRange('F7').getValue();
  var payDate = sheet.getRange('F8').getValue();
  var payRound = sheet.getRange('F9').getValue();
  var etc = sheet.getRange('D20').getValue();
  
  if (name == "") {
    SpreadsheetApp.getUi().alert('회원명을 입력해주세요.');
    return;
  }

  var dataRange = dbSheet.getRange(4, 2, cLastRow - 2, 3); // 시트 범위
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][2].toString().slice(-4) == call.toString().slice(-4) && data[i][1] == name) {
      SpreadsheetApp.getUi().alert('이미 등록된 회원입니다.');
      return;
    }
  }

  addMemberInfo(name, call, address, howEnter, route, memberType, payDate, payRound, etc);

  var d1 = dbSheet.getRange(cLastRow + 1, 2).getValue();
  var d2 = dbSheet.getRange(cLastRow + 1, 11).getValue();
  var d3 = dbSheet.getRange(cLastRow + 1, 12).getValue();
  var d4 = dbSheet.getRange(cLastRow + 1, 13).getValue();
  sheet.getRange('D8').setValue(d1);
  sheet.getRange('F10').setValue(d2);
  sheet.getRange('F11').setValue(d3);
  sheet.getRange('F12').setValue(d4);


  SpreadsheetApp.getUi().alert('신규 회원 정보가 등록되었습니다.');

}
