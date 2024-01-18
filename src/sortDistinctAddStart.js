const vscode = require("vscode");

const sortDistinctAddStartCommand = vscode.commands.registerTextEditorCommand(
    "sapclts.SortDistinctAddStart",
    (textEditor, edit) => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      function makeRange(start, end, document) {
        start = start.with(start.line, 0);
        end = document.lineAt(end.line).range.end;
        return new vscode.Range(start, end);
      }
      let start = textEditor.selection.start;
      let end = textEditor.selection.end;
      let range = makeRange(start, end, textEditor.document);
      let text = textEditor.document.getText(range);
      var lines = text.split("\r\n").filter((l) => l.trim() !== "");
      var newLines = Array.from(
        lines
          .map((v) => {
            var nline = v.trim();
            if (nline.charAt(0) !== "*") {
              nline = "*" + nline;
            }
            if (nline.charAt(nline.length - 1) !== "*") {
              nline = nline + "*";
            }
            return nline;
          })
          .reduce((pL, cL) => {
            pL.add(cL);
            return pL;
          }, new Set())
      );
      var newText = newLines.join("\r\n");
      textEditor.edit((editBuilder) => {
        editBuilder.replace(range, newText);
      });
    }
  );
  
  exports.sortDistinctAddStartCommand = sortDistinctAddStartCommand;  