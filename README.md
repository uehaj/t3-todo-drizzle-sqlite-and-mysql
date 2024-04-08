# T3 Todo

IT Media連載記事[フルスタックフレームワーク、T3 Stack入門](https://atmarkit.itmedia.co.jp/ait/series/34783/)の連載第三回目の掲載サンプルコードです。

- [連載 第一回 TypeScriptベースのフルスタックフレームワーク「T3 Stack」で極上の開発体験を　何がすごいのか？](https://atmarkit.itmedia.co.jp/ait/articles/2304/28/news207.html)
- [連載 第二回 T3 Stackの要、tRPCとは？　tRPC、Zod、TanStack Queryについて解説](https://atmarkit.itmedia.co.jp/ait/articles/2307/03/news012.html)
- [連載 第三回 T3 Stackに新たなORMの選択肢Drizzleが登場、Prismaよりも先鋭的？](https://atmarkit.itmedia.co.jp/ait/articles/2312/07/news007.html)

## 実行手順

```
> cd t3-todo
> cp .env.sample .env
> npm install
> docker run -d -p 3306:3306 --rm --name mysql -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=tododb mysql
> npx dotenv npx drizzle-kit push:mysql -- --config ./drizzle_mysql.config.ts
> npx dotenv npx drizzle-kit push:sqlite -- --config ./drizzle_sqlite.config.ts
> npm run dev
```
