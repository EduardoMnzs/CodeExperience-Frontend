import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../assets/style/home/ImageCarousel.css';

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        if (distance > 50) {
            goToNext();
        }
        if (distance < -50) {
            goToPrevious();
        }

        setTouchStart(null);
        setTouchEnd(null);
    };

    return (
        <div className="carousel-container">
            <div
                className="carousel"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <button onClick={goToPrevious} className="carousel-button left">
                    <FaChevronLeft />
                </button>

                <div className="carousel-track">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${image})` }}
                            aria-hidden={index !== currentIndex}
                        >
                            <div className="slide-content">
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={goToNext} className="carousel-button right">
                    <FaChevronRight />
                </button>
            </div>

            <div className="carousel-indicators">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToImage(index)}
                        aria-label={`Ir para imagem ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;