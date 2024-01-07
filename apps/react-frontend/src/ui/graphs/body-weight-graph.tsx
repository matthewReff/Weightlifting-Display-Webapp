import { useEffect, useState } from "react";
import { fetchBodyweightData } from "../../lib/backend/fetch-bodyweight";
import LoadingIndicator from "../loading-indicator";
import { BodyWeightData } from "@tendec/express-backend/src/endpoints/data/body-weight";
import { Line, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { PRIMARY_COLOR } from "../../constants";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { LineChart } from "recharts";

interface BodyWeightGraphProps {
  width?: number,
  height?: number
}
function BodyWeightGraph({
  width = 500,
  height= 300
}: BodyWeightGraphProps) {
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
    payload
  }: TooltipProps<ValueType, NameType>) => {
    if (!active || !payload) {
      return null
    }

    const rawInfo = payload[0].payload as BodyWeightData;
    return (
      <div className="bg-background-600 p-2">
        <p>{rawInfo.date}</p>
        <p>Body Weight: {rawInfo.bodyWeight}</p>
      </div>
    );
  };

  return (
    <div className="bg-background-800 h-min w-min pr-6 text-center border-2">
      <h1 className="font-bold">Body Weight Over Time</h1>
      <LineChart width={width} height={height} data={bodyWeightData}>
        <XAxis dataKey="date" stroke={PRIMARY_COLOR}/>
        <YAxis domain={[170, 200]} stroke={PRIMARY_COLOR}/>
        <Line type="monotone" dataKey="bodyWeight" stroke={PRIMARY_COLOR}/>
        <Tooltip content={<BodyWeightTooltip/>}/>
      </LineChart>
    </div>
  );
}

export default BodyWeightGraph