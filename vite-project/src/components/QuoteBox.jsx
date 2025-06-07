import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuoteBox() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:6969/api/quotes/random');
      setQuote(response.data);
    } catch (err) {
      setError('Failed to fetch quote.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-block">
      <div className="button-group">
        <h2 className='quote-block-heading'>Random Quote</h2>
        <button className="action-button" onClick={fetchQuote}>Get Random Quote</button>
      </div>
      <div className='quote-box'>
        {loading ? (
          <p className="loading-text">Loading quote...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          quote && (
            <>
              <h3 className="quote-text">"{quote.body}"</h3>
              <p className="quote-author">— {quote.author}</p>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default QuoteBox;
