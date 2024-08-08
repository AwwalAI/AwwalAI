import requests
from bs4 import BeautifulSoup

def get_text_from_url(url):
    try:
        # Send an HTTP GET request to the URL
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors

        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')

        # Extract text from all paragraphs, headings, and list items
        text_elements = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'])
        text = ' '.join([element.get_text(strip=True) for element in text_elements])

        return text
    except requests.RequestException as e:
        print(f"Error fetching the URL: {e}")
        return None