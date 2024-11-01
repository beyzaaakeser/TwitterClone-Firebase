import React, { useState } from 'react';
import { Modal } from '.';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import uploadToStorage from '../../firebase/uploadStorage';
import { FaRegImages } from 'react-icons/fa';
const EditModal = ({ isOpen, close, tweet, setEditOpen }) => {
  const [isPicDeleting, setIsPicDeleting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target[0].value;
    const file = e.target[1].files?.[0];

    const tweetRef = doc(db, 'tweets', tweet.id);

    let updatedData = { textContent: text, isEdited: true };

    if (isPicDeleting) {
      updatedData.imageContent = null;
    }

    if (file) {
      const imageURL = await uploadToStorage(file);
      updatedData.imageContent = imageURL;
    }

    await updateDoc(tweetRef, updatedData)
      .then(() => {
        toast.success('Tweet güncellendi');
      })
      .catch(() => toast.error('Tweet güncellenirken bir sorun oluştu.'));

    setEditOpen(false);
    setIsPicDeleting(false);
    //modal kapat
    close();
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <h1 className="text-2xl">Tweet'i Düzenle</h1>

      <form onSubmit={handleSubmit} className="flex flex-col mt-10">
        <label htmlFor="">İçeriği Değiştir</label>
        <input defaultValue={tweet.textContent} type="text" className="mt-3" />

        <label className="mt-10 mb-2">Fotoğraf Ekle / Değiştir</label>
        {!isPicDeleting && tweet.imageContent ? (
          <div className="flex flex-col mt-8 mb-2">
            <label className={'mb-2'} htmlFor="">
              Fotograf Ekle / Değiştir
            </label>
            <button
              className="bg-amber-500"
              type="button"
              onClick={() => {
                setIsPicDeleting(true);
              }}
            >
              Resmi kaldır
            </button>
          </div>
        ) : (
          <div className="mt-8">
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
            onClick={() => {
              close;
              setEditOpen(false);
            }}
            className="rounded hover:bg-zinc-700 transition border border-red-500 text-red-500 px-4"
          >
            Vazgeç
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 transition  text-green-600 border border-green-500 px-3">
            Kaydet
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
