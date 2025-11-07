document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("bgMusic");
    const toggleMusicBtn = document.getElementById("toggleMusic");
    const openSurpriseBtn = document.getElementById("openSurprise");
    const modal = document.getElementById("surpriseModal");
    const closeBtn = document.querySelector(".close-btn");
    const closeBtn2 = document.getElementById("closeSurprise2");
    const hearts = document.getElementById("heartsContainer");

    // ✅ Auto-start music smoothly (tries to bypass restrictions)
    const startMusic = () => {
        music.volume = 0.5;
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => { /* fail silently */ })
        }
    };
    setTimeout(startMusic, 1000);

    // ✅ Toggle Play / Pause
    toggleMusicBtn.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            toggleMusicBtn.textContent = "Pause Music ❚❚";
        } else {
            music.pause();
            toggleMusicBtn.textContent = "Play Music ♪";
        }
    });

    // ✅ Floating pink heart animation
    function createFloatingHeart() {
        const heart = document.createElement("div");
        heart.className = "floating-heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = 2 + Math.random() * 3 + "s";

        hearts.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    // Trigger heart rain in intervals
    function startHeartRain() {
        const heartInterval = setInterval(createFloatingHeart, 300);

        // Stop after 15 seconds
        setTimeout(() => {
            clearInterval(heartInterval);
        }, 15000);
    }

    // ✅ Opening Surprise Modal
    openSurpriseBtn.addEventListener("click", () => {
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        startHeartRain();
        music.play();
        toggleMusicBtn.textContent = "Pause Music ❚❚";
    });

    // ✅ Close Modal (both buttons)
    function closeModal() {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
    }

    closeBtn.addEventListener("click", closeModal);
    closeBtn2.addEventListener("click", closeModal);
});
