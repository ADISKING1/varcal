//GAVP8L-QVVHU2L36A
import { useState } from "react";

function EquationSolution(props) {
  const [output, updateOutput] = useState("Output");

  const solveEquation = () => {
    axios
      .get(
        "https://api.wolframalpha.com/v2/query?input=1+2&format=plaintext&output=JSON&appid=GAVP8L-QVVHU2L36A"
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      {props.variables.map((i) => {
        return <input placeholder={i} key={i}></input>;
      })}
      <button onClick={solveEquation}>Solve</button>
      <p>{output}</p>
    </div>
  );
}

export default EquationSolution;
