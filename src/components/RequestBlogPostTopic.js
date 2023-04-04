import { requestTopic } from "@/lib/notion";

// No longer being used but leaving here for reference

const handleSubmit = async (e) => {
  const pageName = e.target.name.value;
  const result = await requestTopic(pageName);
  // do something with result, like show success snackbar
};
export const RequestBlogPostTopic = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
  };
  return (
    <section>
      <h3>Request a topic</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">
          Page name:
          <input type="text" id="name" />
        </label>
        <input
          class="submit-input"
          type="submit"
          value="Create new Notion page"
        />
      </form>
    </section>
  );
};
