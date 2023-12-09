import { useEffect, useState } from "react";
import { fetchBodyweightData } from "../../lib/backend/fetch-bodyweight";
import LoadingIndicator from "../loading-indicator";
import { BodyWeightData } from "@tendec/express-backend/src/endpoints/data/body-weight";
import { XAxis, YAxis, CartesianGrid, Line, LineChart, Tooltip } from "recharts";

function BodyWeightGraph() {
  const [bodyWeightData, setBodyWeightData] = useState<BodyWeightData[]>();

  useEffect(() => {
    fetchBodyweightData()
    .then(setBodyWeightData)
    .catch(console.error)
  }, []);

  if (!bodyWeightData) {
    return (
      <LoadingIndicator/>
    )
  }

  // TODO auto adjust size
  return (
    <div>
      <h1>Body Weight Over Time</h1>
      <LineChart width={500} height={300} data={bodyWeightData}>
        <XAxis dataKey="date"/>
        <YAxis domain={[170, 200]}/>
        <Line type="monotone" dataKey="bodyWeight" stroke="#8884d8" />
        <Tooltip />
      </LineChart>
    </div>
  );
}

export default BodyWeightGraph