import { ReqNewsData } from "pages/News";
import styled from "styled-components";

interface NewsArticleProps {
  news: ReqNewsData;
}

const NewsArticle = ({ news }: NewsArticleProps) => {
  const handleClickNews = (link: string) => {
    window.open(link);
  };
  return (
    <NewsArticleWrapper onClick={() => handleClickNews(news.link)}>
      <img
        src={news.pagemap.cse_image[0].src}
        className="news-thumbnail"
        alt="thumbnail"
      />
      <div className="news-content">
        <h1 className="news-content-title">{news.title}</h1>
        <p className="news-content-desc">
          {news.snippet.split(" ...").slice(1).join("")}
        </p>
        <p className="news-content-date">{news.snippet.split("...")[0]}</p>
      </div>
    </NewsArticleWrapper>
  );
};

const NewsArticleWrapper = styled.article`
  width: 100%;
  height: 10rem;
  background-color: #ffffffb5;
  color: #333;
  display: flex;
  padding: 1rem;
  gap: 1rem;
  cursor: pointer;

  .news-thumbnail {
    height: 100%;
    width: 25%;
    object-fit: cover;
  }
  .news-content {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .news-content-title,
  .news-content-desc {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  :hover .news-content-title {
    text-decoration: underline;
  }
`;

export default NewsArticle;
