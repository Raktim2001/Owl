import Head from 'next/head'
import Link from 'next/link'
import Main from '../components/Main'
import Navbar from '../components/Navbar'
import {sanityClient,urlFor} from '../sanity'
import { Post } from '../typings'

interface Props{
  posts:[Post];
}
export default function Home({posts}:Props) {

  return (
    <div className=" bg-black h-screen overflow-x-hidden scrollbar-hide">
      <Head>
        <title>Owl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=' sticky top-0'>
      <Navbar/>
      </div>
      <div className=' mb-4'>
      <Main/>
      </div>
      <div className=' text-white grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-3 p-4 md:gap-6 md:p-6 max-w-6xl mx-auto'>
        {posts.map((post)=>{
          return(<div className='   '>
            <Link key={post._id} href={`/post/${post.slug.current}`} >
              <div className='group border-x rounded-md cursor-pointer border-indigo-500 overflow-hidden mb-2'>
                <img src={urlFor(post.mainImage).url()!} className='h-60 w-full  rounded-sm object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out mb-2' alt="" />
                <div className='flex justify-between'>
                  <div>
                    <p className='bg-indigo-500 max-w-fit rounded-lg text-black text-lg font-bold'>{post.title}</p>
                    <p className='text-sm'>{post.description} by {post.author.name}</p>
                   
                  </div>
                  <div>
                     <img className='h-12 w-12 rounded-full' src={urlFor(post.author.image).url()!} alt="" />
                  </div>
                </div>
              </div>
            </Link>
            
          </div>

          )
        })}
      </div>
      
    </div>
  )
}

export const getServerSideProps=async()=>{
  const query=`*[_type == 'post']{
  _id,
  title,
  author->{
  name,
  image,
},
description,
mainImage,
slug,

}`
 const posts= await sanityClient.fetch(query);
 return{
   props:{
     posts,
   },
 };
}
