import React from 'react';

const Form = () => {
  return (
    <>
      <form className="flex flex-col">
        <label>Email</label>
        <input
          type="text"
          className=""
        />
        <label className="mt-4">Şifre</label>
        <input
          type="text"
          className=""
        />

        <button className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300">
          Giriş Yap
        </button>
      </form>

      <p className="mt-5">
        <span className="text-gray-500">Hesabınız Yoksa</span>
        <span className="cursor-pointer ms-2 text-blue-500">Kaydolun</span>
      </p>
    </>
  );
};

export default Form;
