import React, { useState } from 'react';
import { Modal } from '.';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import uploadToStorage from '../../firebase/uploadStorage';
import { FaRegImages } from 'react-icons/fa';
const EditModal = ({ isOpen, close, tweet }) => {
  const [isPicDeleting, setIsPicDeleting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target[0].value;
    const file = e.target[1].files?.[0];

    const tweetRef = doc(db, 'tweets', tweet.id);

    let updatedData = { textContent: text, isEdited: true };

    if (isPicDeleting) {
      updatedData.imageContent = null;
      setIsPicDeleting(false);
    }

    if (file) {
      const imageURL = await uploadToStorage(file);
      updatedData.imageContent = imageURL;
    }

    await updateDoc(tweetRef, updatedData)
      .then(() => {
        toast.success('Tweet güncellendi');
        close();
      })
      .catch(() => toast.error('Tweet güncellenirken bir sorun oluştu.'));
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <h1 className="text-2xl">Tweet'i Düzenle</h1>

      <form onSubmit={handleSubmit} className="flex flex-col mt-10">
        <label htmlFor="">İçeriği Değiştir</label>
        <input defaultValue={tweet.textContent} type="text" className="mt-3" />

        <label className="mt-10 mb-2">Fotoğraf Ekle / Değiştir</label>
        {!isPicDeleting && tweet.imageContent ? (
          <button
            onClick={() => setIsPicDeleting(true)}
            className=" bg-orange-500"
          >
            Resmi Kaldır
          </button>
        ) : (
          <div>
            <label
              htmlFor="file"
              className="flex items-center  gap-2 w-[140px] bg-gray-600 
              cursor-pointer rounded p-1  justify-center hover:bg-gray-700 transition"
            >
              Dosya Seç <FaRegImages className="size-6" />
            </label>

            <input type="file" id="file" hidden="true" />
          </div>
        )}

        <div className="flex justify-end gap-5 mt-8">
          <button
            type="button"
            onClick={close}
            className="bg-gray-500 hover:bg-gray-600 transition"
          >
            Vazgeç
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 transition">
            Kaydet
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
