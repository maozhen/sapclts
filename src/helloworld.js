const vscode = require("vscode");

var helloWorldCommand = vscode.commands.registerCommand(
    "sapclts.helloWorld",
    async function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from SAPCLTS!");
      var newFile = await vscode.commands.executeCommand("workbench.action.files.newUntitledFile");
      console.log("newFile: ", newFile);
    }
  );

  exports.helloWorldCommand = helloWorldCommand;