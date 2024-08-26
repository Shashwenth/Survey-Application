from flask import Flask, request, jsonify
from dotenv import load_dotenv
from openai import OpenAI
import random
import re
import os

# Load environment variables from .env file
load_dotenv()

# Initialize the OpenAI client
api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=api_key)



app = Flask(__name__)

def generate_mcq(text):
    prompt = f"""
    Based on the following text, create a multiple-choice question with 4 options (A, B, C, D).
    Ensure that only one option is correct, and the other three are plausible but incorrect.
    Format the output as follows:
    Question: [Your question here]
    A. [Option A]
    B. [Option B]
    C. [Option C]
    D. [Option D]
    Correct Answer: [A/B/C/D]

    Text: {text}
    """

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant skilled in creating educational content."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=250,
        temperature=0.7
    )

    return response.choices[0].message.content.strip()

@app.route('/generate_mcqs', methods=['POST'])
def generate_mcqs():
    data = request.get_json()
    text = data.get('text', '')
    num_mcqs = data.get('num_mcqs', 5)
    
    sentences = re.split(r'(?<=[.])\s+', text)
    mcqs = []

    for sentence in sentences:
        if len(mcqs) >= num_mcqs:
            break
        if len(sentence.split()) > 10:  
            mcq = generate_mcq(sentence)
            mcqs.append(mcq)
    
    return jsonify({'mcqs': mcqs})

@app.route('/get_text', methods=['GET'])
def get_text():
    text = (
        "Tamil, one of the oldest languages in the world, is a proud emblem of the rich cultural "
        "and linguistic heritage of the Dravidian people. With its roots tracing back over 2,000 years, "
        "Tamil stands as not just a means of communication but as a vital cornerstone of identity for "
        "millions of people, primarily in the Indian state of Tamil Nadu, the union territory of Puducherry, "
        "and in Sri Lanka. The language is also spoken by significant populations in Malaysia, Singapore, "
        "and among the Tamil diaspora worldwide."
    )
    return jsonify({'text': text})

if __name__ == '__main__':
    app.run(debug=True)
