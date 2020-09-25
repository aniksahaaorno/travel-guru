import React from 'react';
import logo from '../../Image/Icon/Logo.png';
import './Header.css';

const Header = () => {
    return (
           <div className="navigation">
                 <nav>
                    <a href="/home"><img src={logo} alt=""/></a>
                    <input type="search" name="Search" id="" placeholder="Search Your Destination"/>
                    <a href="/news">News</a>
                    <a href="/destination">Destination</a>
                    <a href="/blog">Blog</a>
                    <a href="/contract">Contract</a>
                    <a className="color-btn" href="/login">Login</a>
                 </nav>
           </div>
    );
};

export default Header;