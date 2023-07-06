import { ReqNewsData } from "pages/News";
import styled from "styled-components";
import noImage from "assets/images/noImage.jpeg";

interface NewsArticleProps {
  news: ReqNewsData;
}

const NewsArticle = ({ news }: NewsArticleProps) => {
  const handleClickNews = (link: string) => {
    window.open(link);
  };

  const handleImgError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = noImage;
  };

  return (
    <NewsArticleWrapper onClick={() => handleClickNews(news.link)}>
      <div className="news-thumbnail-wrapper">
        <img
          src={
            news.pagemap?.cse_image
              ? news.pagemap?.cse_image[0].src
              : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
          }
          className="news-thumbnail-img"
          alt="thumbnail"
          onError={handleImgError}
        />
      </div>
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
  background-color: rgba(255, 255, 255, 0.5);
  color: #333;
  display: flex;
  padding: 1rem;
  gap: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: 0.3s;

  .news-thumbnail-wrapper {
    height: 100%;
    width: 25%;
    overflow: hidden;
  }
  .news-thumbnail-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: 0.3s;
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
  :hover {
    filter: brightness(0.7);
    color: #fff;
    .news-thumbnail-img {
      transform: scale(1.1);
      transition: 0.3s;
    }
    .news-content-title {
      text-decoration: underline;
    }
  }
`;

export default NewsArticle;
