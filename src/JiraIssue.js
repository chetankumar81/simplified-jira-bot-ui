import React, { useState } from "react";

const JiraIssue = () => {
  const [issueId, setIssueId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://0.0.0.0:8080/api/jira/summary/?issue_id=${issueId}`
      );
      const data = await response.json();
      // const data = {
      //   text: [
      //     "User unable to receive OTP for linking LazyPay account with merchant due to third-party web app issue. Problem traced to long merchant name causing OTP notification to exceed max length. Resolution involves updating validation for merchant name length in code and guidelines.",
      //   ],
      // };
      setResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="input-container">
        <label>
          Issue ID:
          <input
            type="text"
            value={issueId}
            onChange={(e) => setIssueId(e.target.value)}
          />
        </label>
        <button
          className={loading ? "loading" : ""}
          onClick={fetchData}
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </div>

      {result && (
        <div className="result">
          <h3>Result:</h3>
          <p>{result.text[0]}</p>
        </div>
      )}
    </div>
  );
};

export default JiraIssue;
