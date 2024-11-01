import React from 'react';
import Modal from './index.jsx';
import { db, auth } from '../../firebase/index.js';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

const CommentModal = ({ tweet, isOpen, close }) => {
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target[0].value;

    if (!text) return close();

    const userName = user.displayName;
    const tweetRef = doc(db, 'tweets', tweet.id);

    await updateDoc(tweetRef, {
      comments: arrayUnion({
        userId: user.uid,
        username: userName,
        text: text.trim(),
        photo: user.photoURL,
      }),
    });

    close();
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <h1>Yorum ekle</h1>

      <form onSubmit={handleSubmit} action="">
        <input type="text" className="w-full mt-5" />

        <div className="mt-5 flex justify-end gap-5">
          <button
            type="button"
            onClick={() => {
              close();
            }}
            className="px-4 bg-amber-500 hover:bg-amber-600 transition py-2"
          >
            İptal
          </button>
          <button className="px-4 bg-green-600 py-2 hover:bg-green-700 transition">
            Gönder
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CommentModal;
