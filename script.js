document.addEventListener('DOMContentLoaded', () => {
    const texts = [
        "Hi, I'm James! I'm taking WR153 for Fall 2024.",
        "This semester, I want to get better at research and debate writing.",
        "I want to work on syntax mechanics, and improve my text analysis skills.",
        "That is because in the future, I would like to work in machine learning research, and data science.",
        "In the bottom left corner, I attached an example of my high school writing.",
        "See you in class!"
    ];

    const slides = document.querySelectorAll('.slide');
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    const typingSpeed = 75;
    const erasingSpeed = 50;
    const pauseDuration = 1500;
    const typingTextElement = document.querySelector('.typing-text span');
    let isTyping = false;
    let isErasing = false;
    if (slides.length > 0) {
        slides[0].classList.add('first-slide');
    }

    function type() {
        if (isErasing) return;

        if (currentCharIndex < texts[currentTextIndex].length) {
            typingTextElement.textContent += texts[currentTextIndex].charAt(currentCharIndex);
            currentCharIndex++;
            setTimeout(type, typingSpeed);
        } else {
            isTyping = false;
            setTimeout(erase, pauseDuration);
        }
    }

    function erase() {
        if (isTyping) return;

        if (currentCharIndex > 0) {
            typingTextElement.textContent = texts[currentTextIndex].substring(0, currentCharIndex - 1);
            currentCharIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            const currentSlide = slides[currentTextIndex];
            const nextIndex = (currentTextIndex + 1) % slides.length;
            const nextSlide = slides[nextIndex];

            currentSlide.style.opacity = 0;
            nextSlide.style.opacity = 1;

            currentTextIndex = nextIndex;
            isErasing = false;
            isTyping = true;
            setTimeout(type, typingSpeed);
        }
    }

    if (slides.length > 0) {
        slides[0].style.opacity = 1;
    }

    isTyping = true;
    type();

    const soundBtn = document.getElementById('sound-btn');
    const backgroundAudio = document.getElementById('background-audio');
    let isPlaying = false;

    function attemptPlayAudio() {
        backgroundAudio.play().then(() => {
            isPlaying = true;
            soundBtn.innerHTML = '<span id="sound-icon">🔊</span>'; 
        }).catch(error => {
            console.log('Audio play was blocked:', error);
            isPlaying = false;
            soundBtn.innerHTML = '<span id="sound-icon">🔈</span>'; 
        });
    }
    attemptPlayAudio();
    soundBtn.addEventListener('click', () => {
        if (isPlaying) {
            backgroundAudio.pause();
            soundBtn.innerHTML = '<span id="sound-icon">🔈</span>'; 
        } else {
            attemptPlayAudio();
        }
        isPlaying = !isPlaying; 
    });
});
