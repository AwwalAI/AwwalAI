import React from "react";

export default function Features() {
  return (
    <div>
      <section className="py-16">
        <div className="container mx-auto w-3/4 my-16">
          <h2 className="text-2xl md:text-4xl  mb-8 text-center font-gothic">
            Save yourself hours and ace your exam preparation
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6">
              <h3 className="text-xl mb-4 font-gothic">Interactive Learning</h3>
              <p>
                Easily upload any study material or paste a link to your
                content.
              </p>
            </div>
            <div className="bg-gray-100 p-6 ">
              <h3 className="text-xl mb-4 font-gothic">
                Personalized Progress Tracking
              </h3>
              <p>
                Easily upload any study material or paste a link to your
                content.
              </p>
            </div>
            <div className="bg-gray-100 p-6 ">
              <h3 className="text-xl mb-4 font-gothic">
                Personalized Progress Tracking
              </h3>
              <p>
                Easily upload any study material or paste a link to your
                content.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
