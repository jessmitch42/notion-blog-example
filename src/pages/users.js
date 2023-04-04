import styles from "@/styles/Home.module.css";
import { Card } from "@/components/Card";
import { getUsers } from "@/lib/notion";
import { Nav } from "@/components/Nav";

export default function Users({ users }) {
  return (
    <main className={styles.main}>
      <Nav items={["back"]} />
      <section>
        <h1>Users ({users.length})</h1>
        <ul>
          {users.map((u, i) => (
            <Card key={i} {...u} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const users = await getUsers();

  return {
    props: {
      users,
    },
    revalidate: 1,
  };
}
