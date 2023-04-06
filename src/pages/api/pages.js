// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        res.status(200).json({ message: "get" });
        break;
      case "POST":
        const { name, id } = JSON.parse(req.body);
        const page = await notion.pages.create({
          parent: {
            type: "database_id",
            database_id: id,
          },
          properties: {
            Request: {
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
        });
        res.status(201).json({ message: "post", page });
        break;
      case "PATCH":
        res.status(201).json({ message: "patch" });
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
