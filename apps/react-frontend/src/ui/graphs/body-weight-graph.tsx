import { useEffect, useState } from "react";
import { fetchBodyweightData } from "../../lib/backend/fetch-bodyweight";
import LoadingIndicator from "../loading-indicator";
import { BodyWeightData } from "@tendec/express-backend/src/endpoints/data/body-weight";
import { Line, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { PRIMARY_COLOR } from "../../constants";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { LineChart } from "recharts";

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

  const BodyWeightTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
  if (!active || !payload) {
    return null
  }

  const rawInfo = payload[0].payload as BodyWeightData;
  return (
    <div className="bg-backgroundBox p-2">
      <p>{rawInfo.date}</p>
      <p>Body Weight: {rawInfo.bodyWeight}</p>
    </div>
  );
};


  // TODO auto adjust size of graph
  return (
    <div>
      <h1>Body Weight Over Time</h1>
      <LineChart width={500} height={300} data={bodyWeightData}>
        <XAxis dataKey="date" stroke={PRIMARY_COLOR}/>
        <YAxis domain={[170, 200]} stroke={PRIMARY_COLOR}/>
        <Line type="monotone" dataKey="bodyWeight" stroke={PRIMARY_COLOR}/>
        <Tooltip content={<BodyWeightTooltip/>}/>
      </LineChart>
    </div>
  );
}

export default BodyWeightGraph