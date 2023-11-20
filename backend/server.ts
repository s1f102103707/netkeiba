import express from "express";
import axios from "axios";
import cheerio from "cheerio";
import iconv from "iconv-lite";

const app: express.Express = express();
const port = 8000;

// app.get("/", (req: express.Request, res: express.Response) => {
//   res.send("Hello, world!");
// });

app.get("/scrape", async (req, res) => {
  try {
    const url = "https://db.netkeiba.com/race/202305040911/";
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const html = iconv.decode(response.data, "Shift_JIS"); // サイトの文字コードに応じて変更

    const $ = cheerio.load(html);
    const tableHTML = $("table").html();

    // HTMLのmetaタグにcharsetを追加する
    const finalHTML = `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"></head><body>${tableHTML}</body></html>`;

    res.header("Content-Type", "text/html; charset=utf-8");
    res.send(finalHTML);
  } catch (error: any) {
    res.status(500).send((error as Error).message);
  }
});

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});
