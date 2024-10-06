import React, { useEffect, useState } from 'react';
import Form from '../../components/form';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import Loader from '../../components/loader';
import Post from '../../components/post';

const Main = ({ user }) => {
  const [tweets, setTweets] = useState();
  useEffect(() => {
    const ref = collection(db, 'tweets');

    const q = query(ref, orderBy('createdAt', 'desc'));

    const unSub = onSnapshot(q, (snapshot) => {
      let temp = [];
      snapshot.docs.forEach((doc) => temp.push({ ...doc.data(), id: doc.id }));

      setTweets(temp);
    });

    return () => {
      unSub();
    };
  }, []);

  return (
    <main className="border border-zinc-600 overflow-y-auto main">
      <header className="border-b border-zinc-600 p-4 font-bold">
        Anasayfa
      </header>
      <Form user={user} />

      {!tweets ? (
        <div className="my-20 scale-150">
          <Loader />
        </div>
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </main>
  );
};

export default Main;
