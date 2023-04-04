import axios from "axios";
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
  sort: string;
}

interface ReqNewsData {
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
  const [newsData, setNewsData] = useState<ReqNewsData[]>();
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
      sort: "date",
    };
    await axios
      .get("https://www.googleapis.com/customsearch/v1", {
        params,
      })
      .then((res) => {
        console.log(res.data.items);
        setNewsData(res.data.items);
        setIsLoading(false);
        if (
          contentCount + 10 >=
          Number(res.data.queries.request[0].totalResults)
        ) {
          setIsLastPage(true);
        }
      });
  };

  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <NewsContainer>
      <h1>News</h1>
      <NewsListWrapper>
        {newsData &&
          newsData.map((news) => (
            <NewsArticle key={news.cacheId}>
              <img
                src={news.pagemap.cse_image[0].src}
                className="news-thumbnail"
                alt="thumbnail"
              />
              <h1>{news.title}</h1>
            </NewsArticle>
          ))}
      </NewsListWrapper>
    </NewsContainer>
  );
};

const NewsContainer = styled(Main)`
  justify-content: flex-start;
  padding: 5rem 6rem;
`;

const NewsListWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NewsArticle = styled.article`
  width: 100%;
  height: 10rem;
  background-color: #fff;
  color: #333;
  display: flex;
  padding: 1rem;
  gap: 1rem;

  .news-thumbnail {
    height: 100%;
    width: 25%;
    object-fit: cover;
  }
`;

export default News;
