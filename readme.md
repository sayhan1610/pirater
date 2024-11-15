# Pirater: The Pirate Translator

## Introduction

**Pirate translator** is a fun application that transforms standard English text into lively pirate speak! Whether you're looking to spice up your conversations with some nautical flair or just have fin, this app has you covered. You can interact with the app via a user-friend UI or like pros using the API 🦆 🏴‍☠️

---

## Table of Contents

1. [Using the App via the UI](#using-the-app-via-the-ui)
2. [Using the App via the API](#using-the-app-via-the-api)

## Using the App via the UI

The user-friendly UI of Pirate Translator can be access at [https://pirater.onrender.com/](https://pirater.onrender.com/). Follow these steps:

1. Open the link in your browser.
2. Enter the text you want to translate into the provided text box.
3. Click the **Translate** button.

   - The pirate translation will appear in the output box below.
   - Click the output to copy the translation to your clipboard.

4. Enjoy the fun animations and pirate-inspired aesthetics while you translate!

   - Pro Tip: Enable the background audio when prompted for an immersive experience.

![Pirater Screenshot 1](/assets/1.png)
![Pirater Screenshot 2](/assets/2.png)
![Pirater Screenshot 3](/assets/3.png)

---

## Using the App via the API ~~(For pros only)~~

The backend of Pirate Translator is accessible through its API hosted at [https://pirater-api.onrender.com/](https://pirater-api.onrender.com/docs). You can integrate this API into your own applications or scripts for programmatic access.

### API Endpoint

#### **POST** `/translate/`

**Description**: Translates the provided text into pirate speak.
**Request**: JSON
**Response**: JSON

**Request Format**:

```json
{
  "pirate_translation": "Pirate-speak translation of your input text"
}
```

### Example Usage

#### cURL

```bash
curl -X POST https://pirater-api.onrender.com/translate/ \
-H "Content-Type: application/json" \
-d '{"text": "Hello, how are you?"}'
```

**Output**: _Ahoy, how be ye?_

#### Python

```python
import requests
url = "https://pirater-api.onrender.com/translate/"
data = {"text": "Hello, how are you?"}
response = requests.post(irl, json=data)

if response.status_code == 200:
    print(response.json()["pirate_translation"])
else:
    print("Error;", response.status_code, response.text)

```

### API Health Check

You can check if the API is running by accessing the root endpoint (`GET /`)
**Response**: `"pong"`

---

## Tools Used

- **Backend**: FastAPI
- **Frontend**: HTML, CSS, JavaScript
- **Hosting**: [Render](https://render.com)

---

## Getting Started Locally

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/sayhan1610/pirater.git
   cd pirater
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
4. Fix the url in `/web/script.js`
5. Open `web/index.html` in your browser to access the UI.

---

Special thanks to [Hack Club](https://hackclub.com/) & [High Seas](https://highseas.hackclub.com/?ref=U079F8DLN4X) for inspiring me to make the app.

_Enjoy talking like a pirate, ya scallywag! 🦜_
