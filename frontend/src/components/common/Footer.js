import React from 'react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <p>
        &copy; {new Date().getFullYear()} LearnHub. Built with the MERN stack.
      </p>
    </footer>
  );
};

export default Footer;
