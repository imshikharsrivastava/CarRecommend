import React from 'react';
import './Header.css';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'Car Recommendation Platform' }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">{title}</h1>
        <nav className="header-nav">
          <a href="/" className="nav-link">Home</a>
        </nav>
      </div>
    </header>
  );
};
