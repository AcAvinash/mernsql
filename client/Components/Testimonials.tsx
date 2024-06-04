'use client'
import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import shoe from '../assets/shoe.jpg';

const testimonials = [
    {
        name: "Karthik",
        role: "Direct Selling Partner",
        quote: "Labhkari helped me realize my true potential for success",
        imageSrc: shoe
    },
    {
        name: "Samarjit Chowdhury & Minati Panda",
        role: "Direct Selling Partner",
        quote: "It has given us the opportunity to create healthy living",
        imageSrc: shoe
    }
];

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h2 className="text-center text-3xl font-semibold mb-8">What People Have To Say About Us</h2>
            <Slider {...settings}>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-center p-4 border rounded-lg shadow-md">
                        <div className="flex-shrink-0 w-32 h-32 relative mb-4 md:mb-0 md:mr-4">
                            <Image
                                src={testimonial.imageSrc}
                                alt={testimonial.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                        <div className="flex flex-col justify-center text-center md:text-left">
                            <blockquote className="mb-4">
                                <p className="text-lg italic">&quot;{testimonial.quote}&quot;</p>
                            </blockquote>
                            <footer className="text-sm font-semibold">
                                {testimonial.name}<br />
                                <span className="text-gray-600">{testimonial.role}</span>
                            </footer>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Testimonials;
