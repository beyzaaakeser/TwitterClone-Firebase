import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa6';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import EditModal from '../modal/EditModal';

const DropDown = ({ tweet }) => {
  const isOwn = tweet.user.id === auth.currentUser.uid;
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    const tweetRef = doc(db, 'tweets', tweet.id);

    deleteDoc(tweetRef)
    .then(() => toast.info("Tweet akıştan kaldırıldı."))
    .catch((error) => toast.error("Bir sorun oluştu." + error ));
  };
  return (
    isOwn && (
      <div>
        <label className="popup">
          <input type="checkbox" />
          <div className="burger" tabindex="0">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className="popup-window">
            <legend>Eylemler</legend>
            <ul>
              <li>
                <button onClick={() => setIsOpen(true)}>
                  <MdEdit className="text-blue-500" />
                  <span>Düzenle</span>
                </button>
              </li>
              <hr />
              <li>
                <button onClick={handleDelete}>
                  <FaTrash className="text-red-500" />
                  <span>Sil</span>
                </button>
              </li>
            </ul>
          </nav>
        </label>

        <EditModal isOpen={isOpen} close={() => setIsOpen(false)}/>
      </div>
    )
  );
};

export default DropDown;
