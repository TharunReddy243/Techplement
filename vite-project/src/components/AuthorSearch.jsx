import React, { useState } from 'react';
import axios from 'axios';

function AuthorSearch() {
  const [author, setAuthor] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchName,setSearchName] = useState('');

  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;


  const handleAuthorSearch = async () => {
    if (!author.trim()) return;
    setSearchName(author)
    setLoading(true);
    setError(null);
    setQuotes([]);

    try {
      const response = await axios.get(`${API_BASE_URL}/api/quotes/search`, {
        params: { author },
      });
      if (response.data.length === 0) {
        setError(`No quotes found for "${author}".`);
      } else {
        setQuotes(response.data);
      }
    } catch (err) {
      setError('Failed to fetch quotes for that author.');
    }

    setLoading(false);
  };

  return (
    <div className="author-search-section">
      <h2>Search by Author</h2>
      <div className="author-search">
        <input
          className="author-input"
          type="text"
          placeholder="Enter Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button className="search-button" onClick={handleAuthorSearch}>
          Search
        </button>
      </div>

      {loading && <p className="loading-text">Loading quotes...</p>}
      {error && <p className="error-text">{error}</p>}
      {quotes.length > 0 && (
        <div className="author-quotes-block">
          <h3>Quotes from {searchName}</h3>
          <ul className="quote-list">
            {quotes.map((q, index) => (
              <li className="quote-item" key={index}>
                "{q.body}"
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AuthorSearch;
