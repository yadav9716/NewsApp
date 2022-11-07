import React from 'react'

const NewItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;

    return (
      <div className='my-3'>
        <div className="card">
          <div style={{
            display: 'flex',
            position: 'absolute',
            top: '-10px',
            right: '0px'
          }}>
            <span className="badge rounded-pill bg-danger" style={{ left: '90%' }}>{source} </span>
          </div>
          <img src={imageUrl ? imageUrl : "https://blog.playstation.com/tachyon/2022/06/0c3c20a8d8514501524a0859461f391572ea6e61.jpg?resize=1088%2C612&crop_strategy=smart&zoom=1.5"} alt="The image is not available" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            <p className="card-text"><small className="text-danger">By {!(author) ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
          </div>
        </div>
      </div>
    )
}

export default NewItem

