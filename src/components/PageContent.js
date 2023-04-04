// This is not an exhaustive list of options provided by Notion.
// Expand as needed.
const El = (props) => {
  switch (props.type) {
    case "heading_1":
      return <h1>{props.children}</h1>;
    case "heading_2":
      return <h2>{props.children}</h2>;
    case "paragraph":
      return <p>{props.children}</p>;
    default:
      return <p>{props.children}</p>;
  }
};

export default function PageContent({ pageContent }) {
  const content = !pageContent?.results
    ? null
    : pageContent.results.map((r, i) => {
        return (
          <El key={i} type={r.type}>
            {r[r.type].rich_text[0]?.plain_text}
          </El>
        );
      });

  return <div className="content">{content || ""}</div>;
}
