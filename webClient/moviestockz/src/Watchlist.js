import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import baseURL from './config';

const Watchlist = (data) => {
  console.log(data)
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = (item) => {

    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `${baseURL}/updatewatchlistmovie?id=${item._id}`,
      headers: { }
    };

    axios.request(config)
    .then((response) => {
      fetchData();
      console.log(response.data.watched);
    })
    .catch((error) => {
      console.log(error);
    });
}


const handleRemove = (item) => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${baseURL}/deletewatchlistmovie?id=${item._id}`,
      headers: { }
    };

    axios.request(config)
    .then((response) => {
      fetchData();
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });


}

  const fetchData = () => {
    setHasMore(true)
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${baseURL}/getwatchlistmovies`,
        };
    
        axios.request(config)
          .then((response) => {
            if(response !== 0){
                setItems(response.data);
                setHasMore(false)
            }else{
                setHasMore(false)
            }
          })
          .catch((error) => {
            console.log(error);
          });
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      hasMore={hasMore}
      loader={hasMore ? <h4>Loading...</h4> : null}
      endMessage={!hasMore ? <h4>No more items</h4> : null}
    >
      <div className="tile-view" style={{ marginTop:'24px', border: '5px solid black', backgroundColor: 'white', padding: '10px' }}>
        {items.map(item => (
          <div key={item.id} className="tile" style={{ border: '1px solid white', backgroundColor: 'black', padding: '10px' }}>
            <img   style={{ display: 'block', margin: 'auto' }} src={"https://image.tmdb.org/t/p/w500"+item.backdrop_path} alt={item.title} />
            <h3 style={{ color: 'white' }}>{item.original_title}</h3>
            <p style={{ color: 'red' }}>{item.vote_average}</p>
            <p style={{ color: 'white' }}>{item.overview}</p>
            <p style={{ color: 'white' }}>({item.release_date})</p>
            <button onClick={() => handleUpdate(item)} style={{backgroundColor: 'Yellow', color: 'black', borderRadius: '5px' }}>{item.watched ? 'Watched' : 'Mark as watched'}</button>
            <button onClick={() => handleRemove(item)} style={{backgroundColor: 'Red', color: 'white', borderRadius: '5px' }}>Remove from watchlist</button>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Watchlist;

