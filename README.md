# Notion custom blog sample app

Create a custom blog that uses Notion as a CMS. This demo app is intended to be sample code to showcase how to use the [Notion JS SDK](https://github.com/makenotion/notion-sdk-js) in a [Next.js](https://nextjs.org/). Please refer to Next.js's [documentation](https://nextjs.org/docs/getting-started) for additional information on building with Next.js.

![Home page with sample data](/blog_example.png)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Notion API endpoints used

This demo includes code examples using the following Notion API endpoints via the [Notion JS SDK](https://github.com/makenotion/notion-sdk-js):

- notion.database.query() - [Query a database docs](https://developers.notion.com/reference/post-database-query)
- notion.blocks.children.list() - [Retrieve block children](https://developers.notion.com/reference/get-block-children)
- notion.blocks.children.append() - [Append block children](https://developers.notion.com/reference/patch-block-children)
- notion.users.list() - [List all users](https://developers.notion.com/reference/get-users)
- notion.pages.retrieve() - [Retrieve a page](https://developers.notion.com/reference/retrieve-a-page)
- notion.pages.update() - [Update page properties](https://developers.notion.com/reference/patch-page) (See also: [Archive a page](https://developers.notion.com/reference/archive-a-page))
- notion.pages.create() - [Create a page](https://developers.notion.com/reference/post-page)

## Running locally

1. Set up your local project:

```bash
# Clone this repository locally
git clone [repo URL]

# Switch into this project
cd notion-blog-example/

# Install dependencies
npm install
```

2. Visit [Notion's My integrations page](https://www.notion.so/my-integrations) to create an integration. Once the integration is created, make note of the API key (also known as the "Internal Integration Token").

3. Duplicate the sample database [template](https://www.notion.so/notion-templates/1ea6a4f445ad43348ebe9e192d24a08d?v=3b2e2e22289d45a6b991c848a446d0ec&pvs=4) to your Notion workspace to use with this app. This database will be used to store blog posts. Each blog post will be a page listed in the database table.

You can use your own Notion database with this project. If the database schema differs from the one in the template above, you will need to update this codebase accordinglu.

Make note of the database ID. We'll refer to this database ID as the `NOTION_DATABASE_ID`.

To retrieve your database ID, view the database in Notion as a full page. It is the string of characters in the database's URL that is between the slash following your workspace name (if you named it) and the question mark. The ID is 32 characters long, containing numbers and letters.

For more information, read our documentation for [setting up an integration](https://developers.notion.com/docs/create-a-notion-integration#step-3-save-the-database-id).

4. Create a new page in your Notion workspace for storing blog request ideas and note the page ID. We'll refer to this database ID as the `NOTION_PAGE_ID`.

5. For your Notion integration to access your database and page, you must give it explicit permission. To share a database/page with your integration:

   1. Go to the database/page in your workspace.
   2. Click the •••on the top right corner of the page.
   3. At the bottom of the pop-up, click Add connections.
   4. Search for and select your integration in the Search for connections... menu.

Your integration now has permission to edit the database/page. View the Notion [integration guide](https://developers.notion.com/docs/create-a-notion-integration#step-4-add-an-item-to-the-database) for additional information on this step.

6. Once you have your Notion API key, Notion database ID, and Notion page ID, create a `.env` file with the following environment variables:

```
NOTION_API_KEY=<key>
NOTION_DATABASE_ID=<database_id>
NOTION_PAGE_ID=<page_id>
```

If your repo does not already have a `.gitignore` file, create one and add `.env` to it to ensure you are not sharing your environment variables remotely.

7. Start your local server with the following command and visit `http://localhost:3000` to view the app.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Note: To view the `/users` tab in the app UI, your integration needs access to user information. This can be set in [My integrations](https://www.notion.so/my-integrations) by navigating to the relevant integration and updating its settings under `Capabilities`.

---

## Learn More About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
