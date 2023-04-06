import { createPage } from "@/lib/notion";
import { useRouter } from "next/router";

// No longer being used but leaving here for reference

const handleSubmit = async (e) => {
  const pageName = e.target.name.value;
  const content = e.target.content.value;
  const result = await createPage({ name: pageName, content });
  // do something with result, like show success snackbar
};
export const CreatePageForm = () => {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    refreshData();
  };
  return (
    <section>
      <h3>Create a new blog post in your database</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">
          Page name:
          <br />
          <input type="text" id="name" />
        </label>
        <br />
        <label htmlFor="content">
          Content:
          <br />
          <textarea name="content" id="content" cols="30" rows="10"></textarea>
        </label>
        <input
          className="submit-input"
          type="submit"
          value="Add new post to database"
        />
      </form>
    </section>
  );
};
