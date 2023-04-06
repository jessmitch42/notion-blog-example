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
        res.status(201).json({ message: "post" });
        break;
      case "PATCH":
        const { text } = JSON.parse(req.body);
        const result = await notion.blocks.children.append({
          block_id: process.env.NOTION_PAGE_ID,
          children: [
            {
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: [{ type: "text", text: { content: text } }],
              },
            },
          ],
        });
        res.status(201).json({ message: "patch", result });
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
