import axios from "axios";
const url =
  "https://cors.bridged.cc/https://api.wolframalpha.com/v2/query?input=";
const config = "&format=plaintext&output=JSON&appid=GAVP8L-QVVHU2L36A";
export const fetchData = (input) => {
  let changeableUrl = url + encodeURIComponent(input) + config;
  return axios.get(changeableUrl).then((d) => {
    return d.data.queryresult.success
      ? d.data.queryresult.pods[1].subpods[0].plaintext
      : "Error";
  });
};
