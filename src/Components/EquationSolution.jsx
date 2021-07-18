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
      <div className="outputContainer">
        <div className="variableInput expressionInput outputText">
          {props.output}
        </div>
        <div className="copyButton">
          <button
            onClick={() => {
              navigator.clipboard.writeText(props.output);
              var x = document.getElementById("snackbar");
              x.className = "show";
              setTimeout(function () {
                x.className = x.className.replace("show", "");
              }, 2000);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
          </button>
        </div>
      </div>
      <div id="snackbar">Copied to clipboard!</div>
    </div>
  );
}

export default EquationSolution;
