import React from 'react';
import './App.css';
import QuoteBox from './components/QuoteBox';
import AuthorSearch from './components/AuthorSearch';

function App() {
  return (
    <div className="app-container">
      <div className="app-header">
        <div className="logo-title">
          <img
            className="app-logo"
            src="https://th.bing.com/th/id/R.f48cca9500783025d7093ae75e6e2bb5?rik=KXffRAN89NAPbQ&riu=http%3a%2f%2fclipart-library.com%2fimages%2fpc7re9aRi.gif&ehk=Pk0%2fYuwqaDKVWFgvGdXBKFGTke1fYbEbWPnAZ2Xg4d8%3d&risl=&pid=ImgRaw&r=0"
            alt="Logo"
          />
          <h1 className="app-title">QUOTE EXPLORER</h1>
        </div>
        <p>Start your day with inspiring quotes from the world's greatest minds.</p>
      </div>

      <div className="content">
        <QuoteBox />
        <AuthorSearch />
      </div>
    </div>
  );
}

export default App;
