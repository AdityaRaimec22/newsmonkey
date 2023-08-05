import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
    let {title, desc, imageUrl, posturl} = this.props 
    return (
      <div>
        <div className="card" >
            <img src={imageUrl?imageUrl:"https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{desc}</p>
                <a href={posturl} target='_blank' className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
