import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBookStore = create(
  persist(
    (set, get) => ({
      books: [
        {
          id: 1,
          title: "Clean Code",
          author: "Robert C. Martin",
          category: "Software Engineering",
          cover:
            "https://m.media-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg",
        },
        {
          id: 2,
          title: "You Don't Know JS Yet",
          author: "Kyle Simpson",
          category: "JavaScript",
          cover: "https://m.media-amazon.com/images/I/81kqrwS1nNL._SL1500_.jpg",
        },
        {
          id: 3,
          title: "The Pragmatic Programmer",
          author: "Andrew Hunt & David Thomas",
          category: "Software Development",
          cover: "https://m.media-amazon.com/images/I/71fZB8tXGEL.jpg",
        },
      ],

      categories: [],
      filteredBooks: [],
      addBook: (newBook) =>
        set((state) => {
          const bookWithCategory = {
            ...newBook,
            category: newBook.genre,
          };
          const updatedBooks = [...state.books, newBook];
          const updatedCategories = [
            ...new Set(updatedBooks.map((book) => book.genre)),
          ];
          return {
            books: updatedBooks,
            categories: updatedCategories,
            filteredBooks: updatedBooks,
          };
        }),
      deleteBook: (id) =>
        set((state) => {
          const updatedBooks = state.books.filter((book) => book.id !== id);
          const updatedCategories = [
            ...new Set(updatedBooks.map((book) => book.genre.trim())),
          ];
          return {
            books: updatedBooks,
            categories: updatedCategories,
            filteredBooks: updatedBooks,
          };
        }),
      updateBook: (updatedBook) =>
        set((state) => {
          const updatedBooks = state.books.map((book) =>
            book.id === updatedBook.id ? updatedBook : book
          );
          const updatedCategories = [
            ...new Set(updatedBooks.map((book) => book.genre)),
          ];
          return {
            books: updatedBooks,
            categories: updatedCategories,
            filteredBooks: updatedBooks,
          };
        }),
      filterBooks: (searchTerm) => {
        const allBooks = get().books;
        const term = searchTerm.trim().toLocaleLowerCase("tr-TR");
        const regex = new RegExp(term, "i");

        const filtered = allBooks.filter((book) => {
          return (
            book.title.toLocaleLowerCase("tr-TR").match(regex) !== null ||
            book.author.toLocaleLowerCase("tr-TR").match(regex) !== null
          );
        });

        set({ filteredBooks: filtered });
        console.log("Aranan terim:", term);
        console.log("Filtrelenen kitaplar:", filtered);
      },
    }),
    { name: "book-storage" }
  )
);

export default useBookStore;
