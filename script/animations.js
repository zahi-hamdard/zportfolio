
document.addEventListener("DOMContentLoaded", () => {
    // Home section
    const section1 = document.getElementById("home");
    const nav = document.querySelector("nav");
    const helloElem = document.querySelector(".hero-hello");
    const zahidElem = document.querySelector(".hero-zahid");
    const portfolioInfo = document.querySelector(".porfolio_info");
    const aboutInfo = document.querySelector(".about_info");
    const secFooter = document.querySelector(".next_sec_inst");

    // about section
    const aboutTitle = document.querySelector(".about_title");
    const funText = document.querySelector(".fun_text");
    const infoData = document.querySelector(".about_info_data");
    const aboutImg = document.querySelector(".about_visual");


    // Initial loading animations
    if (nav) animateElement(nav, -300, 0, 2, "translateY");
    if (helloElem) animateElement(helloElem, 1000, 0, 3, "translateY");
    if (zahidElem) animateElement(zahidElem, 1000, 0, 2, "translateY");
    if (portfolioInfo) animateElement(portfolioInfo, 1000, 0, 2, "translateY");
    if (aboutInfo) animateElement(aboutInfo, 1000, 0, 2, "translateY");
    if (secFooter) animateElement(secFooter, 1000, 0, 2, "translateY");

});

// **Reusable function for smooth animations with easing**
function animateElement(element, start, end, duration, transformType) {
    let startTime = null;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        const easedProgress = easeOutExpo(progress); // Applying easing function
        const currentValue = start + (end - start) * easedProgress;

        element.style.transform = `${transformType}(${currentValue}px)`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

// **Easing function for smooth transition**
function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
