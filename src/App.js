import React, { useState, useEffect } from 'react';
import './App.css'; // Add necessary CSS styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if there are more pages

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
    
      const scrollTop = window.scrollY;
      // console.log(Math.trunc(windowHeight+scrollTop),documentHeight);
      if (Math.trunc(windowHeight+scrollTop) === documentHeight) {
        console.log('You have hit the bottom!');
        if (!loading && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      }
    };

    const scrollListener = () => {
      window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, [loading, hasMore]);
  

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}`);
        const data = await response.json();
        if (data.length === 0) {
          setHasMore(false);
        } else {
          const photosWithLikes = data.map(photo => ({ ...photo, likes: 0 }));
          setPhotos(prevPhotos => [...prevPhotos, ...photosWithLikes]);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [page]); // Fetch new data when page changes

  const handleThumbsUp = (id) => {
    setPhotos(prevPhotos => {
      return prevPhotos.map(photo => {
        if (photo.id === id) {
          return { ...photo, likes: photo.likes + 1 };
        }
        return photo;
      });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Photo Gallery</h1>
      </header>
      <div className="gallery">
        {photos.map(photo => (
          <div className="photo" key={photo.id}>
            <img src={photo.download_url} alt={photo.author} />
            <div className="author">{photo.author}</div>
            <div className="thumbs-up">
              <FontAwesomeIcon
                icon={faThumbsUp}
                onClick={() => handleThumbsUp(photo.id)}
              />
              {photo.likes > 0 && <span className="count">{photo.likes}</span>}
            </div>
          </div>
        ))}
        {loading && <div>Loading...</div>}
        {!hasMore && <div>No more photos</div>}
      </div>
    </div>
  );
}

export default App;
