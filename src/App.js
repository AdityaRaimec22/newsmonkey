import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apikey = process.env.REACT_APP_API_KEY
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
          height={3}
          color='#f11946'
          progress={this.state.progress}
          />
          <Routes>
            <Route path="/" element={<News setProgress = {this.setProgress} key="general" apikey={this.apikey} pageSize={6} country="in" category="general" />} />
            <Route path="/business" element={<News setProgress = {this.setProgress} key="business" apikey={this.apikey} pageSize={6} country="in" category="business" />} />
            <Route path="/entertainment" element={<News setProgress = {this.setProgress} key="entertainment" apikey={this.apikey} pageSize={6} country="in" category="entertainment" />} />
            <Route path="/health" element={<News setProgress = {this.setProgress} key="health" apikey={this.apikey} pageSize={6} country="in" category="health" />} />
            <Route path="/science" element={<News setProgress = {this.setProgress} key="science" apikey={this.apikey} pageSize={6} country="in" category="science" />} />
            <Route path="/sports" element={<News setProgress = {this.setProgress} key="sports" apikey={this.apikey} pageSize={6} country="in" category="sports" />} />
            <Route path="/technology" element={<News setProgress = {this.setProgress} key="technology" apikey={this.apikey} pageSize={6} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}


