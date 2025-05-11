import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import Loading from '../components/Loading'
import PostCardFull from '../components/PostCardFull';
axios.defaults.withCredentials = true;
function Content() {
  const [me, setMe] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true);


  // get all posts and me 
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const storedLogin = localStorage.getItem("isLogin");
      if (!storedLogin) {
        alert("Please, sign in");
        window.location.href = "/login";
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/posts`);
        setPosts(res?.data);
        const resultMe = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/auth/me`);
        setMe(resultMe.data.user);
        setLoading(false);
      } catch (error) {
        toast.error("Error, please try again later", error.message, {
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
  return (
    <div className='w-full md:container md:mx-auto h-full bg-background mt-8 dark:bg-d-bg'>
      <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
        <h1 className='block w-1/2 text-center border-b-2 border-gray-300 text-primary dark:text-d-primary'>Discovery</h1>
        {loading ? <Loading /> : posts.length !== 0 ? posts?.reverse().map((post) => (
          <PostCardFull key={post._id} post={post} me={me} isProfile={false} loading={loading} />

        )) : (
          <div className='w-full flex flex-col justify-center items-center gap-4 mt-4'>
            <h1 className='text-muted text-2xl text-primary dark:text-d-primary'>No posts found</h1>
            <p className='text-muted text-md text-secondary dark:text-d-secondary'>Be the first to post something!</p>
          </div>
        )}

      </div>
      <ToastContainer />
    </div>
  )
}

export default Content
