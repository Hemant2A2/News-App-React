import React from "react";

const NewsItem = (props)=> {
  
    let { title, description, imageUrl, newsUrl, author, date, source } =
      props;

    return (
      <div className="my-3">
        <div className="card">
          <span
            class="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
            style={{ zIndex: 1, left: "85%" }}
          >
            {source}
          </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <div className="card-footer">
              <small className="text-body-secondary">
                By {author} on {new Date(date).toGMTString()}
              </small>
            </div>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-info"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
