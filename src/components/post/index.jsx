import React, { useState } from 'react';
import UserInfo from './UserInfo';
import DropDown from './DropDown';
import Content from './Content';
import Buttons from './Buttons';

const Post = ({ tweet }) => {
  const [comments, setComments] = useState(false);
  return (
    <div className="p-5 border-b border-zinc-600 flex gap-3">
      <img
        src={tweet.user.photo}
        alt="profile"
        className="size-12 rounded-full"
      />
      <div className="w-full">
        <div className="flex  items-center justify-between">
          <UserInfo tweet={tweet} />
          <DropDown tweet={tweet} />
        </div>
        <Content tweet={tweet} />
        <Buttons tweet={tweet} />

        {tweet.comments && (
          <button
            onClick={() => setComments(!comments)}
            className="text-sm italic my-2 cursor-pointer hover:underline hover:text-blue-600"
          >
            Yorumları Gör
          </button>
        )}

        {comments &&
          tweet.comments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col text-sm rounded gap-2 p-3 bg-zinc-700 mb-2"
            >
              <div className="flex items-center gap-2">
                <img className="size-8 rounded-full" src={item.photo} alt="" />
                <p className="border-b border-zinc-600 text-gray-300">
                  {item.username}{' '}
                </p>
              </div>

              <p>{item.text}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Post;
