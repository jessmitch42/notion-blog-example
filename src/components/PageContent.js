const getRichText = (richText) => {
  // todo mention page title bug?
  return richText.map((t) => t.plain_text).join(", ");
};
const getBlockCaptionOrSourceURL = (block) => {
  if (block[block.type].caption.length) {
    return block.type + " caption: " + getRichText(block[block.type].caption);
  } else if (block[block.type].external) {
    return block.type + " external URL: " + block[block.type].external.url;
  } else if (block[block.type].file) {
    return block.type + " file URL: " + block[block.type].file.url;
  }
};
const getText = (block) => {
  let text;
  if (block.type === "unsupported") {
    // todo: template is unsupported
    text = "Unsupported block type";
  } else if (block[block.type].rich_text) {
    // Only some blocks support rich text
    const richText = getRichText(block[block.type].rich_text);
    // Early out is it's an empty line
    if (!richText) return "";
    // return the rich text for the block type
    text = block.type + ": " + getRichText(block[block.type].rich_text);
  } else {
    // Get text for block types that don't have rich text
    console.log(block.type);
    console.log(block);

    switch (block.type) {
      case "bookmark":
        text = "Bookmark URL: " + block.bookmark.url;
        break;
      case "breadcrumb":
        text = "Breadcrumb: no text available";
        break;
      case "child_database":
        text = "Child database title: " + block.child_database.title;
        // Use "Query a database" endpoint to get rows: https://developers.notion.com/reference/post-database-query
        // Use "Retrieve a database" endpoint to get additional properties: https://developers.notion.com/reference/retrieve-a-database
        break;
      case "child_page":
        text = "Child page title: " + block.child_page.title;
        break;
      case "column_list":
        text = "Column list: no text available";
        break;
      case "divider":
        text = "Divider: no text available";
        break;
      case "video":
      case "file":
      case "image":
      case "pdf":
        text = getBlockCaptionOrSourceURL(block);
        break;
      case "equation":
        text = "Equation: " + block.equation.expression;
        break;
      case "link_preview":
        text = "Link preview URL: " + block.link_preview.url;
        break;
      case "synced_block":
        console.log(block);
        if (block.synced_block.synced_from) {
          text =
            "This block is synced with a block with the following ID: " +
            block.synced_block.synced_from[block.synced_block.synced_from.type];
        } else {
          text = "Synced block: synced_from ID n/a";
        }
        break;
      case "table":
        // todo: how to get table contents?
        text = "Table: todo";
        break;
      case "table_of_contents":
        // todo: how to get contents?
        text = "Table of contents: todo";
        break;
      case "template":
        text = "Template is unsupported";
        break;
      default:
        text = "needs case" + block.type;
        break;
    }
  }
  if (block.has_children) {
    text = text + " get children";
  }
  return text;
};
// This is not an exhaustive list of options provided by Notion.
// Expand as needed.
const El = (props) => {
  const plainText = getText(props.block);
  switch (props.type) {
    case "heading_1":
      return <h1>{plainText}</h1>;
    case "heading_2":
      return <h2>{plainText}</h2>;
    case "heading_3":
      return <h3>{plainText}</h3>;
    case "paragraph":
      return <p>{plainText}</p>;
    default:
      return (
        <div>
          <b>{plainText}</b>
          <br />
          <br />
        </div>
      );
  }
};

export default function PageContent({ pageContent }) {
  if (!pageContent) {
    return <div className="content"></div>;
  }
  // const types = pageContent.reduce((acc, int) => {
  //   console.log(acc.indexOf(int.type));
  //   if (acc.indexOf(int.type) < 0) {
  //     acc.push(int.type);
  //   }
  //   return acc;
  // }, []);
  // console.log(types);
  const content = pageContent.map((r, i) => {
    return <El key={i} type={r.type} block={r} />;
  });

  return <div className="content">{content}</div>;
}

const blockTypes = [
  "paragraph",
  "bookmark",
  "breadcrumb",
  "bulleted_list_item",
  "callout",
  "child_database",
  "child_page",
  "code",
  "column_list",
  "divider",
  "video",
  "equation",
  "file",
  "heading_1",
  "heading_2",
  "heading_3",
  "image",
  "link_preview",
  "numbered_list_item",
  "pdf",
  "quote",
  "synced_block",
  "table",
  "table_of_contents",
  "unsupported",
  "to_do",
  "toggle",
];

// Bookmark
// Breadcrumb
// Bulleted list item
// Callout
// Child database
// Child page
// Code
// Column list and column
// Divider
// Embed
// Equation
// File
// Headings
// Image
// Link Preview
// Mention
// Numbered list item
// Paragraph
// PDF
// Quote
// Synced block
// Table
// Table of contents
// Template
// To do
// Toggle blocks
// Video
