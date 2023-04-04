import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NOTION_API_KEY });

const getDatabase = async () => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });
  return response.results;
};

const getUsers = async () => {
  const response = await notion.users.list();
  return response.results;
};

const getPage = async (id) => {
  const response = await notion.pages.retrieve({ page_id: id });
  console.log(response);
  return response;
};

const createPage = async (name) => {
  try {
    const response = await fetch("/api/pages", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    const res = await response.json();
    return res;
  } catch (err) {
    console.log(err);
  }
};

export { getDatabase, getUsers, getPage, createPage };
