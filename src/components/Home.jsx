import React, { useState } from "react";
import micro from "../images/icon_micro.png";
import "./Home.css";
export default function Home() {
  let SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;

  let recognition = new SpeechRecognition();

  const [info, setinfo] = useState({
    word: "",
    active: false,
    lang: "US",
  });
  recognition.lang = `${info.lang}`;
  recognition.continuous = false;
  // recognition.interimResults = false;
  // recognition.maxAlternatives = 1;

  const recordStart = () => {
    recognition.start();
    setinfo({ ...info, active: true });
    console.log("start");
  };

  recognition.onresult = (event) => {
    //handle result in here
    let word = " " + event.results[0][0].transcript;
    setinfo({ ...info, word: info.word + word, active: false });
    // recognition.onend = () => {
    //   console.log("end");
    //   setinfo({ ...info,  });
    // };
  };

  return (
    <div className="max-w-[1200px] flex justify-center mx-auto">
      <div className="max-w-[600px]">
        <h1 className="text-center mt-5 font-[600] text-[35px] text-white">
          Voice To Text
        </h1>
        <div className=" border p-4 mt-5 rounded">
          <div className="flex justify-center items-center md:justify-between ">
            <span className="text-[25px] text-white"> To speak &gt; </span>
            <img
              onClick={() => recordStart()}
              className="w-[80px] cursor-pointer transition-all hover:scale-110 active:scale-95"
              src={micro}
              alt="micro"
            />
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
            Select an option
          </label>
          <select
            onChange={(e) => {
              console.log(e);
              setinfo({ ...info, lang: e.target.value });
            }}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue value="US">
              English
            </option>
            <option value="UZ">Uzbek</option>
            <option value="RU">Russian</option>
          </select>
          <div
            id="bars"
            className={`h-[70px] transition-all opacity-0 my-4 ${
              info.active ? "active" : null
            } `}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>

        <div className="">
          <p className=" h- text-center  text-white mt-9 info text-[20px]">
            {info.word}
          </p>
          <center>
            <button
              className="tex-center px-3 py-1 bg-slate-400 rounded mt-2"
              onClick={() => setinfo({ ...info, word: "" })}
            >
              Clear
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}
