import * as vscode from 'vscode';
import * as path from 'path';
import { getWebviewContent } from './utils/webview';

let luozhuPanel: vscode.WebviewPanel | undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "webview-umi" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand('webview-umi.projectManager.start', async () => {
      const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

      if (luozhuPanel) {
        // 如果我们已经有了一个面板，那就把它显示到目标列布局中
        luozhuPanel.reveal(columnToShowIn);
      } else {
        // 否则，创建并显示新的 Webview
        luozhuPanel = vscode.window.createWebviewPanel(
          'luozhu', // 只供内部使用，这个 Webview 的标识
          '洛竹', // 给用户显示的面板标题
          vscode.ViewColumn.One, // 给新的 Webview 面板一个编辑器视图
          {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'web/dist'))],
          } // Webview 选项。
        );
        // 设置 Logo
        luozhuPanel.iconPath = vscode.Uri.file(
          path.join(context.extensionPath, 'assets', 'logo.png')
        );
        // 设置 HTML 内容
        luozhuPanel.webview.html = getWebviewContent(context, luozhuPanel, '3.15.4');

        // 当前面板被关闭后重置
        luozhuPanel.onDidDispose(
          () => {
            luozhuPanel = undefined;
          },
          null,
          context.subscriptions
        );
      }
    })
  );
}

export function deactivate() {}
