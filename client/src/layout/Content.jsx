import React, { useState, useEffect } from 'react'
import PostCard from '../components/PostCard'
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import Loading from '../components/Loading'
axios.defaults.withCredentials = true;
function Content() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/posts`);
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching posts, please try again later", error.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
      });
          setLoading(true);
      }
    };
  
    getData();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      console.log("Posts:", posts)
    }
  }, [posts])

  return (
    <div className='w-full md:container md:mx-auto h-full bg-background mt-8'>
      <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
    <h1 className='block w-1/2 text-center border-b-2 border-gray-300'>Discovery</h1>
        {loading ? <Loading /> : posts?.reverse().map((post) => (
          <PostCard key={post._id} post={post} />
        ))
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default Content
