import BookCard from "./BookCard";

function BookList({ books, onSelect }) {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.key} book={book} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default BookList;
