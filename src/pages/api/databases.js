// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        res.status(200).json({ message: "get" });
        break;
      case "PATCH":
        res.status(200).json({ message: "patch" });
        break;
      case "POST":
        const { sortType } = JSON.parse(req.body);
        console.log(databaseId);
        const response = await notion.databases.query({
          database_id: databaseId,
          sorts: [
            {
              property: "Title",
              direction: sortType,
            },
          ],
        });
        res.status(200).json({ message: "post", response });
        break;
      default:
        res.status(405).end(`${method} Not Allowed`);
        break;
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
