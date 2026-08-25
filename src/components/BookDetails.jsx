import { useEffect, useState } from "react";

const COVER_BASE = "https://covers.openlibrary.org/b/id";

function BookDetails({ book, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchDetails() {
      setLoading(true);
      setError(null);
      setDetails(null);

      try {
        const res = await fetch(`https://openlibrary.org${book.key}.json`);
        if (!res.ok) throw new Error("Failed to load book details.");
        const data = await res.json();
        if (!cancelled) setDetails(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDetails();
    return () => {
      cancelled = true;
    };
  }, [book.key]);

  const coverUrl = book.cover_i ? `${COVER_BASE}/${book.cover_i}-M.jpg` : null;
  const author = book.author_name ? book.author_name.join(", ") : "Unknown author";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className="modal-header">
          {coverUrl ? (
            <img src={coverUrl} alt={`Cover of ${book.title}`} className="book-cover" />
          ) : (
            <div className="book-cover book-cover--placeholder">No cover</div>
          )}
          <div>
            <h2>{book.title}</h2>
            <p className="book-author">{author}</p>
            <p className="book-year">First published: {book.first_publish_year ?? "Unknown"}</p>
            <p>Editions: {book.edition_count ?? "Unknown"}</p>
          </div>
        </div>

        {loading && <p className="status-message">Loading details...</p>}
        {error && <p className="status-message status-message--error">{error}</p>}

        {!loading && !error && details && (
          <div className="modal-body">
            {details.description && (
              <p className="book-description">
                {typeof details.description === "string"
                  ? details.description
                  : details.description.value}
              </p>
            )}

            {details.subjects && details.subjects.length > 0 ? (
              <>
                <h4>Subjects</h4>
                <div className="tag-list">
                  {details.subjects.slice(0, 15).map((subject) => (
                    <span className="tag" key={subject}>
                      {subject}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <p>No subject tags available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetails;
