document.getElementById('translator-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const phraseInput = document.getElementById('phrase').value;
    const translationOutput = document.getElementById('translation-output');
  
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
        translationOutput.textContent = data.pirate_translation;
      } else {
        translationOutput.textContent = "Error: Could not retrieve translation. Try again!";
      }
    } catch (error) {
      translationOutput.textContent = "Error: Unable to connect to the translation service.";
    }
  });
  
  const translationOutput = document.getElementById("translation-output");
  const idleImg = document.getElementById("idle-img");
  const talkingImg = document.getElementById("talking-img");
  
  document.getElementById("translator-form").addEventListener("submit", (e) => {
    e.preventDefault();
    idleImg.style.display = "none";
    talkingImg.style.display = "block"; 
    translationOutput.innerText = "Translation of text..."; 
  });
  
  window.addEventListener("load", () => {
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
}, 300000); 
