import express from "express";

const app: express.Express = express();
const port = 8000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!");
});

/* ↓これ追加 */
app.get("/api", (req: express.Request, res: express.Response) => {
  res.json([
    {
      id: 1,
      name: "りんご",
      price: 200,
      image: "https://source.unsplash.com/gDPaDDy6_WE",
    },
    {
      id: 2,
      name: "バナナ",
      price: 300,
      image: "https://source.unsplash.com/zrF6ACPLhPM",
    },
    {
      id: 3,
      name: "みかん",
      price: "150",
      image: "https://source.unsplash.com/bogrLtEaJ2Q",
    },
    {
      id: 4,
      name: "メロン",
      price: "2000",
      image: "https://source.unsplash.com/8keUtGmy0xo",
    },
  ]);
});

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});
