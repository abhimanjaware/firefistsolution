import React, { useEffect, useState } from 'react'

function Loader() {
    const [isVisible, setIsVisible] = useState(true)
    
    useEffect(() => {
        // Hide scrollbar during loader animation
        document.body.style.overflow = 'hidden'
        // Animation to split the entire loader after 2 seconds
        const timer = setTimeout(() => {
            const leftHalf = document.querySelector('.left-half')
            const rightHalf = document.querySelector('.right-half')
            
            if (leftHalf && rightHalf) {
                // Animate left half to the left
                leftHalf.style.transition = 'transform 1s ease-in-out'
                leftHalf.style.transform = 'translateX(-100%)'
                
                // Animate right half to the right
                rightHalf.style.transition = 'transform 1s ease-in-out'
                rightHalf.style.transform = 'translateX(100%)'
                
                // Hide the loader after animation completes
                setTimeout(() => {
                    setIsVisible(false)
                    // Restore scrollbar after loader is hidden
                    document.body.style.overflow = 'auto'
                }, 1000) // Wait for the 1s animation to complete
            }
        }, 2000)
        
        return () => {
            clearTimeout(timer)
            // Cleanup: restore scrollbar if component unmounts
            document.body.style.overflow = 'auto'
        }
    }, [])

    // Don't render anything if loader is not visible
    if (!isVisible) return null

    return (
        <div>
            {/* Demo next screen content - replace with your actual next component
            <div className="next-screen h-screen w-full bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center">
                <h1 className="text-white text-6xl font-bold">Next Screen</h1>
            </div>
             */}
            {/* Loader overlay */}
            <div className="loader-interface h-screen w-screen overflow-hidden flex fixed top-0 left-0 z-[60]">
                {/* Left half of the loader */}
                <div className="left-half w-1/2 h-full relative flex justify-center items-center bg-black">
                    <div className="absolute inset-0 bg-black"></div>
                    <div className="absolute inset-0" style={{
                        mask: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 200\'><text x=\'100%\' y=\'50%\' text-anchor=\'end\' dominant-baseline=\'central\' font-family=\'Arial, sans-serif\' font-weight=\'900\' font-size=\'50\' fill=\'white\'>FIREFIST </text></svg>")',
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center'
                    }}>
                        <video autoPlay loop muted className='h-full w-full object-cover' src="https://cdn.pixabay.com/video/2024/05/24/213511_tiny.mp4"></video>
                    </div>
                </div>
                
                {/* Right half of the loader */}
                <div className="right-half w-1/2 h-full relative flex justify-center pl-2 items-center bg-black">
                    <div className="absolute inset-0 bg-black"></div>
                    <div className="absolute inset-0" style={{
                        mask: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 200\'><text x=\'0%\' y=\'50%\' text-anchor=\'start\' dominant-baseline=\'central\' font-family=\'Arial, sans-serif\' font-weight=\'900\' font-size=\'50\' fill=\'white\'>SOLUTIONS</text></svg>")',
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center'
                    }}>
                        <video autoPlay loop muted className='h-full w-full object-cover' src="https://cdn.pixabay.com/video/2025/03/12/264272_large.mp4"></video>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader