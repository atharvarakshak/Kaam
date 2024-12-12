import React from "react";
import Graph from "./Graph";

const AthletePerformance = ({ data }) => {
  const groupedData = data.values.reduce((acc, item) => {
    const { event, event_date, score, score_unit } = item;
    if (!acc[event]) {
      acc[event] = {
        metric: event,
        graph_title: `${event} Performance Over Time`,
        values: [],
        units: score_unit,
      };
    }
    acc[event].values.push([score, event_date]);
    return acc;
  }, {});

  return (
    <div>
      {Object.values(groupedData).map((graphData, index) => (
        <div key={index} style={{ marginBottom: "2rem" }}>
          <Graph data={graphData} />
        </div>
      ))}
    </div>
  );
};

export default AthletePerformance;
