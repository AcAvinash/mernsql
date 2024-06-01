'use client'
import Orders from '@/Components/Orders';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Page = () => {

    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        const fetchOrdersAndDetails = async () => {
            const userId = localStorage.getItem('userId');
            try {
                // First API call to get orders based on userId
                const res = await axios.post('http://localhost:4000/order/userID', { userId });
                const ordersData = res.data.data;

                // Array of promises for the second API call to get shipment details for each order
                const detailsPromises = ordersData.map(async (order) => {
                    const detailRes = await axios.post('https://shipway.in/api/getOrderShipmentDetails', {
                        username: "karhtikshetty1@gmail.com",
                        password: "84b0beb51d36f306bd5999249134e792",
                        order_id: order.orderId
                    });

                    // Return a new object that combines the order data and the shipment details
                    return { shipmentDetails: detailRes.data.response };
                });

                // Wait for all promises to resolve
                const details = await Promise.all(detailsPromises);

                // Update the state with the combined data
                setOrderDetails(details);
            } catch (e) {
                console.error(e);
            }
        };

        fetchOrdersAndDetails();
    }, []);


    return (
        <>
            <div>
                {orderDetails.map((orderDetail) => (
                    <Orders key={orderDetail.shipmentDetails.orderId} orderId={orderDetail.shipmentDetails.orderId} tracking_url={orderDetail.shipmentDetails.tracking_url} name={orderDetail.shipmentDetails.customer_name} current_status={orderDetail.shipmentDetails.current_status} />
                ))}
            </div>
        </>
    )
}

export default Page
