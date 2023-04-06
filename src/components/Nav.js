import Link from "next/link";

export const Nav = ({ items }) => (
  <>
    <ul className="nav">
      {items.map((item, i) => {
        const lowercaseItem = item.toLowerCase();
        const link =
          lowercaseItem === "back" ? "" : lowercaseItem.replace(" ", "-");
        return (
          <li key={i}>
            <Link href={`/${link}`}>{item}</Link>
          </li>
        );
      })}
      <li className="nav_request-item">
        <Link href={`/request-topic`}>Request topic</Link>
      </li>
    </ul>

    <hr />
  </>
);
