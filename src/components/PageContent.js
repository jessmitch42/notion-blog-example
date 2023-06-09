// Take rich text array from a block child and return the plain text.
const getPlainTextFromRichText = (richText) => {
  return richText.map((t) => t.plain_text).join(", ");
};

// Media blocks (file, video, etc.) wil have an optional caption and a source.
const getMediaSourceText = (block) => {
  let source, caption;

  if (block[block.type].external) {
    source = block[block.type].external.url;
  } else if (block[block.type].file) {
    source = block[block.type].file.url;
  } else {
    source = "Missing case for media block types: " + block.type;
  }
  // If there's a caption, return it with the source
  if (block[block.type].caption.length) {
    caption = getPlainTextFromRichText(block[block.type].caption);
    return caption + ": " + source;
  }
  // If no caption, just return source
  return source;
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
    // This will be an empty string if it's an empty line.
    // Note: All rich text objects include a plain_text field.
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
        // Use "Query a database" endpoint to get db rows: https://developers.notion.com/reference/post-database-query
        // Use "Retrieve a database" endpoint to get additional properties: https://developers.notion.com/reference/retrieve-a-database
        text = block.child_database.title;
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
        text = getMediaSourceText(block);
        break;
      case "equation":
        text = block.equation.expression;
        break;
      case "link_preview":
        text = block.link_preview.url;
        break;
      case "synced_block":
        // Provides ID for block it's synced with.
        text = block.synced_block.synced_from
          ? "This block is synced with a block with the following ID: " +
            block.synced_block.synced_from[block.synced_block.synced_from.type]
          : "Source sync block that another blocked is synced with.";
        break;
      case "table":
        // Only contains table properties.
        // Fetch children blocks for more details.
        text = "Table width: " + block.table.table_width;
        break;
      case "table_of_contents":
        // Does not include text from ToC; just the color
        text = "Table of contents color: " + block.table_of_contents.color;
        break;
      default:
        text = block.type + " needs case added";
        break;
    }
  }
  // Optional based on use case: Fetch children blocks to retrieve additional information.
  // e.g. nested bulleted lists
  if (block.has_children) {
    // For now, we'll just flag there are children blocks.
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
    case "to_do":
      return (
        <div>
          {/* Todo: add checkbox functionality */}
          <input type="checkbox" />
          <span>{props.children}</span>
        </div>
      );
    case "to_do":
      return <span>{props.children}</span>;
    case "numbered_list_item":
      // Todo: add logic for sibling li's being in the same ol
      return (
        <ol>
          <li className="show-bullet">{props.children}</li>
        </ol>
      );
    case "bulleted_list_item":
      // Todo: add logic for sibling li's being in the same ul
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
