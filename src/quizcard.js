import React from "react";
import { Link } from "react-router-dom";
import QuizCardBody from "./quizCardBody";
function QuizCard() {
    return (
        <>
            <div class="row">
                <Link to="/createQuiz">
                    <button class="btn btn-primary float-right">Create Quiz</button>
                </Link>
            </div>
            <div class="row">
                <QuizCardBody></QuizCardBody>
            </div>
        </>
    );
}
export default QuizCard;