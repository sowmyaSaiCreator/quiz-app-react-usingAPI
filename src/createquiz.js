import React, { useState } from "react";
import {createQuizData} from "./Api";
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Createquiz() {
    let [title, setTitle] = useState("");
    let [desc, setDesc] = useState("");
    let [timer, setTimer] = useState("");
    const history=useHistory();

    async function createQuizz(e){
        e.preventDefault();
        let questions=[];
        let obj = {title, description:desc, timer, questions };
        await createQuizData(obj);
        toast.dark('Quiz created successfully!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setTimeout(() => {
           history.push('/');
        }, 2000);
        

    }
    return (
        <>
        <div class="container">
            <form onSubmit={(e) => createQuizz(e)}>
                <div class="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" class="form-control col-5"  required value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div class="form-group">
                    <label htmlFor="desc">Description:</label>
                    <input type="text" class="form-control col-5" name="desc"  required value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
                <div class="form-group">
                    <label htmlFor="timer">Timer:</label>
                    <input type="number" class="form-control col-2" required  min="1" max="60" name="timer" value={timer} onChange={(e) => setTimer(e.target.value)} />
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
export default Createquiz;