import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import { getPage } from "@/lib/notion";
import { Card } from "@/components/Card";
import { Nav } from "@/components/Nav";

export default function Page({ currentPage }) {
  const router = useRouter();
  const { page } = router.query;
  const navItems = ["Back"]
  return (
    <main className={styles.main}>
      <Nav items={navItems} />
      <div>
        <Card {...currentPage} />
      </div>
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
  const currentPage = await getPage(page);

  console.log(page);
  return {
    props: {
      currentPage: currentPage || null,
    },
    revalidate: 1,
  };
}
