import React from 'react'
// import "../../index.css"
export default function HowItWorks() {
  return (
    <section className="bg-[#712EFF] text-white py-24 flex items-center justify-center">
    <div className="container w-3/4 ">
      <h2 className="text-4xl mb-2 font-gothic">How it works</h2>
      <hr/>
      <div className=" mt-16 grid grid-cols-1 md:grid-cols-3">
        <div>
          <h3 className="text-xl mb-4 font-gothic">1. Upload or paste link</h3>
          <p className="w-2/4">Easily upload any study material or paste a link to your content.</p>
        </div>
        <div>
          <h3 className="text-xl mb-4 font-gothic">2. Generate Quizzes</h3>
          <p className="w-2/4">Easily upload any study material or paste a link to your content.</p>
        </div>
        <div>
          <h3 className="text-xl mb-4 font-gothic">3. Test and Track</h3>
          <p className="w-2/4">Easily upload any study material or paste a link to your content.</p>
        </div>
      </div>
    </div>
  </section>
  )
}
