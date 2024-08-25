import React from "react";
import Figma from "../media/icon/Icon.png";
import X from "../media/icon/Icon1.png";
import Insta from "../media/icon/Icon2.png";
import Yt from "../media/icon/Icon3.png";
import LinkedIn from "../media/icon/Icon4.png";
import bg from '../media/bg/Frame 4310.png';

const Footer = () => {
  return (
    <div className="bg-black text-white flex flex-col">
      <header className="py-6 md:px-16">
        <div className="container max-w-7xl mx-auto flex flex-wrap justify-between gap-8 md:gap-16 py-4 border-b-2 border-white">
          <div className="flex flex-col items-center md:items-start">
            <img src={Figma} alt="Figma" className="mb-4" />
            <div className="flex space-x-2">
              <img src={X} alt="X" />
              <img src={Insta} alt="Instagram" />
              <img src={Yt} alt="YouTube" />
              <img src={LinkedIn} alt="LinkedIn" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Use cases</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-gray-400 hover:text-white">UI design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">UX design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Wireframing</a></li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Explore</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-gray-400 hover:text-white">Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Prototyping</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Development features</a></li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Best practices</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Colors</a></li>
            </ul>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto flex flex-col items-center py-12">
        <h1 className="text-4xl md:text-5xl text-center font-gothic mb-6">
          Ace Your Exams with Instant, Interactive Quizzes!
        </h1>
      </main>

      <div className="relative">
        <p className="text-center text-xl md:text-2xl text-gray-400 mb-12">
          Generate flashcards and multiple choice questions in seconds
        </p>
        <img
          src={bg}
          alt="Background"
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Footer;
