import React, { useEffect, useState } from "react";
import { getCurrentQuiz, addQuestion } from "./Api";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Question(props) {

    // let optionDefaultArray = [1, 2, 3, 4];
    let id = parseInt(props.match.params.id);
    let [currentQuizData, setCurrentQuizData] = useState([]);
    let [question, setQuestion] = useState("");
    let [option1, setOption1] = useState("");
    let [isCorrect1, setIsCorrect1] = useState(0);
    let [point1, setPoint1] = useState(0);
    let [option2, setOption2] = useState("");
    let [isCorrect2, setIsCorrect2] = useState(0);
    let [point2, setPoint2] = useState(0);
    let [option3, setOption3] = useState("");
    let [isCorrect3, setIsCorrect3] = useState(0);
    let [point3, setPoint3] = useState(0);

    useEffect(async () => {
        let currentQuiz = await getCurrentQuiz(id);
        console.log(currentQuiz.data);
        setCurrentQuizData(currentQuiz.data);

    }, [])

    async function addQuestiontoQuiz(event) {
        event.preventDefault();
        let obj = constructObj();
        await addQuestion(id, obj);
        setQuestion("");
        setOption1("");
        setIsCorrect1("");
        setPoint1(0);
        setOption2("");
        setIsCorrect2("");
        setPoint2(0);
        setOption3("");
        setIsCorrect3("");
        setPoint3(0);
        toast.dark('Question added successfully!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        /*setTimeout(() => {
            props.history.push('/');
        }, 2000);*/

    }
    function setCheck1(e) {
        if (e.target.checked) {
            setIsCorrect1(1);
            setPoint1(5);
        } else {
            setIsCorrect1(0);
            setPoint1(0);
        }

    }
    function setCheck2(e) {
        if (e.target.checked) {
            setIsCorrect2(1);
            setPoint2(5);
        } else {
            setIsCorrect2(0);
            setPoint2(0);
        }
    }
    function setCheck3(e) {
        if (e.target.checked) {
            setIsCorrect3(1);
            setPoint3(5);
        } else {
            setIsCorrect3(0);
            setPoint3(0);
        }
    }
    function constructObj() {
        console.log(currentQuizData);
        let title = currentQuizData.title;
        let description = currentQuizData.description;
        let timer = currentQuizData.timer;
        let questions = currentQuizData.questions;
        let qId = questions.length == 0 ? 1 : questions.length + 1;
        question = question;
        let options = [];
        options.push(
            { option: option1, isCorrect: isCorrect1, point: point1 },
            { option: option2, isCorrect: isCorrect2, point: point2 },
            { option: option3, isCorrect: isCorrect3, point: point3 }
        );
        let correctOption = options.filter((item, index) => {
            return item.isCorrect == true;
        });
        questions.push({ qId, question, options, correctOption });
        let obj = { title, description, timer, questions };
        console.log(obj);
        return obj;
    }
    return (
        <>
            <div class="container">
                <Link to="/">
                    <button class="btn btn-primary float-right">Go Back</button>
                </Link>
                <form onSubmit={(event) => addQuestiontoQuiz(event)}>
                    <div class="form-group">
                        <label htmlFor="question">Question:</label>
                        <input type="text" name="question" required class="form-control col-9" value={question} onChange={(e) => setQuestion(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <label htmlFor="option1">Option 1:</label>
                        <input type="text" class="form-control col-8" name="option1" required value={option1} onChange={(e) => setOption1(e.target.value)} />
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" name="isCorrect1" checked={isCorrect1} onChange={(e) => setCheck1(e)} /> Is correct</label>
                    </div>
                    <div class="form-group">
                        <label htmlFor="point1">Point</label>
                        <input type="number" class="form-control col-2" required name="point1" min="0" max="5" value={point1} onChange={(e) => setPoint1(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <label htmlFor="option2">Option 2:</label>
                        <input type="text" class="form-control col-8" required name="option2" value={option2} onChange={(e) => setOption2(e.target.value)} />
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" name="isCorrect2" checked={isCorrect2} onChange={(e) => setCheck2(e)} /> Is correct</label>
                    </div>
                    <div class="form-group">
                        <label htmlFor="point2">Point</label>
                        <input type="number" class="form-control col-2" required name="point2" min="0" max="5" value={point2} onChange={(e) => setPoint2(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <label htmlFor="option3">Option 3:</label>
                        <input type="text" class="form-control col-8" required name="option3" value={option3} onChange={(e) => setOption3(e.target.value)} />
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" name="isCorrect3" checked={isCorrect3} onChange={(e) => setCheck3(e)} /> Is correct</label>
                    </div>
                    <div class="form-group">
                        <label htmlFor="point3">Point</label>
                        <input type="number" class="form-control col-2" required name="point3" min="0" max="5" value={point3} onChange={(e) => setPoint3(e.target.value)} />
                    </div>
                    <button type="submit" class="btn btn-success text-center" >Submit</button>
                </form>
            </div>
            <ToastContainer position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </>
    );
}
export default Question;