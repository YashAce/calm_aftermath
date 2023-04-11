import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import store from './store';
import axios from 'axios'
import baseURL from './config';

const TileView = (data) => {
  console.log(data)
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1)
  const [cursor, setCursor] = useState(null)
  const [hasMore, setHasMore] = useState(true)


  let reduxData = store.getState() || null

  store.subscribe(() => {
    reduxData = store.getState() || null;
    console.log("Redux data updated: ", reduxData);
    if(reduxData.language || reduxData.year || reduxData.count){
      setItems([])
      fetchMoreData();
    }
  }); 

  useEffect(() => {
    fetchMoreData();
  }, []);

  const handleAddToWatchlist = (item) => {
        let data = item
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${baseURL}/addmovie`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios.request(config)
        .then((response) => {

          console.log("JSON.stringify(response.data)", response);
          if(response.data !== 'Already added to the watchlist!'){
            alert(`${item.original_title} added to watchlist!`);
          }else{
            alert(`${item.original_title} is already in watchlist!`)
          }
        })
        .catch((error) => {
          console.log(error);
        });

  }

  const fetchMoreData = () => {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${baseURL}/movies?language=${reduxData.language}&releaseyear=${reduxData.year}&count=${reduxData.count}&page=${page}&cursor=${cursor}`,
        };
    
        axios.request(config)
          .then((response) => {
            if(response.data.movies.length !== 0){
                setItems([...items, ...response.data.movies]);
                if(response.data.next_cursor){
                    setCursor(response.data.next_cursor)
                }else{
                    setPage(page + 1)
                }
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
      next={fetchMoreData}
      hasMore={hasMore}
      loader={hasMore ? <h4>Loading...</h4> : null}
      endMessage={!hasMore ? <h4>No more items</h4> : null}
    >
      <div className="tile-view" style={{ marginTop:'24px', border: '5px solid black', backgroundColor: 'white', padding: '10px' }}>
        {items.filter(item => item.overview).map(item => (
      <div key={item.id} className="tile" style={{ border: '1px solid white', backgroundColor: 'black', padding: '10px' }}>
        <img   style={{ display: 'block', margin: 'auto' }} src={"https://image.tmdb.org/t/p/w500"+item.backdrop_path} alt={item.title} />
        <h3 style={{ color: 'white' }}>{item.original_title}</h3>
        <p style={{ color: 'red' }}>{item.vote_average}</p>
        <p style={{ color: 'white' }}>{item.overview}</p>
        <p style={{ color: 'white' }}>({item.release_date})</p>
        <button onClick={() => handleAddToWatchlist(item)} style={{backgroundColor: 'green', color: 'white', borderRadius: '5px' }}>Add to watchlist</button>

      </div>
    ))}
      </div>
    </InfiniteScroll>
  );
};

export default TileView;

