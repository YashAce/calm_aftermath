import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import baseURL from './config';


const Detail = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    console.log("ygsfdfghjkjhgfdcv", id)

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseURL}/movies?id=${id}`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setItems([response.data]);
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
    >
      <div className="tile-view" style={{ marginTop:'24px', border: '5px solid black', backgroundColor: 'white', padding: '10px' }}>
      {items.map(item => (
          <div key={item.id} className="tile" style={{ border: '1px solid white', backgroundColor: 'black', padding: '10px' }}>
          <img src={"https://image.tmdb.org/t/p/original"+item.backdrop_path} alt={item.title} style={{ display: 'block', margin: '0 auto', width: '50%' }}/>
            <h3 style={{ color: 'white' }}>{item.original_title}</h3>
            <p style={{ color: 'red' }}>{item.vote_average}</p>
            <p style={{ color: 'white' }}>{item.overview}</p>
            <p style={{ color: 'white' }}>Release Date: {item.release_date}</p>
            <p style={{ color: 'white' }}>ID: {item.id}</p>
            <p style={{ color: 'white' }}>Original Language: {item.original_language}</p>
            <p style={{ color: 'white' }}>Popularity: {item.popularity}</p>
            <p style={{ color: 'white' }}>Video: {item.video ? 'Yes' : 'No'}</p>
            <p style={{ color: 'white' }}>Adult: {item.adult ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Detail;

