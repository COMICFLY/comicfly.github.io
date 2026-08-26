# COMICFLY GitHub Pages

一个无需构建工具的静态个人主页。

直接打开 `index.html` 即可预览。需要通过本地 HTTP 服务测试时，再使用下面的命令。

## 本地预览

在此目录运行：

```powershell
python -m http.server 4173
```

然后访问 `http://localhost:4173`。

## 部署

将本目录内容放到 `COMICFLY/COMICFLY.github.io` 仓库的默认分支根目录，并在仓库设置中启用 GitHub Pages。页面不依赖 Node.js 或外部运行时。

账号与联系方式现在整合在第二屏的玻璃面板中。视觉样式在 `styles.css`，交互逻辑在 `script.js`。

明日方舟 logo 使用官网宣传页提供的公开 CDN 资源；如果未来资源地址变更，只需替换 `index.html` 中的 `arknights-logo` 图片地址。
