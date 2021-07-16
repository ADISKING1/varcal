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
            className="variableInput"
            onChange={(e) => {
              var tempInputs = { ...props.input };
              tempInputs[i] = e.target.value;
              props.updateInput(tempInputs);
            }}
            value={(props.input && props.input[i]) || ""}
          ></input>
        );
      })}
      <button
        className="solveButton"
        onClick={solveEquation}
        disabled={props.busy}
      >
        Solve
      </button>
      <div className="outputText">{props.output}</div>
    </div>
  );
}

export default EquationSolution;
