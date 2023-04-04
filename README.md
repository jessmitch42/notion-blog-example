# Notion custom blog sample app

Create a custom blog that uses Notion as a CMS. This sample app is intended to be sample code to showcase how to use the [Notion JS SDK](https://github.com/makenotion/notion-sdk-js) in a [Next.js](https://nextjs.org/). Please refer to Next.js's [documentation](https://nextjs.org/docs/getting-started) for additional information on building with Next.js.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)..

## Running locally
1. Set up your local project:

```bash
# Clone this repository locally
git clone <TODO: add repo url>

# Switch into this project
cd <TODO: add path>

# Install dependencies
npm install
```
2. Visit [Notion's My integrations page](https://www.notion.so/my-integrations) to create an integration. Once the integration is created, make note of the API key (also known as the "Internal Integration Token").

3. Create a Notion database (or decide on an existing one to use). We've created a sample database for testing purposes. Copy the [template](TODO: ADD) to your Notion workspace to use with this app.

Make note of the database ID. To retrieve your database ID, view the database in Notion as a full page. It is the string of characters in the database's URL that is between the slash following your workspace name (if you named it) and the question mark. The ID is 32 characters long, containing numbers and letters.

For more information, read our documentation for [setting up an integration](https://developers.notion.com/docs/create-a-notion-integration#step-3-save-the-database-id).

4. For your Notion integration to access your database, you must give it explicit permission. To share a database with your integration:

    1. Go to the database page in your workspace.
    2. Click the •••on the top right corner of the page.
    3. At the bottom of the pop-up, click Add connections.
    4. Search for and select your integration in the Search for connections... menu.

Your integration now has permission to edit the database. View the Notion [integration guide](https://developers.notion.com/docs/create-a-notion-integration#step-4-add-an-item-to-the-database) for additional information.

5. Once you have your Notion API key and Notion database ID, create a `.env` file with:

```
NOTION_API_KEY=[key]
NOTION_DATABASE_ID=[id]
```

If your repo does not already have a `.gitignore` file, create one and add `.env` to it to ensure you are not sharing your environment variables remotely.

6. Start your local server with the following command and visit `http://localhost:3000` to view the app.

```bash
npm run dev
```

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
