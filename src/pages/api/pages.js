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
      case "POST":
        const { name, content } = JSON.parse(req.body);
        const page = await notion.pages.create({
          parent: {
            type: "database_id",
            database_id: databaseId,
          },
          properties: {
            Title: {
              // tip: can only set the title when the parent is a page (not a database)
              title: [
                {
                  text: {
                    content: name,
                  },
                },
              ],
            },
          },
          children: [
            {
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: [{ type: "text", text: { content } }],
              },
            },
          ],
        });
        res.status(201).json({ message: "post", page });
        break;
      case "PATCH":
        const { pageId } = JSON.parse(req.body);

        const existingPage = await notion.pages.update({
          page_id: pageId,
          archived: true,
        });

        res.status(201).json({ message: "post", page: existingPage });
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
