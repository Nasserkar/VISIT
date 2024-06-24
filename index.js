const express = require("express");
const app = express();
const { existsSync, writeFileSync, readFileSync } = require("fs");
let count = 0;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT ?? 9090;

app.get("/", (req, res) => {
  if (!existsSync("./text.txt")) {
    writeFileSync("./text.txt", `${count}`);
  }
  count = parseInt(readFileSync("./text.txt", "utf-8")) + 1;
  writeFileSync("./text.txt", `${count}`);
  res.send(`<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="theme-color" content="#d9d9d9">
    <meta name="description" content="VISIT!">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="msapplication-starturl" content="/">
    <meta name="msapplication-navbutton-color" content="#d9d9d9">
    <meta name="msapplication-TileColor" content="#d9d9d9">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta property="og:title" content="VISIT!">
    <meta property="og:description" content="VISIT!">
    <meta property="og:url" content="http://127.0.0.1:${port}/">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="VISIT!">
    <link rel="canonical" href="http://127.0.0.1:${port}/index.html">
    <style type="text/css">
      *,
      *::before,
      *::after {
        padding: 0%;
        margin: 0%;
        border: none;
        box-sizing: border-box;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
          sans-serif;
      }
      body {
        height: 100vh;
        width: 100%;
        background: #d9d9d9;
      }
      main[role="main"] {
        height: calc(100% - 30px);
        width: 100%;
      }
      section {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p {
        color: #262626;
      }
      h4 {
        margin-block: 20px;
        font-size: 1rem;
        font-weight: 600;
      }
      section h1 {
        font-size: clamp(3rem, min(17vw, 17vh), 10rem);
        font-weight: 600;
      }
      footer[role="contentinfo"] {
        height: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      footer[role="contentinfo"] p {
        font-weight: 500;
      }
    </style>
    <script defer type="text/javascript">
      let fav = "data:image/png;base64,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"
      const link = document.createElement("link")
      link.rel = "icon"
      link.type = "image/png"
      link.href = fav
      document.head.appendChild(link)
    </script>
    <title>VISIT!</title>
  </head>
  <body>
    <main role="main">
      <section>
        <h1>VISIT!</h1>
        <h4>This website has been visited ${count} times.</h4>
      </section>
    </main>
    <footer role="contentinfo"><p>Made by Nasser.K with ❤️</p></footer>
  </body>
</html>
`);
});
app.listen(port, () => {
  console.log(`Alive at http://localhost:${port}`);
});
