function doGet() {
    return HtmlService.createHtmlOutputFromFile('Index')
        .setTitle("Controle de Faltas - Dashboard")
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  
  function getAlunos() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("6ª TURMA - DIÁRIO - PROGRAMADOR DE WEB");
    var data = sheet.getRange("A6:AF").getValues();
  
    var alunos = data.map(row => ({
      nome: row[1],
      faltas: row[row.length - 2] // Penúltima coluna é "Faltas"
    })).filter(a => a.nome && a.faltas !== ""); // Filtrar linhas vazias
  
    alunos.sort((a, b) => b.faltas - a.faltas); // Mais faltas primeiro
  
    return alunos;
  }
  
  function getFilteredAlunos(query) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("6ª TURMA - DIÁRIO - PROGRAMADOR DE WEB");
    var data = sheet.getRange("A6:AF").getValues();
  
    var alunos = data.map(row => ({
      nome: row[1],
      faltas: row[row.length - 2]
    })).filter(a => a.nome && a.faltas !== "");
  
    if (query) {
      alunos = alunos.filter(a => a.nome.toLowerCase().startsWith(query.toLowerCase()));
    }
  
    return alunos;
  }