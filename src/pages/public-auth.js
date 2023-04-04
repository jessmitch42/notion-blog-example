import styles from "@/styles/Home.module.css";
import { Nav } from "@/components/Nav";
import { useState } from "react";

export default function PublicAuth() {
  const [link, setLink] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onChange = (e) => {
    const authLink = e.target.value;
    setLink(authLink);
  };
  return (
    <main className={styles.main}>
      <Nav items={["back"]} />
      <section>
        <h1>Public integration auth</h1>
        <p>
          1. Start by going to{" "}
          <a href="https://www.notion.so/my-integrations">
            https://www.notion.so/my-integrations
          </a>
        </p>
        <p>
          2. Go to the integration you want to authenticate and update the
          integration type to be <code>public</code>.
        </p>
        <p>
          3. Fill out the <code>OAuth Domain & URIs</code> form and submit.
        </p>
        <p>4. Fill out the form below to build an auth link.</p>
        <p>5. Click the link and follow the instructions.</p>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <label htmlFor="link">
            <p>Add your authorization URL</p>
            <input
              style={{ width: "100%" }}
              onChange={onChange}
              type="text"
              id="link"
            />
          </label>
        </form>
        <a class="submit-link" target="_blank" href={link}>
          Text Auth flow (opens new window)
        </a>
      </section>
    </main>
  );
}
