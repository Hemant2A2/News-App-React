import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  

  //   async componentDidMount() {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${state.page}&pageSize=${props.pageSize}`;
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     setState({
  //       articles: parsedData.articles,
  //       totalResults: parsedData.totalResults,
  //       loading: false,
  //     });
  //   }

  const updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    document.title = `${capitalize(props.category)} - News`;
    updateNews();
  }, []);

  // async handleNextClick(){
  //     setState({page : state.page + 1});
  //     updateNews();
  // }

  // async handlePreviousClick(){
  //     setState({page : state.page - 1});
  //     updateNews();
  // }

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        Top {capitalize(props.category)} Headlines
      </h1>
      {/* {state.loading && <Spinner></Spinner>} */}
      <InfiniteScroll
        dataLength={articles.length}
        hasMore={articles.length !== totalResults}
        next={() => {
          fetchMoreData();
        }}
        loader={
          <h4>
            <Spinner></Spinner>
          </h4>
        }
      >
        <div className="container">
          <div className="row">
            {articles.map((elem) => {
              return (
                <div className="col-md-4" key={elem.id}>
                  <NewsItem
                    title={elem.title ? elem.title.slice(0, 45) : ""}
                    description={
                      elem.description ? elem.description.slice(0, 88) : ""
                    }
                    imageUrl={
                      elem.urlToImage
                        ? elem.urlToImage
                        : "https://t3.ftcdn.net/jpg/00/88/43/58/360_F_88435847_HhglbcoGP5qOX3DfudP3hN5z95eTrHqz.jpg"
                    }
                    newsUrl={elem.url}
                    author={elem.author ? elem.author : "unknown"}
                    date={elem.publishedAt}
                    source={elem.source.name}
                  ></NewsItem>
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-around">
        <button disabled = {state.page <= 1} type="button my-2" className="btn btn-dark" onClick = {()=>{handlePreviousClick()}}> &larr; Previous</button>
        <button disabled = {state.page + 1 > Math.ceil(state.totalResults/props.pageSize)} type="button my-2" className="btn btn-dark" onClick ={()=>{handleNextClick()}}>Next &rarr;</button>
        </div> */}
    </>
  );
};

export default News;
