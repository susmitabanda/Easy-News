
import React, { useState } from 'react';
import axios from 'axios';
import './newscontainer.css';

const NewsItem = ({ title, description, src, url }) => {
    const [summary, setSummary] = useState('');
    const [showSummary, setShowSummary] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!title || !src) return null;

    const handleSummarize = async () => {
        setLoading(true);
        setError('');
        setShowSummary(true);

       try {
            const combinedText = `${title || ''}. ${description || ''}`;

            const response = await axios.post('http://localhost:5000/summarize', { text: description });
            console.log("sssssssssssssssssssssssssssssssss", response);
            setSummary(response.data.summary || 'No summary available.');

        } catch (err) {
            setError('Failed to summarize the news.');
            console.log('Summarization error:', err.response || err.message || err);
        }
        setLoading(false);
    };


    return (
        <>
            <div className="news-main-container">
                <div className="box-news">
                    <img src={src} className="card-img-top" alt="news" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More...</a>
                        <button type="button" onClick={handleSummarize} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
                            Summarize
                        </button>
                    </div>
                </div>
            </div>

            {showSummary && (
                <div className="summary-modal">
                    <div className="summary-content">
                        <button onClick={() => setShowSummary(false)} className="close-btn">X</button>
                        {loading && <p>Summarizing...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {!loading && !error && <p>{summary}</p>}
                    </div>
                </div>
            )}
        </>
    );
};

export default NewsItem;

// import React, { useState } from 'react';
// import axios from 'axios';
// import './newscontainer.css';

// const NewsItem = ({ title, description, src, url }) => {
//     const [summary, setSummary] = useState('');
//     const [showSummary, setShowSummary] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     if (!title || !src) return null;

//     const handleSummarize = async () => {
//         setLoading(true);
//         setError('');
//         setShowSummary(true);

//         try {
//             const combinedText = `${title || ''}. ${description || ''}`;
//             const response = await axios.post('http://localhost:3001/api/summarize', { text: combinedText });
//             setSummary(response.data.summary || 'No summary available.');
//         } catch (err) {
//             setError('Failed to summarize the news. ' + (err.message || 'Unknown error'));
//             console.error('Summarization error:', err);
//         }
//         setLoading(false);
//     };

//     return (
//         <>
//             <div className="news-main-container">
//                 <div className="box-news">
//                     <img src={src} className="card-img-top" alt="news" />
//                     <div className="card-body">
//                         <h5 className="card-title">{title}</h5>
//                         <p className="card-text">{description}</p>
//                         <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More...</a>
//                         <button
//                             type="button"
//                             onClick={handleSummarize}
//                             className="btn btn-secondary"
//                             style={{ marginLeft: '10px' }}
//                             disabled={loading}
//                         >
//                             {loading ? 'Summarizing...' : 'Summarize'}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {showSummary && (
//                 <div className="summary-modal">
//                     <div className="summary-content">
//                         <button onClick={() => setShowSummary(false)} className="close-btn">X</button>
//                         {loading && <p>Summarizing...</p>}
//                         {error && <p style={{ color: 'red' }}>{error}</p>}
//                         {!loading && !error && <p>{summary}</p>}
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default NewsItem;
