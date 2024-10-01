import React from 'react';
import Form from '../../components/form';

const Main = ({ user }) => {
  return (
    <main className="border border-zinc-600 overflow-y-auto ">
      <header className="border-b border-zinc-600 p-4 font-bold">
        Anasayfa
      </header>
      <Form user={user} />

      <div className="border-b border-zinc-600 p-5">Tweet</div>
    </main>
  );
};

export default Main;
