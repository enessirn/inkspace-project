import { Input } from 'antd';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'antd';
import { SendOutlined, EyeOutlined } from '@ant-design/icons';

export default function Editor() {
  const editorRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      placeholder: 'Write something amazing...',
      modules: {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }],
          [{ 'list': 'ordered' }],
          ['bold', 'italic', 'underline'],
          ['link'],
          [{ 'align': [] }],
        ],
      },
    });

    // Set the initial content of the editor and listen for changes
    quill.on('text-change', () => {
      const currentContent = quill.root.innerHTML;
      setContent(currentContent);
    });

    // Cleanup Quill instance on component unmount
    return () => {
      quill.off('text-change');
    };
  }, []);

  // Submit the post to the server
  const handleSubmit = async () => {
    setLoading(true);
    setIsModalOpen(false);
    try {
      if (!title || !content) {
        toast.error("Please fill all fields");
        return;
      }
      const response = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/posts/create-post`, {
        title, content
      });
      if (response.status === 200) {
        toast.success("Post created successfully");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error creating post, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] md:container mx-auto mt-5 h-full">
      <h1 className='mb-4 border-b border-gray-300 text-2xl font-bold select-none'>Title</h1>
      <Input disabled={loading} placeholder="Write title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <h1 className='my-4 border-b border-gray-300 text-2xl font-bold select-none'>Create Post</h1>
      <div style={{ minHeight: "400px" }} ref={editorRef}></div>
      <div className="flex justify-center items-center gap-4">
        <button onClick={showModal} className='bg-primary font-bold cursor-pointer hover:bg-secondary transition-colors text-white px-4 py-2 rounded mt-4' disabled={loading}>
          <EyeOutlined /> Preview
        </button>
        <button onClick={handleSubmit} className='bg-blue-500 font-bold cursor-pointer hover:bg-blue-600 transition-colors text-white px-4 py-2 rounded mt-4' disabled={loading}>
          <SendOutlined /> Create Post
        </button>
      </div>
      <Modal title="Output" open={isModalOpen} onOk={handleCancel} onCancel={handleCancel}>
        <h1 className='text-2xl font-bold'>{title}</h1>
        {/* Content added in the modal */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Modal>
      <ToastContainer />
    </div>
  );
}
