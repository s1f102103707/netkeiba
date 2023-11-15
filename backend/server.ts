import express from "express";
import axios from "axios";
import cheerio from "cheerio";

const app: express.Express = express();
const port = 8000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!");
});

app.get("/scrape", async (req, res) => {
  try {
    const url = "https://db.netkeiba.com/race/202305040911/";
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);
    const tableHTML = $("table").html();

    res.send(tableHTML);
  } catch (error: any) {
    // エラーオブジェクトの型をanyに指定することでエラーを解決できる場合もあります
    res.status(500).send((error as Error).message); // エラーオブジェクトをError型にキャスト
  }
});

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});
