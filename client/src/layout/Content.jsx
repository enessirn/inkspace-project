import React,{useState, useEffect} from 'react'
import PostCard from '../components/PostCard'
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
axios.defaults.withCredentials = true;
function Content() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    try {
      const getAllPosts = async () => {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/posts`)
        setPosts(res.data)
      }
      getAllPosts()
    } catch (error) {
      toast.error("Error fetching posts", error.message)
    }
    finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (posts.length > 0) {
      console.log("Posts:", posts)
    }
  }, [posts])

  return (
    <div className='w-full md:container md:mx-auto h-full bg-background mt-8'> 
      <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4"> 
        {loading ? "loading" : ""}
        {
          posts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default Content
