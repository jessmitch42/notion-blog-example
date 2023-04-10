export default function SortFilterBar({ onSortChange, handleFilter }) {
  return (
    <div className="sort-filter-bar">
      <label htmlFor="sort">Sort blog posts:</label>
      <select onChange={onSortChange} name="sort" id="sort">
        <option defaultValue disabled>
          Options
        </option>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
      <form onSubmit={handleFilter}>
        <label htmlFor="search">Filter by title</label>
        <input type="text" name="search"/>
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}
