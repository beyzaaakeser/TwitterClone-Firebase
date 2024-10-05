import React from 'react';
import { ImGift } from 'react-icons/im';

const Content = ({ tweet }) => {
  return (
    <div className="my-4">
      {tweet.textContent && <p>{tweet.textContent}</p>}
      {tweet.imageContent && (
        <img
          src={tweet.imageContent}
          className="my-2 rounded-lg w-full object-cover max-h-[500px]"
          alt="image-content"
        />
      )}
    </div>
  );
};

export default Content;
