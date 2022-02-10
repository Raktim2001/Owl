import React from 'react';

function Main() {
  return <div className='flex justify-between items-center bg-indigo-500 border-y-2 border-y-black py-10 lg:py-4 mt-2 rounded-xl max-w-7xl mx-auto'>
     <div className=' sm:px-5 md:px-7 lg:px-10 space-y-5'>
         <h1 className=' text-6xl max-w-xl'>
             Owl, Your Mordern way to share information
         </h1>
         <h2>
            Share your thoughts ideas and concerns if you have any about any topic
         </h2>
     </div>
     <div>
         <img src="https://media.istockphoto.com/vectors/owl-logo-vector-black-vector-id1205821116" alt="" className=' hidden md:inline-flex h-[150px] w-[150px]  lg:h-[200px] lg:w-[200px]' />
     </div>
  </div>;
}

export default Main;
