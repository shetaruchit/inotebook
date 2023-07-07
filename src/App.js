import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';


import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';


function App() {
  return (
    <>
      <NoteState>

        <Router>
          <Navbar title='iNotebook' />
          <Alert message="Hello.."/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup /> } />
          </Routes>
          </div>
        </Router>
      </NoteState>

    </>
  );
}

export default App;
