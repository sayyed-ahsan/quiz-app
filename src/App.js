import React from 'react';
import HomePage from './components/app/home/home';

function App() {
  return (
    <>
      <div className="video-bg">
        <video width="320" height="240" autoPlay loop muted>
          <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <HomePage />
    </>
  );
}

export default App;






{/* <div class="bg-cover bg-center bg-[url('https://cdn-media-2.freecodecamp.org/w1280/5f9c9cfc740569d1a4ca3543.jpg')]">
<div className="flex min-h-screen flex-col items-center justify-center p-2 text-center">
  <img
    className="w-[50px]"
    src="https://i.ibb.co/kxtWZwg/Screenshot-2024-03-22-at-5-14-50-PM.png"
  ></img>

  <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
    Teach me to count
  </h1>
  <p className="mt-4 w-[310px] text-[20px] sm:text-xl text-white">
    Get 3 chances to guess the right answers. Learn counting now!
  </p>
  <div className="mt-10 w-full items-center max-w-[450px] gap-3 flex flex-col-reverse sm:flex-row">
    <button className="h-10 border-[1px] border-white py-2 px-8 text-sm text-white rounded-[20px] whitespace-nowrap w-[150px]">
      How to play
    </button>
    <button className="h-10 border-[1px] border-white py-2 px-8 text-sm text-white rounded-[20px] whitespace-nowrap w-[150px]">
      Log in
    </button>
    <button className="h-10 border-[1px] border-white py-2 px-8 text-sm text-white rounded-[20px] whitespace-nowrap w-[150px] bg-black">
      Play
    </button>
  </div>
  <p className="mt-10 text-sm text-white">
    {new Date().toLocaleDateString()}
  </p>
</div>
</div> */}