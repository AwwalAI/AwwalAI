import google.generativeai as genai
import os

# Fetch the API key from environment variables
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("API key not found in environment variables")

# Configure the API key and model
genai.configure(api_key=api_key)

def generate_quiz(context, objective=True, subjective=True, num_objective=5, num_subjective=5):
    # Create the model
    generation_config = {
        "temperature": 0.9,
        "top_p": 0.95,
        "top_k": 32,
        "max_output_tokens": 1024,
        "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
    )

    # Prepare the prompt based on the parameters
    prompt = '''
        Read the following text carefully:

        Context: '''+context+'''

        Task: Generate up to '''+str(num_objective)+ '''objective and'''+str(num_subjective)+'''subjective high-quality question and answer pairs based on the given context. Follow these guidelines:

            1. Question:
            - Make it relevant to the context
            - Ensure it's specific and thought-provoking
            - Use clear and concise language
            - For Objective questions, provide multiple choice options (A, B, C, D)

            2. Answer:
            - Provide a comprehensive and accurate response
            - Include key details from the context
            - Keep the answer focused and to-the-point
            - For Objective questions, indicate the correct option

        Format:
            {
                "objective": [
                    {{"question": "Your generated question", "options": ["Option1","Option2","Option3","Option4"], "answer":"Correct Answer","explanation":""}},
                ],
                "subjective": [
                    {{"question": "Your generated question", "answer": "Your generated answer"}},
                ]
            }

            Now, generate {num_objective} objective and {num_subjective} subjective question and answer pairs:

    '''
    
    if objective and subjective:
        prompt += "Generate a mix of objective and subjective questions."
    elif objective:
        prompt += "Generate only objective questions."
    elif subjective:
        prompt += "Generate only subjective questions."

    # Generate the content
    response = model.generate_content(prompt)
    return(response.text)