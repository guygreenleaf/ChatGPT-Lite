import * as vscode from "vscode";
import { getNonce } from "./getNonce";

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri, private readonly _ctx:vscode.ExtensionContext) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._ctx.globalState.setKeysForSync(["apiKey", "creativity"]); 
  
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {    
        case "setState": {
          this._ctx.globalState.update("apiKey", data.apiKey);
          this._ctx.globalState.update("creativity", data.creativity);
          break;
        }
        case "getState":{
          this._view?.webview.postMessage({
            type:"getState",
            apiKey: this._ctx.globalState.get("apiKey") ?? "",
            creativity: this._ctx.globalState.get("creativity") ?? ""
          });
          return;
        }
        case "isStateful":{
          this._view?.webview.postMessage({
            type:"isStateful",
            isStateful: ((this._ctx.globalState.get("apiKey") as string).length > 0 && (this._ctx.globalState.get("creativity") as string).length > 0) 
          });
          break;
        }
        case "onInfo": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case "onError": {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "dist", "app/entry.js")
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${ webview.cspSource }; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
			</head>
      <body>
      <div id="root"></div>
        <script nonce="${nonce}" src="${scriptUri}">
        </script>
			</body>
			</html>`;
  }
}