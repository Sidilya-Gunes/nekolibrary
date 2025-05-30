import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBookStore from "../../store/useBookStore";

function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, addBook, updateBook } = useBookStore();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [cover, setCover] = useState("");

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const genreRef = useRef(null);
  const coverRef = useRef(null);

  useEffect(() => {
    if (id) {
      const currentBook = books.find((book) => book.id === parseInt(id));
      if (currentBook) {
        setTitle(currentBook.title);
        setAuthor(currentBook.author);
        setGenre(currentBook.genre);
        setCover(currentBook.cover || "");
      }
    }
  }, [id, books]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !genre) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const updatedBook = {
      id: id ? parseInt(id) : Date.now(),
      title,
      author,
      genre,
      cover,
    };

    if (id) {
      updateBook(updatedBook);
    } else {
      addBook(updatedBook);
    }

    // Formu sıfırla
    setTitle("");
    setAuthor("");
    setGenre("");
    setCover("");
    navigate("/");
  };

  const handleKeyPress = (e, nextField) => {
    if (e.key === "Enter" && nextField) {
      e.preventDefault();
      nextField.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>{id ? "Kitap Düzenle" : "Yeni Kitap Ekle"}</h2>

      <input
        ref={titleRef}
        type="text"
        placeholder="Kitap Başlığı"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e, authorRef)}
      />

      <input
        ref={authorRef}
        type="text"
        placeholder="Yazar"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e, genreRef)}
      />

      <input
        ref={genreRef}
        type="text"
        placeholder="Tür"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e, coverRef)}
      />

      <input
        ref={coverRef}
        type="text"
        placeholder="Kitap Kapağı URL (İsteğe Bağlı)"
        value={cover}
        onChange={(e) => setCover(e.target.value)}
      />

      <button type="submit">{id ? "Kitabı Güncelle" : "Kitap Ekle"}</button>
    </form>
  );
}

export default BookForm;
