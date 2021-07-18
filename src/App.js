import { Component } from "react";
import "./styles.css";
import favicon from "./image/favicon.ico";
import EquationBody from "./Components/EquationBody.jsx";
import Header from "./Components/Header";

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

  delBody(index, e) {
    const arr = Object.assign([], this.state.bodyList);
    arr.splice(index, 1);
    this.setState({ bodyList: arr });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="workArea">
          {this.state.bodyList.map((i, index) => {
            return (
              <div key={i + index} className="equationBody">
                <div className="deleteButton">
                  <button
                    onClick={this.delBody.bind(this, index)}
                    disabled={this.state.busy}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
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
          <div className="addButton addEquationButton">
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
              + New Equation
            </button>
          </div>
        </div>
      </div>
    );
  }
}
