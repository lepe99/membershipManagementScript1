function resetfunc() {
  var spreadsheet = SpreadsheetApp.getActive();
  var lastRow = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getLastRow();
  spreadsheet.getRangeList(['D8:D10', 'D12:D13', 'D20', 'F9:F12', 'K3:K' + lastRow]).clear({contentsOnly: true, skipFilteredRows: true});
};

function resetfunc1() {
  var spreadsheet = SpreadsheetApp.getActive();
  var lastRow = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getLastRow();
  spreadsheet.getRange('K3:K' + lastRow).clear({contentsOnly: true, skipFilteredRows: true});
};
