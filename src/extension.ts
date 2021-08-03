import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "webview-umi" is now active!');

	const disposable = vscode.commands.registerCommand('webview-umi.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from webview-umi!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
