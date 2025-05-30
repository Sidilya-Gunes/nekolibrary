import React from "react";
import useBookStore from "../../store/useBookStore";
import { useNavigate } from "react-router-dom";
import BookCard from "./BookCard";

function BookList() {
  const { filteredBooks, deleteBook } = useBookStore();
  const navigate = useNavigate();

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
    <>
      <h1>Kitaplar</h1>
      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <h1>Gösterilecek kitap yok.</h1>
        )}
      </div>
    </>
  );
}

export default BookList;
