import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NOTION_API_KEY });

const queryDatabase = async (id) => {
  try {
    const response = await notion.databases.query({
      database_id: id,
    });
    return response.results;
  } catch (error) {
    console.error(error);
  }
};

const filterAndSortDatabase = async (filterText, sortType) => {
  let options = {};
  if (filterText) {
    options = {
      ...options,
      filter: {
        property: "Title",
        rich_text: {
          contains: filterText,
        },
      },
    };
  }
  if (sortType) {
    options = {
      ...options,
      sorts: [
        {
          property: "Title",
          direction: sortType,
        },
      ],
    };
  }
  try {
    const response = await fetch("/api/databases", {
      method: "POST",
      body: JSON.stringify(options),
    });

    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

const getBlockChildren = async (id) => {
  try {
    const response = await notion.blocks.children.list({
      block_id: id,
    });
    return response.results;
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async () => {
  try {
    const response = await notion.users.list();
    return response.results;
  } catch (error) {
    console.error(error);
  }
};

const getPageProperties = async (id) => {
  try {
    // Retrieves page properties, not the page content
    const response = await notion.pages.retrieve({ page_id: id });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getPage = async (id) => {
  const pageProperties = await getPageProperties(id);
  const pageContent = await getBlockChildren(id);
  return {
    pageProperties,
    pageContent,
  };
};
const addTextToPage = async (text) => {
  try {
    const response = await fetch("/api/blocks", {
      method: "PATCH",
      body: JSON.stringify({ text }),
    });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error(err);
  }
};

const createPage = async ({ name, content }) => {
  try {
    const response = await fetch("/api/pages", {
      method: "POST",
      body: JSON.stringify({ name, content }),
    });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error(err);
  }
};

const archivePage = async (pageId) => {
  try {
    const response = await fetch("/api/pages", {
      method: "PATCH",
      body: JSON.stringify({ pageId }),
    });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error(err);
  }
};

export {
  queryDatabase,
  getUsers,
  getPage,
  getPageProperties,
  createPage,
  addTextToPage,
  getBlockChildren,
  archivePage,
  filterAndSortDatabase,
};
