import { useState } from "react";
import EquationSolution from "./EquationSolution";

function EquationBody(props) {
  const [inputExpression, updateInputExpression] = useState("");
  const [generatedExpression, updateGeneratedExpression] = useState("");
  const [variableList, updateVariableList] = useState([]);

  var tempVariableList = [];

  const checkAndAddVariable = (variable) => {
    if (
      variable != "" &&
      ((variable[0] >= "a" && variable[0] <= "z") ||
        (variable[0] >= "A" && variable[0] <= "Z"))
    ) {
      if (!tempVariableList.includes(variable)) {
        tempVariableList.push(variable);
      }
    }
  };

  const generateEquation = () => {
    var variable = "";
    var input = inputExpression;
    for (var i = 0; i < input.length; i++) {
      if (
        (input[i] >= "a" && input[i] <= "z") ||
        (input[i] >= "A" && input[i] <= "Z") ||
        (input[i] >= "0" && input[i] <= "9" && variable != "")
      ) {
        variable += input[i];
      } else {
        checkAndAddVariable(variable);
        variable = "";
      }
    }
    checkAndAddVariable(variable);
    updateVariableList(tempVariableList);
    tempVariableList = [];
    updateGeneratedExpression(inputExpression);
  };

  return (
    <div className="eq-body">
      <div className="eq-col">
        <div>
          <input
            onChange={(e) => {
              updateInputExpression(e.target.value);
            }}
            placeholder="Enter your Equation"
          ></input>
          <button onClick={generateEquation}>Generate</button>
          <p>{generatedExpression}</p>
        </div>
      </div>
      <div className="eq-col">
        <EquationSolution variables={variableList} equation={inputExpression} />
      </div>
    </div>
  );
}

export default EquationBody;
