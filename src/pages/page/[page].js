import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import { getPage } from "@/lib/notion";
import { Card } from "@/components/Card";

export default function Page({ currentPage }) {
  const router = useRouter();
  const { page } = router.query;
  return (
    <main className={styles.main}>
      <div>
        <Link href="/">Back</Link>
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
