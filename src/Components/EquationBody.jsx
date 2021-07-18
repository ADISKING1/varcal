import { useState, useEffect, useRef } from "react";
import EquationSolution from "./EquationSolution";

function EquationBody(props) {
  const [inputExpression, updateInputExpression] = useState(
    props.data.inputExpression
  );
  const [generatedExpression, updateGeneratedExpression] = useState(
    props.data.generateEquation
  );
  const [variableList, updateVariableList] = useState(props.data.variableList);
  const [solutionList, updateSolutionList] = useState(props.data.solutionList);
  const [inputs, updateInputs] = useState(props.data.inputs);

  useEffect(() => {
    props.updateData({
      inputExpression,
      generatedExpression,
      variableList,
      solutionList,
      inputs,
    });
  }, [
    inputExpression,
    generatedExpression,
    variableList,
    solutionList,
    inputs,
  ]);

  useEffect(() => {
    if (
      (props.data.generatedExpression || props.data.inputExpression) &&
      (props.data.generatedExpression != generatedExpression ||
        props.data.inputExpression != inputExpression)
    ) {
      updateInputExpression(props.data.inputExpression);
      updateGeneratedExpression(props.data.generatedExpression);
      updateVariableList(props.data.variableList);
      updateSolutionList(props.data.solutionList);
      updateInputs(props.data.inputs);
    }
  }, [props.data]);

  var tempVariableList = [];
  var tempInputExpression = props.data.inputExpression || "";

  const checkAndAddVariable = (variable) => {
    if (
      variable != "" &&
      ((variable[0] >= "a" && variable[0] <= "z") ||
        (variable[0] >= "A" && variable[0] <= "Z"))
    ) {
      if (!tempVariableList.includes(" " + variable + " ")) {
        tempVariableList.push(" " + variable + " ");
      }
    }
  };

  const generateEquation = () => {
    updateInputExpression(tempInputExpression);
    if (inputExpression == "" || solutionList.length === 0)
      updateSolutionList(["Output"]);

    var variable = "";
    var newInputExpression = "";
    var input = tempInputExpression;
    for (var i = 0; i < input.length; i++) {
      if (
        (input[i] >= "a" && input[i] <= "z") ||
        (input[i] >= "A" && input[i] <= "Z") ||
        (input[i] >= "0" && input[i] <= "9" && variable != "")
      ) {
        variable += input[i];
      } else {
        if (variable == "") newInputExpression += input[i];
        else {
          newInputExpression += " " + variable + " " + input[i];
        }
        checkAndAddVariable(variable);
        variable = "";
      }
    }
    if (variable != "") newInputExpression += " " + variable + " ";
    checkAndAddVariable(variable);
    updateVariableList(tempVariableList);

    updateGeneratedExpression(newInputExpression);
    newInputExpression = "";
    tempVariableList = [];
  };

  return (
    <div className="eq-body">
      <div className="eq-col-1">
        <div className="equationExpression">
          <textarea
            rows="4"
            className="expressionInput"
            onChange={(e) => {
              tempInputExpression = e.target.value;
            }}
            placeholder="Enter your Equation"
            defaultValue={props.data.inputExpression || ""}
          ></textarea>
          <p className={generatedExpression ? "generatedEquation" : ""}>
            {generatedExpression}
          </p>
          <div className="solveButton">
            <button onClick={generateEquation} disabled={props.busy}>
              Generate
            </button>
          </div>
        </div>
      </div>
      <div className="eq-col-2">
        {solutionList.map((i, index) => {
          return (
            <div key={i + index} className="equationSolution">
              <div className="minusButton">
                <button
                  onClick={() => {
                    var arr = [...solutionList];
                    arr = [...arr.slice(0, index), ...arr.slice(index + 1)];
                    updateSolutionList(arr);

                    var arr2 = [...inputs];
                    updateInputs([
                      ...arr2.slice(0, index),
                      ...arr2.slice(index + 1),
                    ]);
                  }}
                  disabled={props.busy}
                >
                  <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
                    {" "}
                    <path
                      d="M368 224H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h352c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"
                      fill="currentColor"
                    >
                      {" "}
                    </path>
                  </svg>
                </button>
              </div>
              <EquationSolution
                variables={variableList}
                equation={generatedExpression}
                input={inputs[index]}
                output={solutionList[index]}
                busy={props.busy}
                updateInput={(param) => {
                  var temp = [...inputs];
                  temp[index] = param;
                  updateInputs(temp);
                }}
                updateOutput={(param) => {
                  var temp = [...solutionList];
                  temp[index] = param;
                  updateSolutionList(temp);
                }}
                updateBusy={props.updateBusy}
                index={index}
              />
            </div>
          );
        })}
      </div>
      <div className="addButton">
        <button
          onClick={() => {
            var arr = [...solutionList];
            arr.push("Output");
            updateSolutionList(arr);
          }}
          disabled={props.busy}
        >
          Solve again
        </button>
      </div>
    </div>
  );
}

export default EquationBody;
