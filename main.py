import random
import json

def load_pirate_dictionary(filename):
    with open(filename, "r") as file:
        return json.load(file)
    
def to_pirate_speak(text, pirate_dictionary, pirate_excclamations):
    words = text.split()
    translated_words = [
        pirate_dictionary.get(word.lower(), word) for word in words
    ]
    
    pirate_text = " ".join(translated_words)
    
    if random.random() < 0.45:
        pirate_text += " " + random.choice(pirate_excclamations)
        
    return pirate_text
pirate_dictionary = load_pirate_dictionary("pirate_dictionary.json")
pirate_exclamations = load_pirate_dictionary("pirate_exclamations.json")
user_input = input("Enter the text you want to translate to Pirate Speak: ")
pirate_translation = to_pirate_speak(user_input, pirate_dictionary, pirate_exclamations)
print("\nPirate Translation:\n" + pirate_translation)
# test