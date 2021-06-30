import './App.css';
import './scss/main.scss';
import {MobileMenu} from "./MobileMenu";
import {Main} from "./Main";

const dateNow = new Date();

function App() {
  return (
  <>
      <header>
        <MobileMenu date={dateNow}></MobileMenu>
      </header>
      <main>
          <Main></Main>
      </main>
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