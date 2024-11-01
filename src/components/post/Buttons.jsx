import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRetweet,
  FaShareNodes,
} from 'react-icons/fa6';
import { auth, db } from '../../firebase';
import CommentModal from '../modal/CommentModal';

const Buttons = ({ tweet }) => {
  const isLiked = tweet.likes.includes(auth.currentUser.uid);
  const [isOpen, setIsOpen] = useState(false);
  const toggleLike = async () => {
    const tweetRef = doc(db, 'tweets', tweet.id);

    await updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  const handleComment = async () => {
    setIsOpen(true);
  };
  return (
    <div className="flex justify-between items-center">
      <div
        className="p-3 rounded-full cursor-pointer transition 
      hover:bg-blue-400/40 flex items-center gap-2"
        onClick={handleComment}
      >
        <FaRegComment
          className={
            tweet.comments?.length > 0 ? 'text-blue-500' : 'text-gray-500'
          }
        />

        {tweet.comments?.length > 0 && (
          <span className="w-2 text-sm">{tweet.comments?.length}</span>
        )}
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
        {tweet.likes.length > 0 && (
          <span className="w-2 text-sm">{tweet.likes.length}</span>
        )}
      </div>
      <div
        className="p-3 rounded-full cursor-pointer transition 
      hover:bg-gray-400/30"
      >
        <FaShareNodes />
      </div>

      <CommentModal
        tweet={tweet}
        isOpen={isOpen}
        close={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export default Buttons;
