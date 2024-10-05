import React from 'react';
import { auth } from '../../firebase';

const DropDown = ({ tweet }) => {
  const isOwn = tweet.user.id === auth.currentUser.uid;
  return isOwn && <div>|||</div>;
};

export default DropDown;
