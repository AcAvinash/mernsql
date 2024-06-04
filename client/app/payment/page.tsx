// pages/payment-info.js
'use client'
import Image from 'next/image';
import React, { Suspense, useEffect, useState } from 'react';
import qr from '../../assets/qr.jpeg';
import Navbar from '@/Components/Navbar';
import axios from 'axios';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';

declare global {
    interface Window {
        Razorpay: any; // or specify the type if known
    }
}

const PaymentPage: React.FC = () => {
    const searchParams = useSearchParams();
    const amount = searchParams ? searchParams.get('amount') : null;
    const ref = searchParams ? searchParams.get('ref') : null;

    const [offer, setOffer] = useState<Boolean>(false);

    useEffect(() => {
        const handleRef = async () => {
            const url = process.env.NEXT_PUBLIC_SERVER_URL + "/auth/ref";
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ref: ref }),
                });
                const res = await response.json();
                if (res.success) {
                    setOffer(true);
                } else {
                    setOffer(false);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        ref && handleRef();
    }, [ref]);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        pinCode: '',
        paymentMethod: 'qr',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        email: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        const uid = localStorage.getItem('userId');
        if (!uid) {
            alert('Login to make payments');
            return;
        }
    }, []);

    const handleSubmit = async (orderId: any, email: any, amount: number, amountPaid: boolean, userId: string | null, paymentMethod: string, itemCount: number, shippingAddress: string, phone: string, name: string) => {
        const url = process.env.NEXT_PUBLIC_SERVER_URL + "/order/addOrder";
        try {
            await axios.post('/api/addShipway', {
                "orderId": orderId,
                "email": email,
                "amount": amount,
                "name": name,
                "phone": phone,
                "amountPaid": amountPaid,
                "userId": userId,
                "paymentMethod": paymentMethod,
                "itemCount": itemCount,
                "shippingAddress": shippingAddress,
                "carrier_id": "1234"
            });
        } catch (error) {
            console.error('Error after successful payment:', error);
        }
    };

    const handlePaymentMethodChange = (method: any) => {
        setFormData({
            ...formData,
            paymentMethod: method
        });
    };

    const handlePayment = async (e: any) => {
        e.preventDefault();
        if (formData.paymentMethod === 'card') {
            const url = process.env.NEXT_PUBLIC_SERVER_URL + "/paytm/getkey";
            const curl = process.env.NEXT_PUBLIC_SERVER_URL + "/paytm/checkout";
            const rurl = process.env.NEXT_PUBLIC_SERVER_URL + "/paytm/paymentverification";

            const { data: { key } } = await axios.get(url);

            const { data: { order } } = await axios.post(curl, {
                amount: amount
            });

            localStorage.setItem('order', order.id);

            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "Labhkari",
                description: "Your paying this amount to Labhkari",
                image: "https://th.bing.com/th/id/R.d19fc8033978f7ba694994af8d413037?rik=S65%2f9ke1xQqbzw&riu=http%3a%2f%2frndr.juniqe-production.juniqe.com%2fmedia%2fcatalog%2fproduct%2fcache%2fx800%2f265%2f132%2f265-132-101P.jpg&ehk=uEsPKOlz8MlF8gJi44a%2fK5tBQJdSlmHy%2fyMcriONBV0%3d&risl=&pid=ImgRaw&r=0",
                order_id: order.id,
                callback_url: rurl,
                prefill: {
                    name: formData.name,
                    contact: formData.phoneNumber,
                    pin: formData.pinCode
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

            await handleSubmit(order.id, formData.email, order.name, order.phoneNumber, localStorage.getItem('userId'), formData.paymentMethod, 2, formData.address, formData.phoneNumber, formData.name);

            paymentObject.on("payment.failed", function () {
                alert("Payment failed. Please try again. Contact support for help");
            });
        }
    };

    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <Navbar onSearch={() => { }} />
            <div className="container mx-auto px-4 md:mt-20 mt-36 mb-10">
                <h1 className="text-3xl font-bold mb-6">Payment Information</h1>
                <form>
                    <div className="mb-6">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            type="text"
                            placeholder="Enter your address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phoneNumber"
                            type="text"
                            placeholder="Enter your phone number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="pinCode"
                            type="text"
                            placeholder="Enter your pin code"
                            name="pinCode"
                            value={formData.pinCode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <select
                            className="shadow appearance-none border rounded md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-auto"
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={(e) => handlePaymentMethodChange(e.target.value)}
                            required
                        >
                            <option value="card">Credit/Debit Card</option>
                            <option value="qr">QR Code</option>
                        </select>
                        {offer ? <div className='text-black mt-5'>
                            Your now paying an offered amount of  ₹ {amount}
                        </div> : <div className='text-black mt-5'>
                            Your now paying an amount of  ₹ {amount}
                        </div>}
                    </div>
                    {formData.paymentMethod === 'qr' && (
                        <div className="mb-6">
                            <Image src={qr} alt="QR Code" className="max-w-xs mx-auto" width={100} height={100} />
                        </div>
                    )}
                    <div className="flex items-center justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit" onClick={handlePayment}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

const PaymentPageWrapper: React.FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <PaymentPage />
    </Suspense>
);

export default PaymentPageWrapper;
