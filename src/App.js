import React, { useState, useEffect } from 'react';
import translations from './translations.json';
import './App.css';
import NotFoundPage from './NotFoundPage';

const RegisterPage = () => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const bodyElement = document.querySelector('body');
    if (bodyElement) {
      bodyElement.classList.toggle('dark-body', theme === 'dark');
      bodyElement.classList.toggle('light-body', theme === 'light');
    }
  }, [theme]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLogout = () => {
    window.location = '/';
  };

  const translation = translations[language];

  return (
    <div>
      <h2>Register Page</h2>
      <p>Some content here...</p>
      <select value={language} onChange={handleLanguageChange}>
        <option value="en">{translation.english}</option>
        <option value="he">{translation.hebrew}</option>
        <option value="el">{translation.greek}</option>
      </select>
      <div className="button-container">
        <button className="theme-button" onClick={handleThemeToggle}>
          {theme === 'light' ? (
            <span>
              <i className="fas fa-moon"></i> {translation.dark}
            </span>
          ) : (
            <span>
              <i className="fas fa-sun"></i> {translation.light}
            </span>
          )}
        </button>
        <button className="logout-button" onClick={handleLogout}>
          {translation.logout}
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [language, setLanguage] = useState('en');
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const bodyElement = document.querySelector('body');
    if (bodyElement) {
      bodyElement.classList.toggle('dark-body', theme === 'dark');
      bodyElement.classList.toggle('light-body', theme === 'light');
    }
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleRegister = () => {
    window.location = '/register';
  };

  const handleLogin = () => {
    window.location = '/login';
  };

  const translation = translations[language];
  const themeClass = theme === 'light' ? 'light-theme' : 'dark-theme';

  const isValidRoute = currentPage === '/register' || currentPage === '/login' || currentPage === '/';

  return (
    <div className={`container ${themeClass}`}>
      {isValidRoute ? (
        currentPage === '/register' ? (
          <RegisterPage />
        ) : (
          <div className="select-wrapper">
            <h1 className="heading">{translation.title}</h1>
            <p className="paragraph">{translation.message}</p>
            <select value={language} onChange={handleLanguageChange}>
              <option value="en">{translation.english}</option>
              <option value="he">{translation.hebrew}</option>
              <option value="el">{translation.greek}</option>
            </select>

            <div className="button-container">
              <button className="theme-button" onClick={handleThemeToggle}>
                {theme === 'light' ? (
                  <span>
                    <i className="fas fa-moon"></i> {translation.dark}
                  </span>
                ) : (
                  <span>
                    <i className="fas fa-sun"></i> {translation.light}
                  </span>
                )}
              </button>
              <button className="register-button" onClick={handleRegister}>
                {translation.register}
              </button>
              <button className="login-button" onClick={handleLogin}>
                {translation.login}
              </button>
            </div>
          </div>
        )
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};

export default Home;
