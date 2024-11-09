import random
import json
import string
import re

def load_pirate_dictionary(filename):
    with open(filename, "r") as file:
        return json.load(file)

def to_pirate_speak(text, pirate_dictionary, pirate_exclamations):
    sentences = [sentence.strip() for sentence in re.split(r'(?<=[.!?])\s+', text) if sentence]
    
    translated_sentences = []
    for sentence in sentences:
        words = sentence.split()
        translated_words = []
        capitalize_next = True

        for word in words:
            stripped_word = word.strip(string.punctuation)
            punctuation = word[len(stripped_word):]

            pirate_translation = pirate_dictionary.get(stripped_word.lower(), stripped_word)
            
            if isinstance(pirate_translation, list):
                pirate_word = random.choice(pirate_translation)
            else:
                pirate_word = pirate_translation
            
            if capitalize_next or word[0].isupper():
                pirate_word = pirate_word.capitalize()
            
            pirate_word += punctuation
            translated_words.append(pirate_word)

            capitalize_next = punctuation in ".!?"

        translated_sentence = " ".join(translated_words)
        
        if random.random() < 0.45:
            translated_sentence += " " + random.choice(pirate_exclamations)
        
        translated_sentences.append(translated_sentence)

    pirate_text = " ".join(translated_sentences)
    if pirate_text[-1] not in ".!?":
        pirate_text += "."

    return pirate_text

pirate_dictionary = load_pirate_dictionary("pirate_dictionary.json")
pirate_exclamations = load_pirate_dictionary("pirate_exclamations.json")

user_input = input("Enter the text you want to translate to Pirate Speak: ")
pirate_translation = to_pirate_speak(user_input, pirate_dictionary, pirate_exclamations)
print("\nPirate Translation:\n" + pirate_translation)

