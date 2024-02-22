function searchMemberInfo(name, contactLast4Digits) {
  var dbSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('데이터');
  var lastRow = getLastRowNumberInColumn1();
  var dataRange = dbSheet.getRange(4, 2, lastRow - 3, 13); // 시트 범위
  var data = dataRange.getValues();
  
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    if (row[1] == name && row[2].toString().slice(-4) == contactLast4Digits) { // 이름과 연락처 뒤 4자리가 일치하는지 확인
      return [row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12]]; // 이름, 연락처, 추가 정보를 반환
    }
  }
  
  return null; // 일치하는 정보가 없을 경우 null 반환
}

// 검색 버튼을 눌렀을 때 호출되는 함수
function onSearchButtonClick() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('조회');
  var name = sheet.getRange('C4').getValue();
  var contactLast4Digits = sheet.getRange('D4').getValue();
  
  var result = searchMemberInfo(name, contactLast4Digits);
  
  if (result) {
    sheet.getRange('D8').setValue(result[0]); // 회원번호
    sheet.getRange('D9').setValue(result[1]); // 회원명
    sheet.getRange('D10').setValue(result[2]); // 연락처
    sheet.getRange('D13').setValue(result[3]); // 주소
    sheet.getRange('D12').setValue(result[4]); // 출입 방법
    sheet.getRange('D11').setValue(result[5]); // 유입 경로
    sheet.getRange('F7').setValue(result[6]); // 회원권종
    sheet.getRange('F8').setValue(result[7]); // 결제일
    sheet.getRange('F9').setValue(result[8]); // 결제회차
    sheet.getRange('F10').setValue(result[9]); // 미사용
    sheet.getRange('F11').setValue(result[10]); // 예약가능
    sheet.getRange('F12').setValue(result[11]); // 누적사용회차
    sheet.getRange('D20').setValue(result[12]); // 비고
    
    var dbSheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('데이터2');
    var lastRow = dbSheet2.getLastRow();
    var lastColumn = dbSheet2.getLastColumn();
    var dataRange = dbSheet2.getRange(2, 3, lastRow - 1, lastColumn - 1);
    var data = dataRange.getValues();
    for (var i = 0; i <= data[0].length; i++) {
      if (data[0][i] == result[0] && data[1][i] == result[1]) { // 이름과 회원번호가 일치하는 항목 찾기
        var cLastRow = getLastRowNumberInColumn(i + 3)
        var dates = dbSheet2.getRange(4, i + 3, cLastRow + 1).getValues();
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var futureDates = dates.filter(function(date) {
        return date[0] instanceof Date && date[0].getTime() >= today.getTime();
      });
      resetfunc1();
      sheet.getRange(3, 11, futureDates.length).setValues(futureDates);
      return;
      }
    }

  } else {
    // 일치하는 정보가 없는 경우 메시지 표시
    SpreadsheetApp.getUi().alert('일치하는 정보가 없습니다.');
  }
}
