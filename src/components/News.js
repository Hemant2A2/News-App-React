import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {
    constructor(){
        super();
        this.state = {
            articles : [],
            loading : false,
            page : 1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6b0e2769409b4869b5651359038af440&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles : parsedData.articles , 
            totalResults : parsedData.totalResults , 
            loading : false
        })
    }

    async handleNextClick(){
        if(this.state.page + 1 <= Math.ceil(this.state.totalResults/this.props.pageSize)){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6b0e2769409b4869b5651359038af440&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading :true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page : this.state.page + 1,
                articles : parsedData.articles,
                loading : false
            })
        }
    }

    async handlePreviousClick(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6b0e2769409b4869b5651359038af440&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page : this.state.page - 1,
            articles : parsedData.articles,
            loading : false
        })

    }

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center">Top Headlines</h1>
        {this.state.loading && <Spinner></Spinner>}
        <div className="row">
            {!this.state.loading && this.state.articles.map((elem)=>{
                return <div className="col-md-4" key = {elem.id} >
                <NewsItem  title = {elem.title?elem.title.slice(0,45):""} description = {elem.description?elem.description.slice(0,88):""} imageUrl = {elem.urlToImage?elem.urlToImage:"https://t3.ftcdn.net/jpg/00/88/43/58/360_F_88435847_HhglbcoGP5qOX3DfudP3hN5z95eTrHqz.jpg"} newsUrl = {elem.url}></NewsItem>
            </div>
            })}
        </div>
        <div className="container d-flex justify-content-around">
        <button disabled = {this.state.page <= 1} type="button my-2" className="btn btn-dark" onClick = {()=>{this.handlePreviousClick()}}> &larr; Previous</button>
        <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button my-2" className="btn btn-dark" onClick ={()=>{this.handleNextClick()}}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
