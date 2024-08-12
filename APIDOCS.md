To help you build comprehensive documentation for your Postman collection, I'll provide a structure covering request and response headers, example request bodies, possible responses, and expected status codes for each API endpoint in your collection.

### 1. **User Auth API**

- **Endpoint**: `POST {{base_url}}/api/auth/login/`
- **Description**: Authenticates a user with a username and password.

**Request**:
- **Headers**:
  - `Content-Type: application/json`
- **Body** (JSON):
```json
{
  "username": "newuser02",
  "password": "securepassword"
}
```

**Response**:
- **Status Code**: 
  - `200 OK`: Authentication successful.
  - `401 Unauthorized`: Authentication failed (wrong credentials).
- **Response Body** (Example):
```json
{
  "token": "your-auth-token"
}
```
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer your-auth-token`

---

### 2. **User Signup API**

- **Endpoint**: `POST {{base_url}}/api/auth/signup/`
- **Description**: Registers a new user.

**Request**:
- **Headers**:
  - `Content-Type: application/json`
- **Body** (JSON):
```json
{
  "username": "newuser02",
  "password": "securepassword",
  "confirm_password": "securepassword",
  "first_name": "new",
  "last_name": "user"
}
```

**Response**:
- **Status Code**:
  - `200 OK`: User created successfully.
  - `201 Created`: User created successfully.
  - `400 Bad Request`: Validation failed.
- **Response Body** (Example):
```json
{
  "username": "newuser02",
  "message": "User created successfully."
}
```
- **Headers**:
  - `Content-Type: application/json`

---

### 3. **Content Upload API**

- **Endpoint**: `POST {{base_url}}/api/quiz/content/upload/`
- **Description**: Uploads a file or provides a URL to generate quiz content.

**Request**:
- **Headers**:
  - `Content-Type: multipart/form-data`
  - `Authorization: Bearer your-auth-token`
- **Body** (Multipart Form Data):
  - `file`: (file upload, optional)
  - `url`: `https://www.techtarget.com/searchcustomerexperience/definition/B2C`
  - `objective`: `true`
  - `subjective`: `true`
  - `num_objective`: `2`
  - `num_subjective`: `3`

**Response**:
- **Status Code**:
  - `200 OK`: Content uploaded successfully.
  - `201 Created`: Content uploaded and created successfully.
  - `400 Bad Request`: Validation failed.
  - `401 Unauthorized`: Missing or invalid token.
- **Response Body** (Example):
```json
{
  "content_id": 3,
  "message": "Content uploaded successfully."
}
```
- **Headers**:
  - `Content-Type: application/json`

---

### 4. **Quiz Generation API**

- **Endpoint**: `POST {{base_url}}/api/quiz/generate/`
- **Description**: Generates a quiz based on uploaded content.

**Request**:
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer your-auth-token`
- **Body** (JSON):
```json
{
  "content_id": 3,
  "objective": true,
  "subjective": true,
  "num_objective": 2,
  "num_subjective": 2
}
```

**Response**:
- **Status Code**:
  - `200 OK`: Quiz generated successfully.
  - `201 Created`: Quiz created successfully.
  - `400 Bad Request`: Validation failed.
  - `401 Unauthorized`: Missing or invalid token.
- **Response Body** (Example):
```json
{
  "quiz_id": 5,
  "message": "Quiz generated successfully."
}
```
- **Headers**:
  - `Content-Type: application/json`

---

### 5. **Quiz Retrieval API**

- **Endpoint**: `GET {{base_url}}/api/quiz/3`
- **Description**: Retrieves a specific quiz by ID.

**Request**:
- **Headers**:
  - `Authorization: Bearer your-auth-token`
- **Body**: (Empty)

**Response**:
- **Status Code**:
  - `200 OK`: Quiz retrieved successfully.
  - `404 Not Found`: Quiz not found.
  - `401 Unauthorized`: Missing or invalid token.
- **Response Body** (Example):
```json
{
  "quiz_id": 3,
  "questions": [
    {
      "question_id": 1,
      "question_text": "What is B2C?",
      "answer_text": "Business to Consumer"
    },
    {
      "question_id": 2,
      "question_text": "How has e-commerce affected B2C?"
    }
  ]
}
```
- **Headers**:
  - `Content-Type: application/json`

---

### 6. **Answer Submission API**

- **Endpoint**: `POST {{base_url}}/api/quiz/3/submit/`
- **Description**: Submits an answer for a specific question in a quiz.

**Request**:
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer your-auth-token`
- **Body** (JSON):
```json
{
  "question_id": 12,
  "user_answer": "The rise of e-commerce has significantly altered B2C interactions..."
}
```

**Response**:
- **Status Code**:
  - `200 OK`: Answer submitted successfully.
  - `201 Created`: Answer recorded successfully.
  - `400 Bad Request`: Validation failed.
  - `401 Unauthorized`: Missing or invalid token.
- **Response Body** (Example):
```json
{
  "result": "correct",
  "score": 10,
  "message": "Answer submitted successfully."
}
```
- **Headers**:
  - `Content-Type: application/json`

---

### 7. **Quiz Result API**

- **Endpoint**: `GET {{base_url}}/api/quiz/3/result/`
- **Description**: Retrieves the results of a completed quiz.

**Request**:
- **Headers**:
  - `Authorization: Bearer your-auth-token`
- **Body**: (Empty)

**Response**:
- **Status Code**:
  - `200 OK`: Results retrieved successfully.
  - `404 Not Found`: Quiz not found.
  - `401 Unauthorized`: Missing or invalid token.
- **Response Body** (Example):
```json
{
  "quiz_id": 3,
  "total_score": 40,
  "correct_answers": 4,
  "incorrect_answers": 1,
  "message": "Quiz results retrieved successfully."
}
```
- **Headers**:
  - `Content-Type: application/json`

---

This structure should serve as a comprehensive guide for all the endpoints in your collection, detailing the expected inputs, outputs, and status codes.