from dotenv import load_dotenv
import os
from openai import OpenAI
import random
import re

# Load environment variables from .env file
load_dotenv()

# Initialize the OpenAI client
api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=api_key)




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

def generate_mcqs(text, num_mcqs=5):
    sentences = re.split(r'(?<=[.])\s+', text)
    mcqs = []

    for sentence in sentences:
        if len(mcqs) >= num_mcqs:
            break
        if len(sentence.split()) > 10:  # Only use sentences with more than 10 words
            mcq = generate_mcq(sentence)
            mcqs.append(mcq)
    
    return mcqs

# Example usage
text = (
    "Tamil, one of the oldest languages in the world, is a proud emblem of the rich cultural "
    "and linguistic heritage of the Dravidian people. With its roots tracing back over 2,000 years, "
    "Tamil stands as not just a means of communication but as a vital cornerstone of identity for "
    "millions of people, primarily in the Indian state of Tamil Nadu, the union territory of Puducherry, "
    "and in Sri Lanka. The language is also spoken by significant populations in Malaysia, Singapore, "
    "and among the Tamil diaspora worldwide."
)

mcqs = generate_mcqs(text)

# Print the generated MCQs
if mcqs:
    for idx, mcq in enumerate(mcqs, 1):
        print(f"MCQ {idx}:")
        print(mcq)
        print()
else:
    print("No MCQs generated.")