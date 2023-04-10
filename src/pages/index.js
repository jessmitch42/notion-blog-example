import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Nav } from "@/components/Nav";
import { queryDatabase, filterAndSortDatabase } from "@/lib/notion";
import { useCallback, useEffect, useState } from "react";
import SortFilterBar from "@/components/SortFilterBar";

export default function Home({ database }) {
  const navItems = ["Users", "Create Post"];

  const [sortType, setSortType] = useState(null);
  const [filterText, setFilterText] = useState(null);
  const [processedDatabase, setProcessedDatabase] = useState(null);

  const handleSort = useCallback(
    async (type) => {
      const list = await filterAndSortDatabase(filterText, type);
      setProcessedDatabase(list.response.results);
      setSortType(type);
    },
    [filterText]
  );

  useEffect(() => {
    /**
     * If the list has been sorted and a post is archived, we need to update the sorted list.
     */
    if (
      (sortType || filterText) &&
      database.length < processedDatabase.length
    ) {
      handleSort(sortType);
    }
  }, [database, processedDatabase, sortType]);

  const onSortChange = async (e) => {
    const type = e.target.value;
    await handleSort(type);
  };

  const handleFilter = useCallback(
    async (e) => {
      e.preventDefault();
      const text = e.target.search.value;
      const list = await filterAndSortDatabase(text, sortType);
      setProcessedDatabase(list.response.results);
      setFilterText(text);
    },
    [sortType]
  );

  return (
    <>
      <Head>
        <title>Notion testing</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Nav items={navItems} />
        <section>
          <h2>Blog posts</h2>
          <SortFilterBar
            onSortChange={onSortChange}
            handleFilter={handleFilter}
          />
          <ul className="cards">
            {(processedDatabase || database).map((d, i) => (
              <li key={i}>
                <Link href={`/page/${d.id}`}>
                  <Card {...d} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const database = await queryDatabase(databaseId);

  return {
    props: {
      database,
    },
  };
}
