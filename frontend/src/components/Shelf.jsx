import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "./Book/BookCard";
import useBookStore from "../store/useBookStore";

function Shelf() {
  const { books, categories, deleteBook } = useBookStore();
  const [selectedCategory, setSelectedCategory] = useState(null);
   const [filteredBooks, setFilteredBooks] = useState(books);
  const allBooks = selectedCategory
    ? books.filter((book) => book.category === selectedCategory)
    : filteredBooks.length > 0
    ? filteredBooks
    : books;
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory) {
      setFilteredBooks(
        books.filter((book) => book.category === selectedCategory)
      );
    } else {
      setFilteredBooks(books);
    }
  }, [selectedCategory, books]);

  const handleCategorySelected = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Bu kitabı silmek istediğinize emin misiniz?"
    );
    if (confirmDelete) {
      deleteBook(id);
    }
  };

  return (
    <div className="book-category">
      <h2>Raflar</h2>
      <div className="category-dropdown">
        <select
          value={selectedCategory || ""}
          onChange={(e) => handleCategorySelected(e.target.value)}
        >
          <option value="">Tüm Kitaplar</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="book-list">
        {allBooks.length > 0 ? (
          allBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={() => handleEdit(book.id)}
              onDelete={() => handleDelete(book.id)}
            />
          ))
        ) : (
          <p>Bu kategoriye ait kitap bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
}

export default Shelf;
