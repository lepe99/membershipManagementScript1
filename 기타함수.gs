function printSelect() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('E2:K47').activate();
};


function onEdit(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var range = e.range;
  var sheetName = sheet.getName();
  
  // 조회 시트에서 변경된 셀이 C4이고 그 값이 변경되었다면
  if (sheetName === '조회' && range.getA1Notation() === 'C4' && e.value !== undefined) {
    sheet.getRange('E3').setValue("검색중...");
    var d4Range = sheet.getRange('D4');
    var dropdownValues = d4Range.getDataValidation().getCriteriaValues()[0].getValues();

    d4Range.setValue(dropdownValues[0][0]);
    onSearchButtonClick();
    sheet.getRange('E3').clearContent();
  }

  if (sheetName === '조회' && range.getA1Notation() === 'D4' && e.value !== undefined) {
    sheet.getRange('E3').setValue("검색중...");
    onSearchButtonClick();
    sheet.getRange('E3').clearContent();
  }

}

function sortByCol() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var selectedRange = sheet.getActiveRange();
  var columnNumber = selectedRange.getColumn(); // 선택한 셀의 열 번호를 가져옵니다.
  sortDate(columnNumber);
}

function getLastRowNumberInColumn1() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var dbsheet = spreadsheet.getSheetByName('데이터'); // 시트 이름을 여기에 입력하세요.
  var column = dbsheet.getRange(4, 2, dbsheet.getMaxRows() - 3); // 열 범위를 설정합니다.
  var values = column.getValues();
  var lastRow = values.filter(String).length + 3; // 비어 있지 않은 셀의 수를 계산하여 마지막 행 번호를 가져옵니다.
  return lastRow;
}

function getLastRowNumberInColumn(columnNumber) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var dbsheet2 = spreadsheet.getSheetByName('데이터2'); // 시트 이름을 여기에 입력하세요.
  var column = dbsheet2.getRange(4, columnNumber, dbsheet2.getMaxRows() - 4); // 열 범위를 설정합니다.
  var values = column.getValues();
  var lastRow = values.filter(String).length; // 비어 있지 않은 셀의 수를 계산하여 마지막 행 번호를 가져옵니다.
  return lastRow;
}

function sortDate(col) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var dbsheet2 = spreadsheet.getSheetByName('데이터2');
  var range = dbsheet2.getRange(4, col, dbsheet2.getMaxRows() - 3);
  range.sort({column: col, ascending: true});
}

