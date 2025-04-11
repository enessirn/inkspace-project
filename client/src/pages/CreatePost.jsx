import React from 'react';
import Navbar from '../layout/Navbar'
// import ReactQuill from 'react-quill';
import Editor from '../components/Editor/Editor';
function CreatePost() {

    return (
        <div>
            <Navbar />
            <Editor />
        </div>
    );
};


export default CreatePost