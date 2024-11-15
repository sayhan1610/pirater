document.getElementById('translator-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const phraseInput = document.getElementById('phrase').value;
  const translationOutput = document.getElementById('translation-output');
  const idleImg = document.getElementById("idle-img");
  const talkingImg = document.getElementById("talking-img");
  const thinkingImg = document.getElementById("thinking-img");

  idleImg.style.display = "none";
  talkingImg.style.display = "none";
  thinkingImg.style.display = "block";
  translationOutput.textContent = "Translation of text...";

  try {
      const response = await fetch("https://pirater-api.onrender.com/translate", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ text: phraseInput })
      });

      if (response.ok) {
          const data = await response.json();
          const delay = Math.floor(Math.random() * 1000) + 1000;
          setTimeout(() => {
              translationOutput.textContent = data.pirate_translation;
              thinkingImg.style.display = "none";
              talkingImg.style.display = "block";
          }, delay);
      } else {
          translationOutput.textContent = "Error: Could not retrieve translation. Try again!";
      }
  } catch (error) {
      translationOutput.textContent = "Error: Unable to connect to the translation service.";
  }
});

window.addEventListener("load", () => {
  const idleImg = document.getElementById("idle-img");
  const talkingImg = document.getElementById("talking-img");
  idleImg.style.display = "block";
  talkingImg.style.display = "none";
});

  const container = document.querySelector(".container");

function createAnimatedImage(imgSrc) {
  const img = document.createElement("img");
  img.src = `static/${imgSrc}`;
  img.classList.add("dino-or-party");
  img.style.left = `${Math.random() * 100}vw`; 
  container.appendChild(img);

  setTimeout(() => container.removeChild(img), 10000);
}

setInterval(() => {
  const images = ["dino_debugging.svg", "party-orpheus.svg"];
  const randomImg = images[Math.floor(Math.random() * images.length)];
  createAnimatedImage(randomImg);
}, 30000); 

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("audio-popup");
  const audio = document.getElementById("background-audio");
  const playAudioBtn = document.getElementById("play-audio-btn");
  const dismissPopupBtn = document.getElementById("dismiss-popup-btn");

  // Show the popup on page load
  popup.style.display = "flex";

  // Play audio if user agrees
  playAudioBtn.addEventListener("click", () => {
    audio.play().catch((err) => console.error("Error playing audio:", err));
    popup.style.display = "none";
  });

  // Dismiss the popup if user declines
  dismissPopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
});
