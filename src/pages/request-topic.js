import styles from "@/styles/Home.module.css";
import { Nav } from "@/components/Nav";
import { RequestBlogPostTopic } from "@/components/RequestBlogPostTopic";
import { queryDatabase } from "@/lib/notion";

const requestList = (requests) => {
  if (!requests) return;
  return requests.map((r, i) => {
    const text = r.properties.Request.title[0].plain_text;
    return (
      <li key={i}>
        {i + 1}. {text}
      </li>
    );
  });
};

export default function RequestTopic({ requests }) {
  return (
    <main className={styles.main}>
      <Nav items={["Back"]} />
      <section>
        <RequestBlogPostTopic />
        <h1>Requests</h1>
        <ul>{requestList(requests)}</ul>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const requests = await queryDatabase(process.env.NOTION_REQUEST_DATABASE_ID);
  return {
    props: {
      requests,
    },
  };
}
