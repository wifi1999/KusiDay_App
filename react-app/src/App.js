// import React, { useEffect, useState } from 'react'

// function App() {
//     return (
//         <div>
//             <p>Loading</p>
//         </div>
//     )
// }

// export default App;

import React, { useState } from 'react';

function FeedItem({ content, avatarData }) {
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(URL.createObjectURL(file));
    setVideoFile(null);
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setVideoFile(URL.createObjectURL(file));
    setImageFile(null);
  };

  return (
    <div className="feed-item">
      {avatarData && (
        <div className="profile-avatar-name">
          <img src={`data:image/jpeg;base64, ${avatarData}`} alt="Avatar" className="small-avatar" />
          {avatarData && <p className="user-name">{avatarData.name || ''}</p>}
        </div>
      )}
      <p style={{ fontSize: '30px' }}>{content}</p>
      <button className="delete-button">Delete</button>

      {imageFile && <img src={imageFile} alt="Uploaded Image" className="uploaded-image" />}
      {videoFile && (
        <video src={videoFile} className="uploaded-video" controls></video>
      )}
    </div>
  );
}

function App() {
  const [feeds, setFeeds] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (inputValue) {
      const feedItem = {
        content: inputValue,
        avatarData: null, // Replace with your avatar data logic
      };

      setFeeds([feedItem, ...feeds]);
      setInputValue('');
    }
  };

  return (
    <div className="rectangular-box">
      <div className="sameline">
        <input
          type="text"
          className="feeds-input"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="submit" style={{ color: '#f6b71a' }} onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <input type="file" id="image-upload" accept="image/*" onChange={handleImageUpload} />
      <input type="file" id="video-upload" accept="video/*" onChange={handleVideoUpload} />

      <div className="feeds-output">
        {feeds.map((feed, index) => (
          <FeedItem key={index} content={feed.content} avatarData={feed.avatarData} />
        ))}
      </div>

      <input type="hidden" id="avatarData" value="<%= avatar ? avatar.data.toString('base64') : ''}" />
    </div>
  );
}

export default App;

