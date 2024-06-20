import './App.css';
import './scss/main.scss';
import {Header} from "./Header";
import {Main} from "./Main";
import {MonthSummary} from "./MonthSummary";

const dateNow = new Date();

function App() {
  return (
  <>
        <Header date={dateNow}></Header>
          <Main date={dateNow}></Main>
      <MonthSummary date={dateNow}></MonthSummary>
  </>
  );
}

export default App;


// <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
// >
//   Learn React
// </a>