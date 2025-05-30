import React, { useEffect, useRef, useState } from "react";
import useAuthStore from "../../store/useAuthStore";

function BookCard({ book, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser } = useAuthStore();

  const toggleDescription = () => setIsOpen(!isOpen);

  const descRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (descRef.current && !descRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="book-card">
      <img
        src={book.cover || "https://placehold.co/150x200?text=No+Cover"}
        alt={book.title}
        className="book-hover"
      />
      <div className="book-details">
        <h3 className="book-title">{book.title}</h3>
        <h4 className="book-author">{book.author}</h4>
        <h4 className="book-genre">{book.genre}</h4>
      </div>
      <div className="book-actions">
        {currentUser?.isAdmin && (
          <>
            <button onClick={() => onEdit(book.id)}>Düzenle</button>
            <button onClick={() => onDelete(book.id)}>Sil</button>
          </>
        )}
        <button onClick={toggleDescription}>Açıklama</button>
      </div>
      <div className={`book-description ${isOpen ? "show" : ""}`} ref={descRef}>
        {isOpen && (
          <>
            <p>{book.description}</p>
            <button onClick={toggleDescription}>Kapat</button>
          </>
        )}
      </div>
    </div>
  );
}

export default BookCard;
