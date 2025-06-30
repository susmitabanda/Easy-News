import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './newsdesign.css'

function World() {
  const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [summaries, setSummaries] = useState({});  // Summaries per article
    const [showSummaryIdx, setShowSummaryIdx] = useState(null);  // Which summary modal to show
    const [summarizing, setSummarizing] = useState(false);  // Loading for summarization

  useEffect(() => {
    axios.get('https://newsapi.org/v2/top-headlines?sources=bbc-news,cnn,al-jazeera-english&apiKey=9f25eef6dd5240368ea6b7fb9d392a63')
      .then(response => {
        setNews(response.data.articles);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching world news:', error);
        setLoading(false);
      });
  }, []);

  const handleSummarize = async (title, description, idx) => {
    setError('');
    setSummarizing(true);
    setShowSummaryIdx(idx);

    try {
      const combinedText = `${title || ''}. ${description || ''}`;
      const response = await axios.post('http://localhost:5000/summarize', { text: combinedText });
      console.log("Summary response:", response);

      setSummaries(prev => ({
        ...prev,
        [idx]: response.data.summary || 'No summary available.'
      }));

    } catch (err) {
      setError('Failed to summarize the news.');
      console.log('Summarization error:', err.response || err.message || err);
    }
    setSummarizing(false);
  };

   if (loading) return <div className='loadingnews'><h1>Loading world news...</h1></div>;

  return (
    <div className='newscontainer'>
      <h2>World News</h2>
      {news.length === 0 ? (
        <p>No news found.</p>
      ) : (
        news.map((article, idx) => (
          <div key={idx} style={{ marginBottom: '20px' }} className='newstitlecontainer'>
            <h3>{article.title}</h3>
            {article.urlToImage && <img src={article.urlToImage} alt="" style={{ width: '200px' }} />}
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            
            <button
              type="button"
              onClick={() => handleSummarize(article.title, article.description, idx)}
              className="btn btn-secondary"
              style={{ marginLeft: '10px', background:'#4CAF50' , color:'white', padding:'4px', borderRadius:'5px'}} 
            >
              Summarize
            </button>

            {showSummaryIdx === idx && (
              <div className="summary-modal">
                <div className="summary-content">
                  <button onClick={() => setShowSummaryIdx(null)} className="close-btn">X</button>
                  
                  {summarizing && <p>Summarizing...</p>}
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {!summarizing && !error && <p>{summaries[idx]}</p>}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default World;

