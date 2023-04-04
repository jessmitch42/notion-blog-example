import { createPage } from "@/lib/notion";

const handleSubmit = async (e) => {
  const pageName = e.target.name.value;
  const result = await createPage(pageName);
  // do something with result, like show success snackbar
};
export const CreatePageForm = ({ refreshData }) => {
  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    refreshData();
  };
  return (
    <section class="create-form">
      <h3>Create a new page</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">
          Page name:
          <input type="text" id="name" />
        </label>
        <input
          class="submit-link"
          type="submit"
          value="Create new Notion page"
        />
      </form>
    </section>
  );
};
