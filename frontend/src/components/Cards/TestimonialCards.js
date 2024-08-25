import React from 'react'
import icon from "../../media/icon/Avatar.png"
const TestimonialCard = ({ content, name, description }) => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="mb-4 font-gothic">{content}</p>
      <div className="flex items-center">
        <img src={icon} alt={name} className="w-10 h-10 rounded-full mr-4" />
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TestimonialCard;
