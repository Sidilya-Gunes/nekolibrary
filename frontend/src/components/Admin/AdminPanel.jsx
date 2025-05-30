import React, { useState } from "react";
import useAuthStore from "../../store/useAuthStore";

const SECRET_CODE = "Kitap123!";

function AdminPanel() {
  const { register } = useAuthStore();

  const [authCode, setAuthCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = (e) => {
    e.preventDefault();
    if (authCode === SECRET_CODE) {
      setIsVerified(true);
    } else {
      alert("Gizli şifre yanlış!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ fullName, email, phone, password, isAdmin: true });
    alert("Admin başarıyla eklendi!");
    setFullName("");
    setEmail("");
    setPhone("");
    setPassword("");
  };
  return (
    <div>
      {!isVerified ? (
        <form onSubmit={handleAuth}>
          <h2>🔐 Gizli Admin Paneli</h2>
          <input
            type="password"
            placeholder="Gizli şifre"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            required
          />
          <button type="submit">Giriş Yap</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Yeni Admin Ekle</h2>
          <input
            type="text"
            placeholder="Ad Soyad"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Admin Olarak Ekle</button>
        </form>
      )}
    </div>
  );
}

export default AdminPanel;
