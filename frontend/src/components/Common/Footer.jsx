import React from "react";

function Footer() {
  return (
    <div className="footer">
      <p>&copy; 2025 Miwa. Tüm hakları saklıdır.</p>
      <div className="social-links">
        <a
          href="https://www.instagram.com/miwa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>{" "}
        |
        <a
          href="https://twitter.com/miwa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-twitter"></i>
        </a>{" "}
        |
        <a
          href="https://www.linkedin.com/in/miwa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>{" "}
        |
        <a
          href="https://www.github.com/miwa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
      </div>
    </div>
  );
}

export default Footer;
