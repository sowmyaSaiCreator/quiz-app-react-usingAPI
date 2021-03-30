import axios from "axios";

export function addQuestion(id, data) {
  return axios.put(`https://605adba427f0050017c0556b.mockapi.io/quiz/quiz/${id}`, data);
}

export function getQuiz() {
  return axios.get(`https://605adba427f0050017c0556b.mockapi.io/quiz/quiz`);
}

export function getCurrentQuiz(id) {
  return axios.get(`https://605adba427f0050017c0556b.mockapi.io/quiz/quiz/${id}`);
}

export function createQuizData(data) {
  return axios.post(`https://605adba427f0050017c0556b.mockapi.io/quiz/quiz`, data);
}


