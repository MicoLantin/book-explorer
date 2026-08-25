function SearchBar({ query, onQueryChange, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search by title or author (e.g. dune)"
        aria-label="Search books"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
