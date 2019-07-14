// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as clipboard from 'clipboardy';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.copy-correct-indent', () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			console.log('There is no active editor.');
			return;
		}

		if (editor.selection.isEmpty) {
			console.log('There is no code has been selected.');
			return;
		}
		const tabSize = editor.selection.start.character;
		const text = editor.document.getText(editor.selection);
		const corretIndentText = text.split("\n").map((line) => {
			return line.replace(new RegExp(`^\\s{${tabSize}}`), '');
		}).join("\n");
		clipboard.writeSync(corretIndentText);
		vscode.window.showInformationMessage('Code has been correctly copied.');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
