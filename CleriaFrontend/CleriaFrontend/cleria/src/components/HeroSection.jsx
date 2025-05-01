import React from 'react';
import '@fontsource/inria-sans'; // Ensure this import is present if not already

const HeroSection = () => {
    return (
        <div className="absolute bottom-1/3 left-1/10 font-mono"> {/* Adjust these values to change position */}
            <div className="text-center font-inria">
                <h1 className="text-9xl font-medium text-black mb-1">CLERIA</h1>
                <h6 className="text-xl text-gray-700">Har update clear, Har moment near!</h6>
            </div>
        </div>
    );
}

export default HeroSection;