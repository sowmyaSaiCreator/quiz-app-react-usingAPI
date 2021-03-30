import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getQuiz } from "./Api";
function QuizCardBody() {
    const [quizData, setQuizData] = useState([]);

    useEffect(async () => {
        let quiz = await getQuiz();
        setQuizData(...quizData, quiz.data);
    }, []);

    return (
        <>{
            quizData.map((item, index) => {
                return <div class="card col-4 cardStyle" key={index}>
                    <div class="card-body cardBody">
                        <h4 class="card-title">{item.title}</h4>
                        <p class="card-text">{item.description}</p>
                        <Link to={`/addQuestion/${item.id}`}>
                            <button class="btn btn-primary float-left">Add Question</button></Link>
                        {item.questions.length > 0 ? <Link to={`/test/${item.id}`}>
                            <button class="btn btn-success float-right">Begin Test</button>
                        </Link> : <div></div>}

                    </div>
                </div>
            })
        }
        </>
    );
}
export default QuizCardBody;