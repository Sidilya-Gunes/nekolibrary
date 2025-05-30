import React from "react";
import useBookStore from "../store/useBookStore";
import BookCard from "../components/Book/BookCard";

const HomePage = () => {
  const books = useBookStore((state) => state.books);

  // En son eklenen 12 kitabı alacağım
  const latestBooks = books.slice(-12).reverse();

  return (
    <div>
      <h2>Son Eklenen Kitaplar</h2>
      <div className="book-list">
        {latestBooks.length === 0 ? (
          <p>Henüz kitap yo</p>
        ) : (
          latestBooks.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
    </div>
  );
};

export default HomePage;
