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
    // 'template' is unsupported
    text = "Unsupported block type";
  } else if (block[block.type].rich_text) {
    // Only some blocks support rich text
    const richText = getRichText(block[block.type].rich_text);
    // Early out is it's an empty line
    if (!richText) return "";
    // return the rich text for the block type
    text = getRichText(block[block.type].rich_text);
  } else {
    // Get text for block types that don't have rich text
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
      default:
        text = block.type + " needs case added";
        break;
    }
  }
  if (block.has_children) {
    text = text + " get children";
  }
  return text;
};

// Expand as needed.
const El = (props) => {
  switch (props.type) {
    case "heading_1":
      return <h1>{props.children}</h1>;
    case "heading_2":
      return <h2>{props.children}</h2>;
    case "heading_3":
      return <h3>{props.children}</h3>;
    case "paragraph":
      return <p>{props.children}</p>;
    case "code":
      return <code className="code">{props.children}</code>;
    case "divider":
      return <hr />;
    case "quote":
      return <blockquote>{props.children}</blockquote>;
    case "callout":
      return <div className="callout">{props.children}</div>;
    case "numbered_list_item":
      return (
        <ol>
          <li className="show-bullet">{props.children}</li>
        </ol>
      );
    case "bulleted_list_item": // there should be some logic added for sibling li's being in the same ul/ol
      return <li className="show-bullet">{props.children}</li>;
    default:
      return (
        <p>
          <b>{props.children}</b>
        </p>
      );
  }
};

export default function PageContent({ pageContent }) {
  if (!pageContent) {
    return <div className="content"></div>;
  }

  const formattedContent = pageContent.map((block, i) => {
    const plainText = getText(block);
    return (
      <El key={i} type={block.type}>
        {plainText}
      </El>
    );
  });

  return <div className="content">{formattedContent}</div>;
}

// block.type values for reference (not used in code above)
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

// Bookmark  x
// Breadcrumb x
// Bulleted list item x
// Callout x
// Child database x
// Child page x
// Code x
// Column list and column x
// Divider x
// Embed
// Equation x
// File x
// Headings xx
// Image x
// Link Preview x
// Mention
// Numbered list item x
// Paragraph x
// PDF x
// Quote x
// Synced block x
// Table x
// Table of contents x
// Template - unsupported
// To do x
// Toggle blocks x
// Video x
