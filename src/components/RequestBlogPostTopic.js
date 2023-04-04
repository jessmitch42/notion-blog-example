import { createPage } from "@/lib/notion";
import { useRouter } from "next/router";
// No longer being used but leaving here for reference

const handleSubmit = async (e) => {
  const requestText = e.target.name.value;
  const result = await createPage(requestText);
  // do something with result, like show success snackbar
  console.log(result);
};

export const RequestBlogPostTopic = () => {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    // This can be handled more elegantly but for now we can refresh
    refreshData();
  };

  return (
    <section>
      <h2>Request a topic</h2>
      <p>
        Requesting a topic will add your text to a Notion doc maintained by the
        owner.
      </p>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">
          Page name:
          <br />
          <input type="text" id="name" />
        </label>
        <input className="submit-input" type="submit" value="Make request" />
      </form>
    </section>
  );
};
