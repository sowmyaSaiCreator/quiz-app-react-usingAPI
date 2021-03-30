import React, { useEffect, useState, useRef, createRef } from "react";
import { getCurrentQuiz } from "./Api"
function Test(props) {
    let id = parseInt(props.match.params.id);
    let [timer, setTimer] = useState(0);
    const [currentQuiz, setCurrentQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState([]);
    let [currentIndex, setCurrentIndex] = useState(0);
    const [map, setMap] = useState(new Map());
    const [outOf, setOutOf] = useState(0);
    const [percent, setPercent] = useState(0);
    const inputRef = {};
    const border = useRef(null);
    const border1 = useRef(null);
    const [radioIndex, setRadioIndex] = useState(0);


    useEffect(async () => {
        let getCurrentQuizData = await getCurrentQuiz(id);
        console.log(getCurrentQuizData.data);
        setCurrentQuiz(getCurrentQuizData.data);
        setCurrentQuestion(getCurrentQuizData.data.questions[0]);
        setTimer(getCurrentQuizData.data.timer);
        timeOut(parseInt(getCurrentQuizData.data.timer), getCurrentQuizData.data);

    }, []);

    function timeOut(timerP, currentQuizP) {
        let timerVar = setInterval(() => {
            if (timerP > 1) {
                timerP = timerP - 1;
                console.log(timerP);
                setTimer(timerP);
            }
            else {
                stopTimer(currentQuizP);
            }
        }, 1000);

        function stopTimer(currentQuizP) {
            clearInterval(timerVar);
            displayResult('timerOut', currentQuizP)

        }
    }


    function getselectedValue(a, index) {
        setRadioIndex(index);
        let selectedAns = a;
        let correctAnswer = currentQuestion.correctOption[0].option;
        let qId = currentQuestion.qId;
        let mark;
        console.log(inputRef[`input_${index}`].current);
        if (selectedAns === correctAnswer) {
            mark = parseInt(currentQuestion.correctOption[0].point);
            setMap(map.set(qId, mark));
            console.log(map);
        }
        else {
            setMap(map.set(qId, 0));
            console.log(map);
        }
    }

    function nextItem(e, elem) {
        elem.current.checked = false;
        currentIndex += 1;
        console.log(currentIndex);
        setCurrentIndex(currentIndex);
        setCurrentQuestion(currentQuiz.questions[currentIndex]);
    }

    function prevItem() {
        currentIndex -= 1;
        console.log(currentIndex);
        setCurrentIndex(currentIndex);
        setCurrentQuestion(currentQuiz.questions[currentIndex]);
    }

    // function retry(elem) {
    //     elem.current.checked = false;
    //     border.current.style.display = "block";
    //     border1.current.style.display = "none";

    //     setCurrentIndex(0);
    //     setCurrentQuestion(currentQuiz.questions[0]);
    //     setTimer(currentQuiz.timer);
    //     timeOut(currentQuiz.timer);

    // }

    function displayResult(params, currentQuizP) {
        // alert("Please attend atleast one question!!!");
        let markArr = [...map.values()];
        if (markArr.length == 0) {
            if (!params) {
                alert("Please attend atleast one question!!!");
                setCurrentIndex(0);
                setCurrentQuestion(currentQuiz.questions[0]);
            }
            else {
                // document.getElementById("border").style.display = "none";
                border.current.style.display = "none";
                border1.current.style.display = "block";
                //document.getElementById("border1").style.display = "block";
            }
        }
        else {
            // document.getElementById("border").style.display = "none";
            border.current.style.display = "none";
            border1.current.style.display = "block";
            // document.getElementById("border1").style.display = "block";
            let totalQueAns = markArr.filter((item) => {
                return item > 0;
            })
            if (totalQueAns.length > 0)
                setOutOf(totalQueAns.length);
            let scoredMarks = totalQueAns.reduce((acc, item) => {
                return acc + item;
            }, 0)
            let totalMarks = ((currentQuiz.questions && currentQuiz.questions.length || currentQuizP.questions && currentQuizP.questions.length) * 5);//.toFixed(2)
            setPercent(scoredMarks * (100 / totalMarks));
        }
    }
    currentQuestion && currentQuestion.options && currentQuestion.options.map((item, index) => {
        inputRef[`input_${index}`] = createRef();
    });
    return (
        <>
            {
                <div class="container mt-5">
                    <div class="d-flex justify-content-center row">
                        <div class="col-md-10 col-lg-10">
                            <div class="border" ref={border}>
                                <div class="question bg-white p-3 border-bottom">
                                    <div class="d-flex flex-row justify-content-between align-items-center mcq">
                                        <h4>{currentQuiz.title} Quiz</h4> <span> Time out in :<b>{timer}</b> Seconds... &nbsp; ({currentQuestion && currentQuestion.qId} of {currentQuiz.questions && currentQuiz.questions.length})</span>
                                    </div>
                                </div>
                                <div class="question bg-white p-3 border-bottom">
                                    <div class="d-flex flex-row align-items-center question-title">
                                        <h3 class="text-danger">Q{currentQuestion && currentQuestion.qId}.</h3>
                                        <h5 class="mt-1 ml-2">{currentQuestion && currentQuestion.question}</h5>
                                    </div>
                                    <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                                        {currentQuestion && currentQuestion.options && currentQuestion.options.map((item, index) => {
                                            return < label class="options" key={index} >{item.option}
                                                <input type="radio" name={`radio${currentQuestion.qId}`} value={item.option} ref={inputRef[`input_${index}`]} onChange={(e) => getselectedValue(item.option, index)} />
                                                <span class="checkmark"></span>
                                            </label>
                                        })
                                        }
                                    </div>
                                </div>

                                {/* <button class="btn btn-primary d-flex align-items-center btn-danger" type="button" onClick={(e) => prevItem(e, `radio${currentQuestion.qId}`)} >
                                        <i class="fa fa-angle-left mt-1 mr-1"></i>&nbsp;previous</button> */}
                                {!(currentQuiz.questions && currentQuiz.questions.length == currentQuestion.qId) ?
                                    <div class="d-flex flex-row justify-content-between align-items-center p-3 bg-white offset-10">

                                        {/* <div>
                                            {currentIndex > 0 ?
                                                <button class="btn btn-primary d-flex align-items-center btn-danger" type="button" id="previous" onClick={(e) => prevItem(e, `radio${currentQuestion.qId}`)} >
                                                    <i class="fa fa-angle-left mt-1 mr-1"></i>&nbsp;previous
                                     </button>
                                                : <button class="btn btn-primary d-flex align-items-center btn-danger v-none" type="button" id="previous" onClick={(e) => prevItem(e, `radio${currentQuestion.qId}`)} >
                                                    <i class="fa fa-angle-left mt-1 mr-1"></i>&nbsp;previous
                                     </button>
                                            }</div> */}

                                        <button class="btn btn-primary border-success d-flex align-items-center btn-success" type="button" onClick={(e) => nextItem(e, inputRef[`input_${radioIndex}`])}>Next
                                                 <i class="fa fa-angle-right ml-2"></i>
                                        </button>
                                    </div>
                                    :
                                    <div class="d-flex flex-row align-items-center p-3 bg-white offset-10 ">
                                        <button class="btn btn-danger" type="submit" onClick={(e) => displayResult()}>Submit
                                        <i class="fa fa-angle-right ml-2"></i>
                                        </button>
                                    </div>
                                }
                            </div>

                            <div class="border" ref={border1} style={{ display: "none" }}>
                                <div class="question bg-white p-3 border-bottom">
                                    <div class="d-flex flex-row justify-content-between align-items-center mcq">
                                        <h4>{currentQuiz.title} Quiz</h4>
                                    </div>
                                </div>
                                <div class="question bg-white p-3 border-bottom">
                                    <div class="align-items-center offset-5">
                                        <h2>Result:</h2>
                                        <p>{outOf} of {currentQuiz.questions && currentQuiz.questions.length}</p>
                                        <p><b>Percentage is: {percent}</b></p>
                                    </div>

                                </div>
                                <div class="d-flex flex-row justify-content-between align-items-center p-3 bg-white offset-10">
                                    {/* <button class="btn btn-info" type="button" onClick={(e) => retry(inputRef[`input_${radioIndex}`])}>Retry
                                        <i class="fa fa-angle-right ml-2"></i>
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default Test;