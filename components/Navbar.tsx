import Link from "next/link";

function Navbar() {
  return <div className=" bg-white flex mx-auto sm:max-w-[100%] lg:max-w-[95%] justify-between overflow-hidden border-b-[5px] border-t-[5px] border-x-[5px] border-indigo-500 rounded-full py-0">

          
              <div className=" flex">
                  <Link href="/">
                      <img src="https://media.istockphoto.com/vectors/owl-logo-vector-black-vector-id1205821116" className="h-[80px] w-[100px] cursor-pointer " alt="" />
                    </Link>

                  <div className=" h-20 border-[1px] border-t-0 border-b-4 xs:px-6  sm:px-8 md:px-10  "><p className=" mt-6">Owl</p></div>
                  <div className=" hidden md:inline-flex ">
                       <div className=" h-20 border-[1px] border-t-0 border-b-4 border-b-indigo-500 sm:px-5 md:px-10 "><p className=" mt-6">About</p></div>
                       <div className=" h-20 border-[1px] border-t-0 border-b-4 border-b-indigo-500 sm:px-5 md:px-10 "><p className=" mt-6">Content</p></div>
                       <div className=" h-20 border-[1px] border-t-0 border-b-4 border-b-indigo-500 sm:px-5 md:px-10 "><p className=" mt-6">Follow</p></div>
                   </div>
              </div>
              <div className=" xs:space-x-3 sm:space-x-3  md:space-x-5 mt-6 flex md:mr-2 lg:mr-2" >
                  <p className=" ml-1">Log In</p>
                  <p className=" ">Get Started</p>
              </div>
              
          
     
       
  </div>;
}

export default Navbar;
