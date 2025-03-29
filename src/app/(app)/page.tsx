'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import messages from "@/messages.json"
import Autoplay from 'embla-carousel-autoplay'

const Home = () => {
    const autoplay = Autoplay({ delay: 2000 });
    return (
        <>
            <main className='flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12'>
                <section>
                    <h1>
                        Welcome to my Mystery messages!
                    </h1>
                    <p></p>
                </section>
                <Carousel
                    className="w-full max-w-xs"
                    plugins={[autoplay]}>
                    <CarouselContent>
                        {
                            messages.map((message, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <Card>
                                            <CardHeader>
                                                {message.title}
                                            </CardHeader>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <span className="text-2xl font-semibold">{message.content}</span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </main>
            <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
                © 2025 True Feedback. All rights reserved.
            </footer>
        </>
    )
}

export default Home