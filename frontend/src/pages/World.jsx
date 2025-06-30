import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './newsdesign.css'

function World() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

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
          </div>
        ))
      )}
    </div>
  );
}

export default World;

