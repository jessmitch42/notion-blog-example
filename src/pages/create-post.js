import styles from "@/styles/Home.module.css";
import { Nav } from "@/components/Nav";

export default function RequestTopic({ requests }) {
  return (
    <main className={styles.main}>
      <Nav items={["Back"]} />
      <section>
        <h1>Create a new post</h1>
      </section>
    </main>
  );
}
