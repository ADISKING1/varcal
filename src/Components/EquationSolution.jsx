//GAVP8L-QVVHU2L36A
import { fetchData } from "../api";

function EquationSolution(props) {
  var tempVariableDictionary = {};

  const solveEquation = () => {
    props.updateOutput("Loading...");
    props.updateBusy(true);
    props.variables.map((i) => {
      tempVariableDictionary[i] = props.input[i];
    });

    var tempEquation = props.equation;
    props.variables.map((i) => {
      tempEquation = tempEquation.replaceAll(i, tempVariableDictionary[i]);
    });

    fetchData(tempEquation).then((d) => {
      props.updateOutput(d);

      props.updateBusy(false);
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
            className="variableInput expressionInput"
            onChange={(e) => {
              var tempInputs = { ...props.input };
              tempInputs[i] = e.target.value;
              props.updateInput(tempInputs);
            }}
            value={(props.input && props.input[i]) || ""}
          ></input>
        );
      })}
      <div className="solveButton innerSolveButton">
        <button
          onClick={solveEquation}
          disabled={props.busy || (props.equation ? false : true)}
        >
          Solve
        </button>
      </div>
      <div className="variableInput expressionInput outputText">
        {props.output}
      </div>
    </div>
  );
}

export default EquationSolution;
