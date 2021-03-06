import * as vscode from 'vscode';
import * as path from 'path';

/**
 * 获取基于 umijs 的 webview 内容
 * @param context 扩展上下文
 * @param webviewPanel webview 面板对象
 * @param rootPath webview 所在路径，默认 web
 * @param umiVersion umi 版本
 * @returns string
 */
export const getWebviewContent = (context: vscode.ExtensionContext, webviewPanel: vscode.WebviewPanel, umiVersion?: string, rootPath: string = 'web') => {
  // 获取磁盘上的资源路径
  const getDiskPath = (fileName: string) => {
    return webviewPanel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, rootPath, 'dist', fileName)));
  };
  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
        <link rel="stylesheet" href="${getDiskPath('umi.css')}" />
        <script>
          //! umi version: ${umiVersion}
        </script>
      </head>
      <body>
        <div id="root"></div>

        <script src="${getDiskPath('umi.js')}"></script>
      </body>
    </html>
  `;
};