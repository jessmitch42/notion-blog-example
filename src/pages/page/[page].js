import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import { getPage } from "@/lib/notion";
import { Card } from "@/components/Card";
import { Nav } from "@/components/Nav";

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

export default function Page({ pageProperties, pageContent }) {
  const navItems = ["Back"];
  // Not used but the page ID can be retrieved from the URL
  // const router = useRouter();
  // const { page } = router.query;

  const content = pageContent.results.map((r) => {
    return <El type={r.type}>{r[r.type].rich_text[0]?.plain_text}</El>;
  });

  return (
    <main className={styles.main}>
      <Nav items={navItems} />
      <Card {...pageProperties} />
      <div>{content}</div>
    </main>
  );
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { page } = params;
  const pageInfo = await getPage(page);

  return {
    props: pageInfo,
    revalidate: 1,
  };
}
