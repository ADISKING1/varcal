//GAVP8L-QVVHU2L36A
import { useState } from "react";
import { fetchData } from "./api";

function EquationSolution(props) {
  var tempVariableDictionary = {};
  props.variables.forEach((e) => {
    tempVariableDictionary[e] = "";
  });
  console.log(tempVariableDictionary);

  const [output, updateOutput] = useState("Output");
  const [inputs, updateInputs] = useState({ ...tempVariableDictionary });

  const solveEquation = () => {
    props.variables.map((i) => {
      tempVariableDictionary[i] = inputs[i];
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
            placeholder={i}
            key={i}
            className={i}
            onChange={(e) => {
              var tempInputs = { ...inputs };
              tempInputs[i] = e.target.value;
              updateInputs(tempInputs);
            }}
            value={inputs[i] || ""}
          ></input>
        );
      })}
      <button onClick={solveEquation}>Solve</button>
      <p>{output}</p>
    </div>
  );
}

export default EquationSolution;
