import { Input } from 'antd';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import React, { useRef, useEffect, useState } from 'react'

function Editor() {
    const editorRef = useRef(null);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const contentHTML = useRef(null);
    useEffect(() => {
        // Quill editorünü başlatıyoruz
        const quill = new Quill(editorRef.current, {
            theme: 'snow',

            placeholder: 'Write something amazing...',
            modules: {
                toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    ['link'],
                    [{ 'align': [] }],
                ],
            },
        });


        // Editördeki değişiklikleri takip etmek için
        quill.on('text-change', () => {
            setContent(quill.root.innerHTML);
            console.log(quill.root);
            contentHTML.current.innerHTML = quill.root.innerHTML;

        });
    }, [contentHTML]);

    return (
        <div className="container mx-auto mt-5 h-full">
            <h1 className='mb-4 border-b border-gray-300 text-2xl font-bold select-none'>Title</h1>
            <Input placeholder="Write title" />
            <h1 className='my-4 border-b border-gray-300 text-2xl font-bold select-none '>Create Post</h1>
            <div style={{ minHeight: "400px" }} ref={editorRef}></div>
            <div className="output">
                <h2 className='my-4 border-b border-gray-300 text-2xl font-bold select-none'>Output</h2>
                <div className="output-content">
                    <h1 className='text-2xl font-bold'>{title}</h1>
                    <div ref={contentHTML} id='content'></div>
                </div>
            </div>
        </div>
    );
}

export default Editor