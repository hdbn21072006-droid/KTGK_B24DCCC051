import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        My Blog
      </Link>
      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          Trang chủ
        </NavLink>
        <Link to="/create" className="btn btn-create">
          Viết bài mới
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
