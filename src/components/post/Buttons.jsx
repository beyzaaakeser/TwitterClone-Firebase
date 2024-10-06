import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import {
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRetweet,
  FaShareNodes,
} from 'react-icons/fa6';
import { auth, db } from '../../firebase';

const Buttons = ({ tweet }) => {
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  const toggleLike = async () => {
    const tweetRef = doc(db, 'tweets', tweet.id);

    await updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };
  return (
    <div className="flex justify-between items-center">
      <div
        className="p-3 rounded-full cursor-pointer transition 
      hover:bg-blue-400/40"
      >
        <FaRegComment />
      </div>
      <div
        className="p-3 rounded-full cursor-pointer transition 
      hover:bg-green-300/30"
      >
        <FaRetweet />
      </div>
      <div
        onClick={toggleLike}
        className="p-3 rounded-full cursor-pointer transition 
      hover:bg-red-400/30 flex items-center gap-1 "
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        {tweet.likes.length}
      </div>
      <div
        className="p-3 rounded-full cursor-pointer transition 
      hover:bg-gray-400/30"
      >
        <FaShareNodes />
      </div>
    </div>
  );
};

export default Buttons;
