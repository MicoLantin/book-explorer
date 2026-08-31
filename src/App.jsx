import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    if (!submittedQuery) return;

    let cancelled = false;

    async function fetchBooks() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(submittedQuery)}`
        );
        if (!res.ok) throw new Error("Something went wrong while searching.");
        const data = await res.json();
        if (!cancelled) setBooks(data.docs ?? []);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBooks();
    return () => {
      cancelled = true;
    };
  }, [submittedQuery]);

  function handleSearch() {
    const trimmed = query.trim();
    if (trimmed) setSubmittedQuery(trimmed);
  }

  return (
    <div className="app">
      <h1>
        <span className="star" aria-hidden="true">✦</span>
        Book Explorer
        <span className="star" aria-hidden="true">✦</span>
      </h1>
      <SearchBar query={query} onQueryChange={setQuery} onSubmit={handleSearch} />

      {loading && <p className="status-message">Loading...</p>}
      {error && <p className="status-message status-message--error">{error}</p>}
      {!loading && !error && submittedQuery && books.length === 0 && (
        <p className="status-message">No books found.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <BookList books={books} onSelect={setSelectedBook} />
      )}

      {selectedBook && (
        <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}

export default App;
