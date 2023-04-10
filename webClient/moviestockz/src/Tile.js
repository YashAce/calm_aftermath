import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import store from './store';
import { setMovies } from './action';
import axios from 'axios'

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

  const fetchMoreData = () => {
    console.log("111111111111", reduxData);

        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `http://localhost:3001/movies?language=${reduxData.language}&releaseyear=${reduxData.year}&count=${reduxData.count}&page=${page}&cursor=${cursor}`,
        };
    
        axios.request(config)
          .then((response) => {
            if(response.data.movies.length !== 0){
                console.log("cameeeeeeeeeee",response.data.movies)
                setItems([...items, ...response.data.movies]);
                if(response.data.next_cursor){
                    setCursor(response.data.next_cursor)
                }else{
                    setPage(page + 1)
                }
            }else{
              console.log("overrrrrrrrr")
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
      <div className="tile-view">
        {items.map(item => (
          <div key={item.id} className="tile">
            {/* <img src={item.image} alt={item.title} /> */}
            <h3>{item.original_title}</h3>
            <p>{item.vote_average}</p>
            <p>{item.overview}</p>
            <p>{item.release_date}</p>


          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default TileView;

