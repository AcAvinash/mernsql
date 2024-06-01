'use client'
import React, { useEffect, useState } from 'react';
import shoe from '../../assets/shoe.jpeg';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Navbar from '@/Components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';


interface Item {
    description: string
    id: number;
    title: string;
    count: number;
    userId: string;
    image: string;
    price: number;
    ratings: number;
    tag: string;
    path: string;
    gst: string;
    shipCost: string;
}

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const id = searchParams ? searchParams.get('id') : null;
    const ref = searchParams ? searchParams.get('ref') : null;
    const [data, setData] = useState<Item[]>();
    const [image, setImage] = useState('');
    const [buffer, setBuffer] = useState();

    useEffect(() => {
        const handleCart = async () => {
            const url = process.env.NEXT_PUBLIC_SERVER_URL + "/product/getid";
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: id }),
                });
                const res = await response.json();
                setBuffer(res.data[0].image);
                const base64Image = Buffer.from(res.data[0].image.data as string).toString('base64');
                setImage(base64Image)
                console.log(res);
                setData(res.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        id && handleCart();
    }, [id])

    const [pincode, setPincode] = useState<string>('');
    const [isPincodeValid, setIsPincodeValid] = useState<boolean>(false);

    const handlePincodeCheck = () => {
        // Add logic to check pincode validity (e.g., API call)
        setIsPincodeValid(true); // Set to true for demonstration
    };


    const handleAddToCart = async (event: any, title: string, path: string, price: number) => {
        event.preventDefault();
        const url = process.env.NEXT_PUBLIC_SERVER_URL + "/cart/add";
        const uid = localStorage.getItem('userId');
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id, userId: uid, count: 1, title: title, path: path, price: price, ref: ref ? ref : '' }),
                // body: JSON.stringify({ id: id, userId: uid, count: 1, title: title, price: price, path: path }),
            });
            const res = await response.json();
            if (res.success) {
                alert("Added to Cart successfully")
            } else {
                alert('Failed to add to Cart')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleBuyNow = () => {
        // Add logic to proceed to checkout
        console.log('Proceeding to checkout with product:');
    };

    return (
        <>
            <Navbar />
            {
                data && <div className="py-8 md:mt-24 mt-28">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row -mx-4">
                            <div className="md:flex-1 px-4">
                                <div className="md:h-auto rounded-lg bg-gray-300 dark:bg-black mb-4">
                                    <Image className="w-full rounded-lg shadow-lg" width={500} height={500} src={`data:image/png;base64,${image}`} alt="Product Image" />
                                </div>
                                <div className="flex -mx-2 ">
                                    <div className="w-1/2 px-2">
                                        <button className="w-full dark:bg-[#103178] text-white md:py-2 py-3 px-4 rounded-full font-bold hover:bg-[#103178]" onClick={(e) => handleAddToCart(e, data[0].title, data[0].path, data[0].price)}>Add to Cart</button>
                                    </div>
                                    <div className="w-1/2 px-2">
                                        <button className="w-full bg-gray-200 dark:bg-[#103178] text-gray-800 dark:text-white md:py-2 py-3 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-[#103178]">Add to Wishlist</button>
                                    </div>
                                </div>
                            </div>
                            <div className="md:flex-1 px-4 mt-3">
                                <h2 className="text-2xl font-bold text-black dark:text-black mb-2">{data[0].title}</h2>
                                <p className="text-black dark:text-black text-sm mb-4">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat, inventore.
                                </p>
                                <div className="flex mb-4">
                                    <div className="flex items-center mr-8">
                                        <span className='font-bold text-gray-700 dark:text-black'>Rating :</span>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star}>
                                                {star <= data[0].ratings ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 text-yellow-400"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 0l2.42 6.06L18 7.24l-5.2 4.5 1.55 6.65L10 15.4 5.65 18.4l1.55-6.65L2 7.24 7.58 6.06 10 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 text-gray-400"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 0l2.42 6.06L18 7.24l-5.2 4.5 1.55 6.65L10 15.4 5.65 18.4l1.55-6.65L2 7.24 7.58 6.06 10 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                    <div>
                                        <span className="font-bold text-gray-700 dark:text-black">Availability : </span>
                                        {data[0].tag === "IN" ? <span className="text-green-900">Available</span> : <span className="text-red-900">Unavailable</span>}
                                    </div>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700 dark:text-black">Product Description:</span>
                                    <p className="text-black dark:text-black text-sm mt-2">
                                        {data[0].description}
                                    </p>
                                </div>
                                <div>
                                    <div className="inline-block align-bottom mr-5 mt-12 ">
                                        <span className="text-2xl leading-none align-baseline">₹ </span>
                                        <span className="font-bold text-5xl leading-none align-baseline">{data[0].price}</span>
                                        <span className="text-2xl leading-none align-baseline">.00</span>
                                    </div>
                                    <div className="inline-block align-bottom md:ml-8">
                                        <button className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"><i className="mdi mdi-cart -ml-2"></i> <Link href={{ pathname: '/payment', query: { amount: data[0].price + parseFloat(data[0].gst) + parseFloat(data[0].shipCost), ref: ref ? ref : '' } }}>BUY NOW</Link></button>
                                    </div>
                                </div>
                                <div className="flex items-center mt-16 mb-10 md:mb-0">
                                    <input
                                        type="text"
                                        placeholder="Enter Pincode"
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 mr-2 px-4 py-2"
                                    />
                                    <button
                                        className="bg-[#103178] hover:bg-[#103178]  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={handlePincodeCheck}
                                    >
                                        Check
                                    </button>
                                </div>
                                {isPincodeValid && (
                                    <div className="text-green-600 mb-4">Delivery available to this pincode!</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div >
            }

        </>
    );
};

export default Page;
