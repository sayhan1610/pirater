from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import random
import json
import string
import re
import os


def load_pirate_dictionary(filename):
    with open(filename, "r") as file:
        return json.load(file)
    
def to_pirate_speak(text, pirate_dictionary, pirate_exclamations):
    sentences = re.split(r'(?<=[.!?])\s+(?=(?:(?:[^"]*"){2})*[^"]*$)', text)
    translated_sentences = []
    
    for sentence in sentences:
        is_speech = sentence.startswith('"') and sentence.endswith('"')
        sentence = sentence.strip('"')
        
        words = sentence.split()
        translated_words = []
        capitalize_next = True

        for word in words:
            stripped_word = word.strip(string.punctuation)
            punctuation = word[len(stripped_word):]

            pirate_translation = pirate_dictionary.get(stripped_word.lower(), stripped_word)
            pirate_word = random.choice(pirate_translation) if isinstance(pirate_translation, list) else pirate_translation
            
            if capitalize_next or word[0].isupper():
                pirate_word = pirate_word.capitalize()
            
            pirate_word += punctuation
            translated_words.append(pirate_word)

            capitalize_next = punctuation in ".!?"

        translated_sentence = " ".join(translated_words)

        if random.random() < 0.45:
            exclamation = random.choice(pirate_exclamations)
            exclamation_punct = random.choice(['!', '!!', '?!', '...', '!!!'])
            translated_sentence += f" {exclamation}{exclamation_punct}"
        
        if is_speech:
            translated_sentence = f'"{translated_sentence}'

        translated_sentences.append(translated_sentence)

    pirate_text = " ".join(translated_sentences)
    if pirate_text[-1] not in ".!?":
        pirate_text += "."

    return pirate_text

pirate_dictionary = load_pirate_dictionary("pirate_dictionary.json")
pirate_exclamations = load_pirate_dictionary("pirate_exclamations.json")

app = FastAPI()

class TranslationRequest(BaseModel):
    text: str
    
class TranslationResponse(BaseModel):
    pirate_translation: str
    
@app.post("/translate/", response_model=TranslationResponse)
def translate_text(request: TranslationRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    pirate_translation = to_pirate_speak(request.text, pirate_dictionary, pirate_exclamations)
    return TranslationResponse(pirate_translation=pirate_translation)


@app.get("/")
def ping():
    return "pong"

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)