import { useEffect, useState } from "react";
import NewsItem from "./Newsitem";
import './newscontainer.css';

const Newsboard = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const apikey_GNnews = process.env.REACT_APP_API_KEY_GN;
        const apikey_newsdata = process.env.REACT_APP_API_KEY_NEWSDATAIO;

        const combinedArticles = [];

        const fetchNewsAPI = fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
            .then(res => res.json())
            .then(data => combinedArticles.push(...(data.articles || [])))
            .catch(err => console.error("NewsAPI error", err));

        const fetchGNews = fetch(`https://gnews.io/api/v4/search?q=india&lang=en&apikey=${apikey_GNnews}`)
            .then(res => res.json())
            .then(data => combinedArticles.push(...(data.articles || [])))
            .catch(err => console.error("GNews error", err));

        const fetchNewsData = fetch(`https://newsdata.io/api/1/latest?apikey=${apikey_newsdata}`)
            .then(res => res.json())
            .then(data => combinedArticles.push(...(data.results || [])))  // Some APIs use `results` not `articles`
            .catch(err => console.error("NewsData error", err));

        Promise.all([fetchNewsAPI, fetchGNews, fetchNewsData]).then(() => {
            console.log("Combined Articles:", combinedArticles);
            setArticles(combinedArticles);
            setLoading(false);
        });
    }, []);

    return (
        <>
            {loading ? (
                <div className='loadingnews'><h1>Loading news...</h1></div>
            ) : (
                <>
                    <div className="news-area">
                        {articles.map((news, index) => (
                            <NewsItem
                                key={index}
                                title={news.title}
                                description={news.content || news.description}
                                src={news.urlToImage || news.image || news.image_url || 'https://via.placeholder.com/150'}
                                url={news.url}
                            />
                        ))}
                    </div>

                    <footer>
                        <div className="footerplace">
                            <div className="newslogo">
                                <h1>Easy<span>News</span></h1>
                                <h2>Follow us🔗</h2>
                            </div>
                            <div className="footer-text">
                                <p>World</p>
                                <p>Politics</p>
                                <p>Entertainment</p>
                                <p>Sports</p>
                                <p>Technology</p>
                            </div>
                        </div>
                    </footer>
                </>
            )}
        </>
    );
};

export default Newsboard;
