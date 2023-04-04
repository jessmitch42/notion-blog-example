import styles from "@/styles/Home.module.css";
import { getPage } from "@/lib/notion";
import { Card } from "@/components/Card";
import { Nav } from "@/components/Nav";
import PageContent from "@/components/PageContent";

export default function Page({ pageProperties, pageContent }) {
  const navItems = ["Back"];

  return (
    <main className={styles.main}>
      <Nav items={navItems} />
      <Card {...pageProperties} />
      <PageContent pageContent={pageContent} />
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
