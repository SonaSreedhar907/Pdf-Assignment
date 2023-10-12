

import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="pdf-assignment">
        <div className="pdf-title">PDF ASSIGNMENT</div>
        <div className="pdf-description">
          Welcome to the PDF assignment showcase. Here you can upload and view PDF documents.
        </div>
        <Link to="/add">
          <button className="upload-button">Click Here</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
