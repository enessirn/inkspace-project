import React from 'react';
import Navbar from '../layout/Navbar'
// import ReactQuill from 'react-quill';
import Editor from '../components/Editor/Editor';
function CreatePost() {

    return (
        <div className='w-full min-screen bg-background dark:bg-d-bg text-primary dark:text-d-primary'>
            <Navbar />
            <Editor />
        </div>
    );
};


export default CreatePost