import moment from 'moment';
import React from 'react';
import { MdEdit } from 'react-icons/md';

const UserInfo = ({ tweet }) => {
  const username = tweet.user.name.toLowerCase().replaceAll(' ', '_');

  let date  = tweet.createdAt?.toDate()
  
  date = moment(date).fromNow()
  return (
    <div className="flex gap-3 items-center whitespace-nowrap text-gray-400 text-sm">
      <p className="text-white">{tweet.user.name}</p>
      <p className="">@{username}</p>
      <p>{date}</p>
      {tweet.isEdited && (
        <p className="text-xs">
          <MdEdit className="md:hidden text-base" />
          <span className="max-md:hidden">* düzenlendi</span>
        </p>
      )}
    </div>
  );
};

export default UserInfo;
