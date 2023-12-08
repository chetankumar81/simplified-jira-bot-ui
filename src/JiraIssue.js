import React, { useState } from "react";

const JiraIssue = () => {
  const [issueId, setIssueId] = useState("");
  const [result, setResult] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://0.0.0.0:8080/api/jira/summary/?issue_id=${issueId}`
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <label>
        Issue ID:
        <input
          type="text"
          value={issueId}
          onChange={(e) => setIssueId(e.target.value)}
        />
      </label>
      <button onClick={fetchData}>Fetch Data</button>

      {result && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default JiraIssue;
