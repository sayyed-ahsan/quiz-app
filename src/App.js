import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import HomePage from './components/app/home/home';
import Play from './components/app/play/play';
import Auth from './components/app/auth/auth';

function App() {
  return (
    <>
      <div className="video-bg">
        <video className='video' width='100%' autoPlay loop muted>
          <source src="https://dl.dropbox.com/s/rb309y58xwjtv6h/fire-mountain-range.mp4?dl=0" type="video/mp4" />
        </video>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/play" element={<Play />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

{/* <div className="video-bg">
<video className='video' width='100%' autoPlay loop muted>
  <source src="https://dl.dropbox.com/s/rb309y58xwjtv6h/fire-mountain-range.mp4?dl=0" type="video/mp4" />
  Your browser does not support the video tag.
</video>
</div> */}

{/* <div className="video-bg">
<video className='video' width='100%' autoPlay loop muted>
  <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
</div> */}