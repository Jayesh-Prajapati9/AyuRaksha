from flask import Flask, render_template, request, jsonify
from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate
from langchain_groq import ChatGroq
from langchain.memory import ConversationBufferMemory
import logging
from flask_cors import CORS



# Configure logging for debugging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)
# List of diseases to be used in the expert prompt
DISEASES = [
    "melanoma", "eczema", "atopic dermatitis", 
    "basal cell carcinoma", "melanocytic nevi", 
    "benign caratosis like lesions", "psoriasis", 
    "seborrhoea caratosis and other benign tumours", 
    "tines ring worms candidiasis and other fungal infections", 
    "warts molluscs and other viral infections"
]

# Define the prompt template with explicit instructions and memory
prompt_template = """
You are a knowledgeable skin disease expert. You are provided with a list of diseases: {diseases}.
Engage with the user in a friendly and helpful tone.

Here is the conversation history so far:
{chat_history}

1. If the user greets you (e.g., "hello", "hi"), respond with:
"Hello! I am a skin disease expert. How may I help you today?"

2. If the user asks any question related to skin diseases, provide an informative and clear answer. 
Make sure to remind the user:
"Before trying any home remedies, it is advisable to consult a certified skin doctor for accurate diagnosis and treatment."

3. At the end of skin related questions, include this line:
"Checkout our skin disease detection tool for further assistance."

4. If the user asks something unrelated to skin diseases, respond with:
"Sorry, this is out of my scope as I am a skin disease expert. Please consult the appropriate resource for your query."

5. If you feel the information is insufficient, perform a web search using trusted health resources like healthline.com and provide relevant information. Always mention the source.

User's input: {question}
"""

# Initialize the ChatGroq LLM using your Groq API key
chat_groq = ChatGroq(api_key="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", model="deepseek-r1-distill-llama-70b")

# Initialize memory for maintaining conversation context
memory = ConversationBufferMemory(memory_key="chat_history", input_key="question")

# Create a LangChain LLMChain using ChatGroq with memory
template = PromptTemplate(
    input_variables=["question", "diseases", "chat_history"],
    template=prompt_template
)
chain = LLMChain(llm=chat_groq, prompt=template, verbose=False, memory=memory)

def clean_response(response):
    # Remove <think> tags and any content within them
    import re
    clean_text = re.sub(r'<think>.*?</think>', '', response, flags=re.DOTALL).strip()
    return clean_text

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        question = data.get("question", "").strip()
        
        if not question:
            return jsonify({"error": "No question provided"}), 400

        logging.info("Received question: %s", question)

        # Run the chain with the question, diseases, and chat history
        answer = chain.run(question=question, diseases=", ".join(DISEASES))
        clean_answer = clean_response(answer)

        logging.info("Generated answer: %s", clean_answer)
        logging.info("Updated chat history: %s", memory.load_memory_variables({"question": question}))

        return jsonify({"answer": clean_answer})
    
    except Exception as e:
        logging.exception("Error processing request") 
        return jsonify({"error": "An error occurred while processing your request."}), 500


if __name__ == "__main__":
    app.run(debug=True)
