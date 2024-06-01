/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from 'react';
import Dropzone, { DropzoneOptions } from 'react-dropzone';
import fs from 'fs';


const page: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [ratings, setRatings] = useState('');
    const [tags, setTags] = useState('');
    const [gst, setGst] = useState('');
    const [shipCost, setShipCost] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const dropzoneOptions: DropzoneOptions = { accept: 'image/*' as unknown as DropzoneOptions['accept'] };



    useEffect(() => {
        const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';

        if (!isAdmin) {
            window.location.href = '/'; // Redirect to home page
            return; // Prevent rendering the rest of the component
        }
    })


    const handleImageDrop = (acceptedFiles: File[]) => {
        setImage(acceptedFiles[0]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = process.env.NEXT_PUBLIC_SERVER_URL + "/product/add";

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, image, description, price, ratings, tag: tags, gst: gst, shipCost: shipCost })
            });

            console.log(response)

            if (response.ok) {
                console.log('Product added successfully!');
                alert('Product added successfully')
            } else {
                console.error('Failed to add product:', response.statusText);
                alert('Failed to add product:')
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Add Product</h1>
            <form onSubmit={handleSubmit} className="max-w-lg" encType='multipart/form-data'>
                <div className="mb-4">
                    <label className="block mb-1">Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 rounded-md p-2"></textarea>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Price:</label>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Ratings:</label>
                    <input type="text" value={ratings} onChange={(e) => setRatings(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Tags:</label>
                    <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Gst:</label>
                    <input type="text" value={gst} onChange={(e) => setGst(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">ShippingCost:</label>
                    <input type="text" value={shipCost} onChange={(e) => setShipCost(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                </div>
                <Dropzone onDrop={handleImageDrop} {...dropzoneOptions}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="border border-gray-300 rounded-md p-2 mb-4 cursor-pointer">
                            <input {...getInputProps()} />
                            {image ? (
                                <p>Image selected: {image.name}</p>
                            ) : (
                                <p>Drag n drop an image here, or click to select an image</p>
                            )}
                        </div>
                    )}
                </Dropzone>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
            </form>
        </div>
    );
};

export default page;
