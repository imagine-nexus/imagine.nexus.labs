// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Smooth Scroll Reveal (Intersection Observer)
    // Automatically fades and slides up cards when they enter the screen
    const revealElements = document.querySelectorAll(".glass-card, .projects-section h2");
    
    const revealOptions = {
        threshold: 0.1, // Triggers when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Slightly offsets the trigger for better timing
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class that handles the smooth transition
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0) scale(1)";
                observer.unobserve(entry.target); // Stop watching once animated
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        // Set initial state before the observer kicks in
        element.style.opacity = "0";
        element.style.transform = "translateY(30px) scale(0.98)";
        element.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
        
        revealOnScroll.observe(element);
    });


    // 2. Interactive Glass Parallax
    // Makes the ambient background blobs subtly react to mouse movement
    const blobs = document.querySelectorAll(".blob");
    
    window.addEventListener("mousemove", (e) => {
        // Get mouse position relative to window size (-0.5 to 0.5)
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;

        blobs.forEach((blob, index) => {
            // Give different blobs slightly different speeds for depth
            const intensity = (index + 1) * 30; 
            const moveX = x * intensity;
            const moveY = y * intensity;
            
            // Apply the smooth translation overlaying the CSS animation
            blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
            blob.style.transition = "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)";
        });
    });
});
