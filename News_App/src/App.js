import React, { useState } from 'react'
import Navabar from './components/Navabar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import './App.css';
// 91787f4c67054984975450ed28f2fd52
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


// First install the package given below before using the router
// npm install react-router-dom

const App = (props) => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState("")

  return (
    <div>
      <Router>
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Navabar />
        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={pageSize} country="in" setProgress={setProgress} apiKey={apiKey} category="general" />}></Route>
          <Route exact path="/business" element={<News key="business" pageSize={pageSize} country="in" setProgress={setProgress} apiKey={apiKey} category="business" />}></Route>
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} country="in" setProgress={setProgress} apiKey={apiKey} category="entertainment" />}></Route>
          <Route exact path="/general" element={<News key="general" pageSize={pageSize} country="in" setProgress={setProgress} apiKey={apiKey} category="general" />}></Route>
          <Route exact path="/health" element={<News key="health" pageSize={pageSize} country="in" setProgress={setProgress} apiKey={apiKey} category="health" />}></Route>
          <Route exact path="/science" element={<News key="science" pageSize={pageSize} country="in" setProgress={setProgress} apiKey={apiKey} category="science" />}></Route>
          <Route exact path="/sports" element={<News key="sports" pageSize={pageSize} country="in" setProgress={setProgress} apiKey={apiKey} category="sports" />}></Route>
          <Route exact path="/technology" element={<News key="technology" pageSize={pageSize} country="in" setProgress={setProgress} apiKey={apiKey} category="technology" />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
