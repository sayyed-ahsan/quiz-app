/* eslint-disable jsx-a11y/alt-text */
import "./App.css";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#edffdd] p-2 text-center">
      <img
        className="w-[50px]"
        src="https://i.ibb.co/kxtWZwg/Screenshot-2024-03-22-at-5-14-50-PM.png"
      ></img>

      <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-black">
        Teach me to count
      </h1>
      <p className="mt-4 w-[310px] text-[20px] sm:text-3xl text-black">
        Get 3 chances to guess the right answers. Learn counting now!
      </p>
      <div className="mt-10 w-full items-center max-w-[450px] gap-3 flex flex-col-reverse sm:flex-row">
        <button className="h-10 border-[1px] border-black py-2 px-8 text-sm text-black rounded-[20px] whitespace-nowrap w-[150px]">
          How to play
        </button>
        <button className="h-10 border-[1px] border-black py-2 px-8 text-sm text-black rounded-[20px] whitespace-nowrap w-[150px]">
          Log in
        </button>
        <button className="h-10 border-[1px] border-black py-2 px-8 text-sm text-white rounded-[20px] whitespace-nowrap w-[150px] bg-black">
          Play
        </button>
      </div>
      <p className="mt-10 text-sm text-black">
        {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}

export default App;
