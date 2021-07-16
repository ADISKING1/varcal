import { Component } from "react";
import "./styles.css";
import favicon from "./image/favicon.ico";
import EquationBody from "./Components/EquationBody.jsx";

document.getElementById("favicon").setAttribute("href", favicon);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyList: [
        {
          inputExpression: "",
          generatedExpression: "",
          variableList: [],
          solutionList: ["Output"],
          inputs: [{}],
          busy: false,
        },
      ],
    };
  }

  render() {
    return (
      <div>
        {this.state.bodyList.map((i, index) => {
          return (
            <div key={i + index} className="equationBody">
              <button
                className="deleteBodyButton"
                onClick={() => {
                  this.setState({ bodyList: [] });
                  var arr = [...this.state.bodyList];
                  arr = [...arr.slice(0, index), ...arr.slice(index + 1)];
                  this.setState({ bodyList: arr });
                }}
                disabled={this.state.busy}
              >
                ❌
              </button>
              <EquationBody
                data={i}
                dummy={i.inputExpression}
                busy={this.state.busy}
                updateData={(newData) => {
                  var temp = this.state.bodyList;
                  temp[index] = newData;
                  this.setState({ bodyList: temp });
                }}
                updateBusy={(value) => {
                  this.setState({ busy: value });
                }}
              />
            </div>
          );
        })}
        <button
          onClick={() => {
            var arr = [...this.state.bodyList];
            arr.push({
              inputExpression: "",
              generatedExpression: "",
              variableList: [],
              solutionList: ["Output"],
              inputs: [{}],
            });
            this.setState({ bodyList: arr });
          }}
          disabled={this.state.busy}
        >
          Add
        </button>
      </div>
    );
  }
}
