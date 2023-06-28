// Take rich text array from a block child and return the plain text.
const getPlainTextFromRichText = (richText) => {
  return richText.map((t) => t.plain_text).join(", ");
};

// Media blocks (file, video, etc.) wil have an optional caption and a source.
const getBlockCaptionOrSourceURL = (block) => {
  // If the block type has a caption, return it
  if (block[block.type].caption.length) {
    return getPlainTextFromRichText(block[block.type].caption);
  }
  // Otherwise, return the source
  else if (block[block.type].external) {
    return block[block.type].external.url;
  } else if (block[block.type].file) {
    return block[block.type].file.url;
  } else {
    return "Missing case for media block types: " + block.type;
  }
};

// Get the plain text from any block type supported by the public API.
// Some blocks will require fetching the child blocks.
const getText = (block) => {
  let text;

  // The public API does not support all block types yet
  if (block.type === "unsupported") {
    text = "Unsupported block type";
  }
  // Get rich text from blocks that support it
  else if (block[block.type].rich_text) {
    // this will be an empty string if it's an empty line
    text = getPlainTextFromRichText(block[block.type].rich_text);
  }
  // Get text for block types that don't have rich text
  else {
    switch (block.type) {
      case "bookmark":
        text = block.bookmark.url;
        break;
      case "breadcrumb":
        text = "Breadcrumb: no text available";
        break;
      case "child_database":
        text = block.child_database.title;
        // Use "Query a database" endpoint to get rows: https://developers.notion.com/reference/post-database-query
        // Use "Retrieve a database" endpoint to get additional properties: https://developers.notion.com/reference/retrieve-a-database
        break;
      case "child_page":
        text = block.child_page.title;
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
        text = block.equation.expression;
        break;
      case "link_preview":
        text = block.link_preview.url;
        break;
      case "synced_block":
        if (block.synced_block.synced_from) {
          text =
            "This block is synced with a block with the following ID: " +
            block.synced_block.synced_from[block.synced_block.synced_from.type];
        } else {
          text = "Source sync block that another blocked is synced with.";
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
  // Optional based on use case: Fetch children blocks to retrieve additional information.
  // e.g. nested bulleted lists
  if (block.has_children) {
    text = text + " (Has children)";
  }
  return text;
};

// Expand as needed.
// This is optional: use if you want to display the block type as the matching HTML element.
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
    case "equation":
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
      return (
        <ul>
          <li className="show-bullet">{props.children}</li>
        </ul>
      );
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
