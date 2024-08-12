### **Project Documentation: Dynamic Quiz Question Generator**

---

#### **Overview**

The **Dynamic Quiz Question Generator** project is a web application designed to automatically generate quizzes from uploaded or provided text content. The system supports the generation of both objective (multiple-choice) and subjective (short answer) questions. It is built using Django and leverages various AI models, such as Llama and OpenAI's GPT, to create study-related quiz questions.

---

### **Table of Contents**

1. [Directory Structure](#directory-structure)
2. [Project Flow](#project-flow)
3. [API Documentation](#api-documentation)
4. [Model Descriptions](#model-descriptions)
5. [Installation and Setup](#installation-and-setup)
6. [Environment Variables](#environment-variables)
7. [Testing](#testing)
8. [Deployment](#deployment)

---

### **Directory Structure**

The project's directory structure is organized as follows:

```
dynamic_quiz_project/
│
├── manage.py
├── requirements.txt
├── .env
├── dynamic_quiz/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   ├── asgi.py
│   └── static/
│       └── ...
│
├── quiz/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── urls.py
│   ├── views.py
│   ├── serializers.py
│   ├── tests.py
│   ├── permissions.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── aiservice.py
│   │   └── answer_comparison_service.py
|   |   └── file_processing_service.py
|   |   └── webscrapeService.py
│   ├── templates/
│   │   └── ...
│   └── migrations/
│       └── ...
│
├── users/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── urls.py
│   ├── views.py
│   ├── serializers.py
│   ├── tests.py
│   └── migrations/
│       └── ...
│
└── docs/
    ├── api_documentation.md
    ├── architecture_diagram.png
    └── ...

```

---

### **Project Flow**

1. **User Registration and Authentication**: 
   - Users must first register and authenticate to interact with the system.
   - Registration includes basic user details and password.
   - Upon successful registration, users can log in and receive a token for authenticated API requests.

2. **Content Upload**:
   - Users can upload files or provide URLs containing the text content from which quiz questions will be generated.
   - The system processes the uploaded content to generate quizzes.
   - The content can be plain text, documents, or URLs pointing to specific articles.

3. **Quiz Generation**:
   - Once content is uploaded, users can request the generation of quizzes.
   - Users can specify the number of objective and subjective questions required.
   - The AI service processes the content and generates questions based on the specified parameters.

4. **Quiz Interaction**:
   - Users can retrieve and attempt quizzes.
   - They submit answers and receive immediate feedback on the correctness of their responses.
   - The system stores quiz attempts and scores.

5. **Results and Scoring**:
   - After quiz completion, users can view their results, including scores and correct/incorrect answers.

---

### **API Documentation**

**Refer to the [API Documentation](#api-documentation)** section for detailed information on the available endpoints, request/response formats, and status codes.

---

### **Model Descriptions**

1. **Document Model**:
   - **Description**: Represents the uploaded document.
   - **Fields**:
     - `user`: ForeignKey to the User model.
     - `file`: FileField for document upload.
     - `url`: URLField for content via URL.
     - `created_at`: DateTimeField indicating when the document was uploaded.

2. **Quiz Model**:
   - **Description**: Represents a generated quiz.
   - **Fields**:
     - `user`: ForeignKey to the User model.
     - `context`: TextField storing the text content.
     - `created_at`: DateTimeField indicating when the quiz was generated.

3. **Question Model**:
   - **Description**: Represents a question in a quiz.
   - **Fields**:
     - `quiz`: ForeignKey to the Quiz model.
     - `question_text`: TextField storing the question text.
     - `answer_text`: TextField storing the correct answer text.
     - `created_at`: DateTimeField indicating when the question was created.

---

### **Installation and Setup**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/dynamic_quiz_project.git
   cd dynamic_quiz_project
   ```

2. **Create a Virtual Environment**:
   ```bash
   python3 -m venv env
   source env/bin/activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply Migrations**:
   ```bash
   python manage.py migrate
   ```

5. **Run the Development Server**:
   ```bash
   python manage.py runserver
   ```

---

### **Environment Variables**

Create a `.env` file in the root directory with the following variables:

```env
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost, 127.0.0.1
DATABASE_URL=postgres://user:password@localhost:5432/quiz_db
GOOGLE_API_KEY=your_google_api_key
```

---

### **Testing**

- **Run Tests**:
  ```bash
  python manage.py test
  ```
- **Testing Coverage**: Ensure that your tests cover the key functionalities of the system, including user authentication, content upload, quiz generation, and result retrieval.

---

### **Deployment**

1. **Prepare for Deployment**:
   - Set `DEBUG=False` in your `.env` file.
   - Update the `ALLOWED_HOSTS` with your domain name.

2. **Deploy to Azure App Services** (Example):
   - Follow the [Azure Django Deployment Guide](https://docs.microsoft.com/en-us/azure/developer/python/tutorial-python-django-webapp-ubuntu) to deploy your application.
  
3. **Configure Static Files**:
   - Ensure static files are correctly served in your production environment.
   - Use Django's `collectstatic` command to gather static files.

---

### **API Documentation**

Refer to the provided [API Documentation](#api-documentation) section for details on all API endpoints.

---

This documentation outlines the essential components of your project, including its structure, flow, and API details, to facilitate both development and usage.