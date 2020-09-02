import React from "react";
import { useContext } from "react";
import { ResultContext } from "../contexts.js/ResultContext";

const Results = () => {
  const { results } = useContext(ResultContext);
  // console.log(results);
  return (
    <div className="container">
      <h5>Results:</h5>
      <ul className="card">
        {results ? (
          results.map((result, index) => {
            return (
              <li key={result.id}>
                {index + 1}. {result.user} - {result.count} words
              </li>
            );
          })
        ) : (
          <p>Hmmm....nothing yet......</p>
        )}
      </ul>
    </div>
  );
};

export default Results;
