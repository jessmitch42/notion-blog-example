import styles from "@/styles/Home.module.css";
import { Nav } from "@/components/Nav";
import { RequestBlogPostTopic } from "@/components/RequestBlogPostTopic";

export default function RequestTopic() {
  return (
    <main className={styles.main}>
      <Nav items={["Back"]} />
      <section>
      <h1>Notion Rest API test: Create and view pages</h1>
          <RequestBlogPostTopic/>
      </section>
    </main>
  );
}
