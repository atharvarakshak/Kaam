import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "1c94ca64b42c45d191da9973e97fbe25";
  const endpoint = "https://newsapi.org/v2/everything";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(endpoint, {
          params: {
            q: "World Anti-Doping Agency OR doping in sports OR new doping norms OR anti-doping regulations OR WADA updates OR athlete doping OR anti-doping policies OR drug testing in sports",
            apiKey: apiKey,
            pageSize: 3,
            sortBy: "publishedAt",
            language: "en"
          },
        });
        setNewsItems(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="news-section" className="bg-white text-gray-800 py-12 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-semibold text-black mb-4">
            Latest News
          </h2>
          <p className="text-lg text-gray-800 mb-6">
            Stay informed about the latest developments in doping and anti-doping efforts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {newsItems.map((news, index) => (
            <Link
              key={index}
              to={news.url}
              className="flex flex-col bg-blue-600 p-6 rounded-lg text-white border-2 border-transparent hover:bg-white hover:text-blue-600 hover:border-blue-600 transition"
            >
              <div className="mb-4">
                <img
                  src={news.urlToImage}
                  alt={news.title}
                  className="mb-4 rounded-lg h-48 w-full object-cover"
                />
                <span className="text-sm opacity-75 mb-2 block">
                  {new Date(news.publishedAt).toLocaleDateString()}
                </span>
                <h3 className="text-xl font-medium mb-3">{news.title}</h3>
                <p className="text-sm opacity-80">{news.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
