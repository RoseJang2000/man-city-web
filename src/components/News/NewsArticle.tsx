import { ReqNewsData } from "pages/News";
import styled from "styled-components";

interface NewsArticleProps {
  news: ReqNewsData;
}

const NewsArticle = ({ news }: NewsArticleProps) => {
  return (
    <NewsArticleWrapper>
      <img
        src={news.pagemap.cse_image[0].src}
        className="news-thumbnail"
        alt="thumbnail"
      />
      <h1 className="news-title">{news.title}</h1>
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
  :hover .news-title {
    text-decoration: underline;
  }
`;

export default NewsArticle;
