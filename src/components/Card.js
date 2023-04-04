export const Card = ({ id, url, object, ...props }) => {
  console.log(props);
  const name =
    props.name || props.properties?.Name.title[0].plain_text || "[no name]";
  const created = props.created_time
    ? new Date(props.created_time).toLocaleDateString()
    : "n/a";
  const lastEdited = props.created_time
    ? new Date(props.last_edited_time).toLocaleDateString()
    : "n/a";
  return (
    <div className="card">
      <h2>
        {object}: {name}
      </h2>
      <p>ID:{id}</p>
      <p>Object type: {object}</p>
      {url && <p>URL: {url}</p>}
      {props.type && <p>type: {props.type}</p>}
      {typeof props.archived === "boolean" && (
        <p>Archived?: {props.archived.toString()}</p>
      )}
      <p>Created on: {created}</p>
      <p>Last edited: {lastEdited}</p>
    </div>
  );
};
