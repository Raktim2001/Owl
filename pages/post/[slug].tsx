import { GetStaticProps } from "next";
import { env } from "process";
import PortableText from "react-portable-text";
import Navbar from "../../components/Navbar";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import {useForm, SubmitHandler} from "react-hook-form"
import { useState } from "react";

interface Props{
  post:Post,

}
interface IFormInput{
  _id:string;
  name:string;
  email:string;
  comment:string;
}
function post({post}:Props) {
  const {register,handleSubmit,formState:{errors},}=useForm<IFormInput>();
  const [submitted,setSubmitted]=useState(false);
  const onSubmit:SubmitHandler<IFormInput>=  (data)=>{
    
     fetch("/api/createComment",{
      method:"POST",
      body:JSON.stringify(data),
  })
  .then(()=>{
    console.log(data);
    setSubmitted(true);
  })
  .catch((err)=>{
    console.log("Error1",err);
    setSubmitted(false);
  });
  
  };
  const defa="No Content Provided for this post";
  return <div className="bg-black h-screen overflow-x-hidden scrollbar-hide">
      <title>Owl</title>
      <Navbar/>
      <img className=" w-full h-40 object-cover object-center px-10 rounded-full py-1" src={urlFor(post.mainImage).url()!} alt="" />
      <div className="max-w-6xl mx-auto">
      
      <article className="text-white max-w-3xl mx-auto p-5">
        <h1 className=" text-3xl mt-10 mb-3">{post.title}</h1>
        <h1 className="text-xl font-light text-gray-400 mb-2">{post.description}</h1>
        <div className="flex items-center space-x-2">
          <img className="h-10 w-10 rounded-full" src={urlFor(post.author.image).url()!} alt="" />
          <p className=" font-extralight text-sm">Blog posted by {post.author.name} at {new Date(post._createdAt).toLocaleString()}</p>
        </div>
        <div className=" mt-10">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={
              {
                h1:(props:any)=>(
                  <h1 className=" text-2xl font-bold my-5" {...props}/>

                ),
                h2:(props:any)=>(
                  <h1 className=" text-2xl font-bold my-5" {...props}/>

                ),
                li:({children}:any)=>(
                  <li className=" ml-4 list-disc">{children}</li>
                ),
                link: ({href,children}:any)=>{
                  <a href={href} className=" text-blue-500 hover:underline">{children}</a>
                },
              }
            }

          />
        </div>
      </article>
        
       <hr className=" max-w-lg my-5 mx-auto border border-indigo-500" />
       {submitted?(
         <div className=" flex flex-col p-10 my-10 bg-indigo-500 text-white max-w-2xl mx-auto">
           <h1 className=" text-2xl font-bold">Comment submitted successfully</h1>
           <p>Your comment will be shown once the author approves it</p>
         </div>
       ):(
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 max-w-2xl mx-auto mb-10" action="">
         <h1 className="text-sm text-indigo-500 ">Enjoyed this article?</h1>
         <h1 className="text-3xl font-bold text-white">Leave a Comment</h1>
         <hr className="py-2 mt-2" />
          <input {...register("_id")} type="hidden" name="_id" value={post._id} />
          
          
         <label className=" block mb-5" htmlFor="">
           <span className=" text-gray-400">Name</span>
           <input {...register("name",{required:true})} className=" shadow border rounded py-2 px-2 form-input mt-1 block w-full ring-indigo-500 outline-none focus:ring" type="text" />
         </label>
          <label className=" block mb-5" htmlFor="">
           <span className=" text-gray-400">Email</span>
           <input  {...register("email",{required:true})} className=" shadow border rounded py-2 px-2 form-input mt-1 block w-full ring-indigo-500 outline-none focus:ring" type="email" />
         </label>
          <label className=" block mb-5" htmlFor="">
           <span className=" text-gray-400">Comment</span>
           <textarea  {...register("comment",{required:true})} className="shadow border rounded py-2 px-2 form-textarea mt-1 block w-full ring-indigo-500 outline-none focus:ring" placeholder="Hey, Great content!" id=""  rows={0}></textarea>
         </label>
         <div>
           {errors.name && (<span className=" text-red-500 block">Please enter your Name</span>)}
           {errors.email && (<span className=" text-red-500 block">Please enter your Email</span>)}
           {errors.comment && (<span className=" text-red-500 block">Please enter your Comment</span>)}

         </div>
         <input className=" shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white fotn-bold py-2 px-4 rounded cursor-pointer" type="submit" name="" id="" />
       </form>
       )}
      
       <div className=" flex flex-col space-y-2 p-10 my-10 max-w-2xl mx-auto shadow shadow-indigo-500">
         <h3 className=" text-4xl text-white">Comments:</h3>
         <hr className=" pb-2" />
         {post.comments.map((comment)=>(
           <div>
             <p className=" text-white">
               <span className="text-indigo-500">{comment.name}-</span>
               {comment.comment}
             </p>
           </div>
         ))}
       </div>

      </div>
      
  </div>;
}

export default post;

export const getStaticPaths=async()=>{
  const query=`*[_type == 'post']{
  id,
  slug {
         current
      },
  }`
  const posts=await sanityClient.fetch(query);
  const paths=posts.map((post:Post)=>({
    params:{
      slug:post.slug.current,
    }
  }));
  return{
    paths,
    fallback:'blocking',
  };
};
export const getStaticProps:GetStaticProps=async({params})=>{

  const query=`*[_type == 'post' && slug.current==$slug][0]{
  _id,
  title,
  _createdAt,
  author->{
  name,
  image,
},
 'comments':
  *[_type=='comment' && post._ref==^._id && approved==true],
 
description,
mainImage,
slug,
body

}`
  const post=await sanityClient.fetch(query,{
    slug:params?.slug,
  })
  if(!post)
  {
    return{
      notFound: true,
    }
  }
  return{
    props:{
      post,
    },
    revalidate: 60,
  }


}
