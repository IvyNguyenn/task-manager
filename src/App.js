import React, { Component } from "react";
import Task from "./views/Tasks/Tasks";
import Footer from "./components/Footer/Footer";

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Task />
                <Footer />
            </div>
        );
    }
}

export default App;
