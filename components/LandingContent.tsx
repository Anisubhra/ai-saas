"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const TESTIMONIALS = [
    {
        "name": "John Doe",
        "avatar": "https://example.com/avatar/john_doe.jpg",
        "title": "Software Engineer",
        "description": "Experienced software engineer with a passion for developing innovative solutions."
    },
    {
        "name": "Jane Smith",
        "avatar": "https://example.com/avatar/jane_smith.jpg",
        "title": "Graphic Designer",
        "description": "Creative graphic designer specializing in visual communication and branding."
    },
    {
        "name": "Alex Johnson",
        "avatar": "https://example.com/avatar/alex_johnson.jpg",
        "title": "Marketing Specialist",
        "description": "Results-driven marketing specialist with expertise in digital marketing and campaign management."
    },
    {
        "name": "Emily Davis",
        "avatar": "https://example.com/avatar/emily_davis.jpg",
        "title": "Data Scientist",
        "description": "Data scientist with a background in machine learning and statistical analysis."
    }
]

const LandingContent = () => {
    return (
        <div className='px-10 pb-20'>
            <h2 className='text-center text-4xl text-white font-extrabold mb-10'>
                Testimonials
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {
                    TESTIMONIALS.map((item) => (
                        <Card key={item.name} className='bg-[#192339] border-none text-white'>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-x-2'>
                                    <div>
                                        <p className='text-lg'>
                                            {item.name}
                                        </p>
                                        <p className='text-zinc-400 text-sm'>
                                            {item.title}
                                        </p>
                                    </div>
                                </CardTitle>
                                <CardContent className='pt-4 px-0'>
                                    {item.description}
                                </CardContent>
                            </CardHeader>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default LandingContent