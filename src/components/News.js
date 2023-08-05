import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8, 
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number, 
    category: PropTypes.string,
  }

  capitaliseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
    console.log("category is:",this.props.category);
    document.title = `${this.capitaliseFirstLetter(this.props.category)}-NewsMonkey`;          
  }

  async unpdateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true}) 
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    this.setState({
      articles:parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.unpdateNews();
  }

  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  }


  render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - Top {this.props.category} headlines.</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll 
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length !== this.state.totalResults}
        loader = {<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {this.state.articles && this.state.articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} desc={element.description} imageUrl={element.urlToImage} posturl={element.url} />
            </div>
          ))}
        </div>
        </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News
