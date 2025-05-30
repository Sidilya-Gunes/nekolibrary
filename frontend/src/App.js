import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import BookForm from "./components/Book/BookForm";
import BookList from "./components/Book/BookList";
import Navbar from "./components/Common/Navbar";
import Raf from "./components/Shelf";
import Iletisim from "./components/Common/Contact";
import Footer from "./components/Common/Footer";
import Login from "./components/Login";
import AdminPanel from "./components/Admin/AdminPanel";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <div className="App main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edit/:id" element={<BookForm />} />
            <Route path="/form" element={<BookForm />} />
            <Route path="/raflar" element={<Raf />} />
            <Route path="/iletisim" element={<Iletisim />} />

            {/* Giriş yapılmadan erişilememesi gereken sayfalar */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
