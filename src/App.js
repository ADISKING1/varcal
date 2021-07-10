import { Component } from "react";
import "./styles.css";
import favicon from "./image/favicon.ico";
import EquationBody from "./Components/EquationBody.jsx";

document.getElementById("favicon").setAttribute("href", favicon);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <EquationBody />
      </div>
    );
  }
}
