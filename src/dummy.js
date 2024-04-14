// import React, { useState, useEffect } from 'react';
// import './App.css'; // Add necessary CSS styles
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

// function App() {
//   const [photos, setPhotos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchPhotos();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page]);

//   const fetchPhotos = () => {
//     setLoading(true);
//     fetch(`https://picsum.photos/v2/list?page=${page}`)
//       .then(response => response.json())
//       .then(data => {
//         // Initialize likes property for each photo
//         const photosWithLikes = data.map(photo => ({...photo, likes: 0}));
//         setPhotos(prevPhotos => [...prevPhotos, ...photosWithLikes]);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching photos:', error);
//         setLoading(false);
//       });
//   };

//   const handleThumbsUp = (id) => {
//     setPhotos(prevPhotos => {
//       return prevPhotos.map(photo => {
//         if (photo.id === id) {
//           return {...photo, likes: photo.likes + 1};
//         }
//         return photo;
//       });
//     });
//   };

//   const handleScroll = () => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop ===
//       document.documentElement.offsetHeight
//     ) {
//       setPage(prevPage => prevPage + 1);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Photo Gallery</h1>
//       </header>
//       <div className="gallery">
//         {photos.map(photo => (
//           <div className="photo" key={photo.id}>
//             <img src={photo.download_url} alt={photo.author} />
//             <div className="author">{photo.author}</div>
//             <div className="thumbs-up">
//               <FontAwesomeIcon
//                 icon={faThumbsUp}
//                 onClick={() => handleThumbsUp(photo.id)} // Pass photo id
//               />
//               {/* Render likes count only when it is greater than 0 */}
//               {photo.likes > 0 && <span className="count">{photo.likes}</span>}
//             </div>
//           </div>
//         ))}
//         {loading && <div>Loading...</div>}
//       </div>
//     </div>
//   );
// }

// export default App;
