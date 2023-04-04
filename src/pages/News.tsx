import axios from "axios";
import Loader from "components/Loader";
import NewsArticle from "components/News/NewsArticle";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Main } from "styles/Main";

interface ReqParams {
  key: string | undefined;
  cx: string | undefined;
  q: string;
  dateRestrict?: string;
  hq?: string;
  start: number;
  sort?: string;
}

export interface ReqNewsData {
  cacheId: string;
  displayLink: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  htmlSnippet: string;
  htmlTitle: string;
  kind: string;
  link: string;
  snippet: string;
  title: string;
  pagemap: {
    cse_image: [
      {
        src: string;
      }
    ];
  };
}

const News = () => {
  const [contentCount, setContentCount] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [newsData, setNewsData] = useState<ReqNewsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getNewsData = async () => {
    setIsLoading(true);
    const params: ReqParams = {
      key: process.env.REACT_APP_GOOGLE_API_KEY,
      cx: process.env.REACT_APP_GOOGLE_SEARCH_CX,
      q: "맨시티",
      dateRestrict: "w2",
      hq: "맨체스터 시티",
      start: contentCount,
    };
    await axios
      .get("https://www.googleapis.com/customsearch/v1", {
        params,
      })
      .then((res) => {
        setNewsData((cur) => [...cur, ...res.data.items]);
        setIsLoading(false);
        if (
          contentCount + 10 >=
          Number(res.data.queries.request[0].totalResults)
        ) {
          setIsLastPage(true);
        }
      });
  };

  const handleMoreData = () => {
    setContentCount((cur) => cur + 10);
  };

  useEffect(() => {
    getNewsData();
  }, [contentCount]);

  return (
    <NewsContainer>
      <h1 className="news-title">
        최근 2주 동안의 맨체스터 시티 관련 기사들을 살펴보세요!
      </h1>
      <NewsListWrapper>
        {newsData.length !== 0 &&
          newsData.map((news) => (
            <NewsArticle key={news.cacheId} news={news} />
          ))}
        {!isLastPage ? (
          isLoading ? (
            <Loader />
          ) : (
            <MoreButton onClick={handleMoreData}>MORE ...</MoreButton>
          )
        ) : (
          <div>This is last content!</div>
        )}
      </NewsListWrapper>
    </NewsContainer>
  );
};

const NewsContainer = styled(Main)`
  justify-content: flex-start;
  padding: 5rem 3rem;

  .news-title {
    font-size: 1.3rem;
    margin-top: 1.5rem;
  }
  @media screen and (max-width: 576px) {
    padding: 5rem 0.5rem;
  }
`;

const NewsListWrapper = styled.section`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: 0.3s;
  padding: 3rem 0;

  @media screen and (max-width: 1280px) {
    width: 100%;
  }
`;

const MoreButton = styled.div`
  width: 100%;
  height: 5rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;

  :hover {
    filter: brightness(0.8);
    color: #fff;
    transition: 0.3s;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3);
  }
`;

export default News;
