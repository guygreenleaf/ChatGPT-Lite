import * as vscode from "vscode";
import { SidebarProvider } from './SidebarProvider';

export function activate(context: vscode.ExtensionContext) {

	const sidebarProvider = new SidebarProvider(context.extensionUri);
		context.subscriptions.push(
	  	vscode.window.registerWebviewViewProvider(
			"chatgpt-lite-sidebar",
			sidebarProvider
	  	)
	);

	let disposable = vscode.commands.registerCommand('chatgpt-lite.openChatGPTLite', () => {
		vscode.window.showInformationMessage('Hello!');
	});

	context.subscriptions.push(disposable);


	
}

// This method is called when your extension is deactivated
export function deactivate() {}
