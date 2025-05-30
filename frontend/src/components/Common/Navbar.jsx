import { debounce } from "lodash";
import { useState, useCallback, useRef, useEffect } from "react"; // useRef import ediyoruz
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaBookOpen } from "react-icons/fa";
import useBookStore from "../../store/useBookStore"; // Zustand store
import useAuthStore from "../../store/useAuthStore";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { filterBooks } = useBookStore();
  const { currentUser, logout } = useAuthStore();

  const navigate = useNavigate();
  const inputWrapperRef = useRef(null);
  const inputRef = useRef(null);

  const location = useLocation();
  const currentPath = location.pathname;

  const handleSearchClick = () => {
    setShowSearch((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (currentPath === "/" || currentPath === "/raflar") {
      debouncedFilter(value);
    }
  };

  const debouncedFilter = useCallback(
    debounce((value) => {
      filterBooks(value);
    }, 300),
    [filterBooks]
  );
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        inputWrapperRef.current &&
        !inputWrapperRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="navbar">
      <NavLink to="/" style={{ border: "none" }}>
        <div className="logo">
          <FaBookOpen size={28} color="#432818" />
        </div>
      </NavLink>

      <div className="search" ref={inputWrapperRef}>
        <FaSearch
          size={22}
          style={{ cursor: "pointer", color: "#432818" }}
          onClick={handleSearchClick}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Kitap ara..."
          value={searchTerm}
          onChange={handleInputChange}
          style={{
            width: showSearch ? "200px" : "0", // genişlik için geçerli stil
            opacity: showSearch ? 1 : 0, // opaklık için geçerli stil
            transition: "width 0.3s ease, opacity 0.3s ease", // animasyon
          }}
        />
      </div>

      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Ana Sayfa
          </NavLink>
        </li>
        {currentUser?.isAdmin && (
          <li>
            <NavLink
              to="/form"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Form
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/raflar"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Raflar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/iletisim"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            İletişim
          </NavLink>
        </li>

        {!currentUser ? (
          <>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Kayıt Ol
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Giriş Yap
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <span className="user-info">
                Hoş geldin, {currentUser.fullName}
              </span>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Çıkış Yap
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
