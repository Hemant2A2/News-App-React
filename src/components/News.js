import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalize(this.props.category)} - News`;
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  // async updateNews(){
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //     this.setState({loading : true});
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     this.setState({
  //         articles : parsedData.articles ,
  //         totalResults : parsedData.totalResults ,
  //         loading : false
  //     })
  // }

  // async handleNextClick(){
  //     this.setState({page : this.state.page + 1});
  //     this.updateNews();
  // }

  // async handlePreviousClick(){
  //     this.setState({page : this.state.page - 1});
  //     this.updateNews();
  // }

  async fetchMoreData() {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  render() {
    return (
      <>
        <h1 className="text-center">
          Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {/* {this.state.loading && <Spinner></Spinner>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          hasMore={this.state.articles.length !== this.state.totalResults}
          next={() => {
            this.fetchMoreData();
          }}
          loader={
            <h4>
              <Spinner></Spinner>
            </h4>
          }
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((elem) => {
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
        <button disabled = {this.state.page <= 1} type="button my-2" className="btn btn-dark" onClick = {()=>{this.handlePreviousClick()}}> &larr; Previous</button>
        <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button my-2" className="btn btn-dark" onClick ={()=>{this.handleNextClick()}}>Next &rarr;</button>
        </div> */}
      </>
    );
  }
}
