import React, { useEffect, useState } from "react";
import NewItem from "./NewItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url)
    props.setProgress(50)
    let parsedData = await data.json()
    props.setProgress(70)
    // console.log(parsedData)
    // parsedData.then((value)=>  // It will be used if we are not using the "await" 
    //   console.log(value)
    // )
    setArticles(articles.concat(parsedData.articles))
    setLoading(false)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100)
  }

  useEffect(() => {
    updateNews()
    document.title = capitalizeFirstLetter(`${props.category} - TopNewsApp`)
    // console.log("News Item is run")
    // eslint-disable-next-line 
  }, [])

  // const handleNextClick = async () => {
    //   updateNews()
    //   setPage(page + 1)
  //   // console.log("Next")
  // }

  // const handlePrevClick = async () => {
    //   updateNews()
    //   setPage(page - 1)
  //   // console.log("Previous")
  // }

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
    setPage(page + 1)
    // setLoading(true)
    let data = await fetch(url)
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    // setLoading(false)
  };

  return (
    <>
      <h2 className="text-center" style={{ margin: "36px 0px" }}>TopNewsApp - Top {capitalizeFirstLetter(`${props.category}`)} Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>   {/* pass a unique key prop for every div*/}
                {console.log(element)}
                <NewItem title={element.title ? element.title.slice(0, 40) : " "} description={element.description ? element.description.slice(0, 88) : " "} imageUrl={element.urlToImage} className="card-img-top" newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
        {/* {setLoading(false)} */}

      </InfiniteScroll>
      {/* <div className="d-flex justify-content-between">
          <button type="button" disabled={page <= 1} className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
          <button type="button" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
    </>
  );
}


News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

export default News