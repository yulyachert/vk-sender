import './App.css';
import React, {useState} from "react";
import {Header} from "./Components/Header";
import {MainPage} from "./Components/MainPage";
import Cookies from 'js-cookie'

function App() {
    const [isVisible, setIsVisible] = useState(Cookies.get("userId"))


    return (
        <div className="App">
            <Header
                isVisible={isVisible}
                setIsVisible={setIsVisible}
            />
            <MainPage
                isVisible={isVisible}
                setIsVisible={setIsVisible}
            />
        </div>
    );
}

export default App;
