const vscode = require("vscode");

const sortDistinctRemoveCommand = vscode.commands.registerTextEditorCommand(
    "sapclts.SortDistinctRemove",
    async (textEditor, edit) => {

      var selectedText = 'DE_;XX_;_OP';

      var searchQuery = await vscode.window.showInputBox({
        placeHolder: "Search query",
        prompt: "Search ",
        value: selectedText
      });

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
      var finds = searchQuery.split(";");

      var newLines = Array.from(
        lines
          .map((v) => {
            var nline = v.trim();
            finds.forEach((f) => { nline = nline.replace(f, ""); });
            return nline;
          })
          .reduce((pL, cL) => {
            pL.add(cL);
            return pL;
          }, new Set())
      );
      var newText = newLines.join(" ");
      textEditor.edit((editBuilder) => {
        editBuilder.replace(range, newText);
      });
    }
  );
  
  exports.sortDistinctRemoveCommand = sortDistinctRemoveCommand;  