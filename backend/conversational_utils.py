# conversational_utils.py
import os
import json
import requests
from dotenv import load_dotenv 
load_dotenv()
API_KEY = os.getenv('gemini_api')
HISTORY_FILE = 'conversation_history.txt'

def load_conversation_history():
    try:
        with open(HISTORY_FILE, 'r') as file:
            return file.read().splitlines()
    except FileNotFoundError:
        return []

def save_conversation_history(history):
    with open(HISTORY_FILE, 'w') as file:
        file.write("\n".join(history))

def build_final_prompt(user_input):
    initial_context = (
        "You are MoneyMentor, a concise and helpful AI assistant specialized in finance. "
        "You answer financial questions clearly and based on past trends or general knowledge, but not real-time data. "
        "When asked about a company or sector, you should describe it in terms of:"
        "\n- Business model"
        "\n- Recent performance factors"
        "\n- Key industry trends"
        "The output should always be in bullet points and informative, never include example prompts or meta explanations."
        "Remember, this is for informational purposes only, not investment advice.\n"
        "If you don't have data, give a helpful fallback instead of saying you can't.\n"
        )

    conversation_history = load_conversation_history()
    conversation_history.append(f"User: {user_input}")

    prompt = initial_context + "\n".join(conversation_history) + "\nAssistant:"
    
    save_conversation_history(conversation_history)
    return prompt

def get_gemini_response(prompt):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"
    headers = {"Content-Type": "application/json"}
    data = {"contents": [{"parts": [{"text": prompt}]}]}
    response = requests.post(url, headers=headers, data=json.dumps(data))
    response_text = response.json()["candidates"][0]["content"]["parts"][0]["text"]
    conversation_history = load_conversation_history()
    conversation_history.append(f"Assistant: {response_text}")
    save_conversation_history(conversation_history)
    return response_text
