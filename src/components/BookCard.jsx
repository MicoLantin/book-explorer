const COVER_BASE = "https://covers.openlibrary.org/b/id";

function BookCard({ book, onSelect }) {
  const coverUrl = book.cover_i
    ? `${COVER_BASE}/${book.cover_i}-M.jpg`
    : null;
  const author = book.author_name ? book.author_name.join(", ") : "Unknown author";

  return (
    <button className="book-card" onClick={() => onSelect(book)}>
      {coverUrl ? (
        <img src={coverUrl} alt={`Cover of ${book.title}`} className="book-cover" />
      ) : (
        <div className="book-cover book-cover--placeholder">No cover</div>
      )}
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{author}</p>
        <p className="book-year">{book.first_publish_year ?? "Year unknown"}</p>
      </div>
    </button>
  );
}

export default BookCard;
