//GAVP8L-QVVHU2L36A
import { useState } from "react";
import { fetchData } from "./api";

function EquationSolution(props) {
  var tempVariableDictionary = {};
  // props.variables.forEach((e) => {
  //   tempVariableDictionary[e] = "";
  // });
  // console.log(tempVariableDictionary);

  const [output, updateOutput] = useState("Output");
  // const [inputs, updateInputs] = useState({});
  const solveEquation = () => {
    props.variables.map((i) => {
      tempVariableDictionary[i] = props.input[i];
    });

    var tempEquation = props.equation;
    props.variables.map((i) => {
      tempEquation = tempEquation.replaceAll(i, tempVariableDictionary[i]);
    });

    fetchData(tempEquation).then((d) => {
      updateOutput(d);
    });
  };

  return (
    <div>
      {props.variables.map((i) => {
        return (
          <input
            type="number"
            placeholder={i}
            key={i}
            className={i}
            onChange={(e) => {
              var tempInputs = { ...props.input };
              tempInputs[i] = e.target.value;
              props.updateInput(tempInputs);
            }}
            value={(props.input && props.input[i]) || ""}
          ></input>
        );
      })}
      <button onClick={solveEquation}>Solve</button>
      <div className="outputText">{output}</div>
    </div>
  );
}

export default EquationSolution;
