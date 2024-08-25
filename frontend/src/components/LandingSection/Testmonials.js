import React from 'react'
import TestimonialCard from "../Cards/TestimonialCards";
const Testimonials = () => {
    const testimonials = [
      {
        content: "Using Avval, I managed to cut my study time in half and improve my grades significantly!",
        name: "Aman, University Student",
        description: "Description"
      },
      {
        content: "Using Avval, I managed to cut my study time in half and improve my grades significantly! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus dolores assumenda incidunt.",
        name: "Aman, University Student",
        description: "Description"
      },
      {
        content: "Using Avval, I managed to cut my study time in half and improve my grades significantly!",
        name: "Aman, University Student",
        description: "Description"
      },
      {
        content: "Using Avval, I managed to cut my study time in half and improve my grades significantly! Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        name: "Aman, University Student",
        description: "Description"
      },
      {
        content: "Using Avval, I managed to cut my study time in half and improve my grades significantly!",
        name: "Aman, University Student",
        description: "Description"
      },
      {
        content: "Using Avval, I managed to cut my study time in half and improve my grades significantly!",
        name: "Aman, University Student",
        description: "Description"
      }  

      // Add more testimonials here
    ];
    return (
        <section className="bg-[#D3D4FF] py-16 flex justify-center items-center">
          <div className="my-8 container w-2/3">
            <div className="flex justify-center">
            <h2 className="text-2xl md:text-4xl w-2/3 leading-relaxed font-bold mb-8 text-center font-gothic">Save yourself hours and ace your exam preparation</h2>
            </div>
            <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>
      );
    };
    
    export default Testimonials;  
