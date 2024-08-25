import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // Adjust this to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = (username, password) => {
  return api.post("/auth/login/", { username, password });
};

export const logout = () => {
  console.log(sessionStorage.getItem("authToken"));
  return api.post(
    "/auth/logout/",
    {},
    {
      headers: {
        Authorization: `Token ${sessionStorage.getItem("authToken")}`,
      },
    }
  );
};

export const signup = (userData) => {
  return api.post("/auth/signup/", userData);
};

export const checkUsernameAvailability = async (username) => {
  console.log(username);
  return api.get(`/auth/check-username/${username}/`);
};

// Content Upload API
export const uploadContent = (formData) => {
  return api.post("/quiz/content/upload/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${sessionStorage.getItem("authToken")}`,
    },
  });
};

// Quiz List API
export const getQuizzes = () => {
  return api.get("/quiz/", {
    headers: {
      Authorization: `Token ${sessionStorage.getItem("authToken")}`,
    },
  });
};

// Quiz Result API
export const getQuizResult = (quizId) => {
  return api.get(`/quiz/${quizId}/result/`, {
    headers: {
      Authorization: `Token ${sessionStorage.getItem("authToken")}`,
    },
  });
};

// New function to generate quiz
export const generateQuiz = (quizData) => {
  return api.post("/quiz/generate/", quizData, {
    headers: {
      Authorization: `Token ${sessionStorage.getItem("authToken")}`,
    },
  });
};

// Quiz Retrieval API
export const getQuiz = (quizId) => {
  return api.get(`/quiz/${quizId}/`, {
    headers: {
      Authorization: `Token ${sessionStorage.getItem("authToken")}`,
    },
  });
};

export const submitAnswer = (quizId, questionId, userAnswer) => {
  return api.post(
    `/quiz/${quizId}/submit/`,
    {
      question_id: questionId,
      user_answer: userAnswer,
    },
    {
      headers: {
        Authorization: `Token ${sessionStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    }
  );
};

// Additional API calls for content upload, quiz generation, etc.

export default api;
