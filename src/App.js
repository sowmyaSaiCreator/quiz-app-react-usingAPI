import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import QuizCard from './quizcard';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Question from './question';
import Createquiz from './createquiz';
import Test from './test';

function App() {
  return (
    <Router>
      <div class="container ">
        <h3 class="text-center">MicroARC -Test your skill</h3>
       
          <Switch>
            <Route path="/createQuiz" exact={true}>
             <Createquiz></Createquiz>
            </Route>
            <Route path="/" exact={true}>
              <QuizCard></QuizCard>
            </Route>
            <Route path="/addQuestion/:id" exact={true} component={Question}/>
            <Route path="/test/:id" exact={true} component={Test} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
