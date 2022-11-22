import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Board from "./components/Board";
import Register from "./components/Register";
import Login from "./components/Login";
import RequestSheet from "./components/RequestSheet";
import Requests from "./components/Requests";
import EmpLogin from "./components/EmpLogin";
import EmpRegister from "./components/EmpRegister";
import Timer from "./components/Timer";

function getToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);

  return userToken;
}

function App() {
  const [token, setToken] = useState(() => getToken());

  return (
    <Router>
      <Routes>
        <Route path="/request" element={<RequestSheet />} /> {/*user makes request*/}
        <Route path="/timer" element={<Timer />} /> 
        <Route path="/requests" element={<Requests token={token}/>} /> {/*emplyee can see requests*/}
        <Route path="/emplogin" element={<EmpLogin setToken={setToken}/>} /> {/*emplyee login*/}
        <Route path="/empregister" element={<EmpRegister setToken={setToken}/>} /> {/*emplyee register*/}
        <Route path="/board" element={<Board token={token} />} /> {/*edit request sheet*/}
        <Route path="/register" element={<Register setToken={setToken} />} /> {/*admin register*/}
        <Route path="/login" element={<Login setToken={setToken} />} /> {/*admin login*/}
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
