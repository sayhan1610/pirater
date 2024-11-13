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
  