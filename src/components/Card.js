export const Card = ({ id, url, object, ...props }) => {
  console.log(props);
  const name =
    props.name ||
    props.properties?.Title?.title[0].plain_text ||
    props.properties?.Name?.title[0].plain_text ||
    "[no name]";

  return (
    <div className="card">
      <h2>
        {object.toUpperCase()}: {name}
      </h2>
      <ul>
        <li>
          <span className="bold">ID:</span> {id}
        </li>
        <li>
          <span className="bold">Object type:</span> {object}
        </li>
        {url && (
          <li>
            <span className="bold">URL: {url}</span>
          </li>
        )}
        {props.type && (
          <li>
            <span className="bold">Type:</span> {props.type}
          </li>
        )}
        {typeof props.archived === "boolean" && (
          <li>
            <span className="bold">Archived?:</span> {props.archived.toString()}
          </li>
        )}
        {props.created_time && (
          <li>
            <span className="bold">Created on:</span> {props.created_time}
          </li>
        )}
        {props.last_edited_time && (
          <li>
            <span className="bold">Last edited:</span> {props.last_edited_time}
          </li>
        )}
      </ul>
    </div>
  );
};
