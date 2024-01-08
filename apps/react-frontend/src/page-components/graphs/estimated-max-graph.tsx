import { useEffect, useState } from "react";
import LoadingIndicator from "../../components/loading-indicator";
import { Line, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { PRIMARY_COLOR } from "../../constants";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { LineChart } from "recharts";
import { EstimatedMaxData } from "@tendec/express-backend/src/endpoints/data/estimated-max";
import { GraphRange } from "./types";
import { fetchEstimatedMax } from "../../lib/backend/fetch-estimated-max";

export interface ExerciseWeightGraphProps {
  width?: number,
  height?: number,
  range: GraphRange,
  exerciseName: string
}
function EstimatedMaxWeightGraph({
  width = 500,
  height = 300,
  range,
  exerciseName,
}: ExerciseWeightGraphProps) {
  const [estimatedMaxData, setEstimatedMaxData] = useState<EstimatedMaxData[]>();

  useEffect(() => {
    fetchEstimatedMax(exerciseName, "Brzycki")
      .then(setEstimatedMaxData)
      .catch(console.error)
  }, []);

  if (!estimatedMaxData) {
    return (
      <LoadingIndicator/>
    )
  }

  let yMin = 0;
  let yMax = 0;
  if (range === "auto") {
    const weights = estimatedMaxData.map(exercise => exercise.weight);
    const maxWeight = Math.max(...weights);
    const minWeight = Math.min(...weights);

    const magnitude  = Math.abs(maxWeight - minWeight);
    const padding = magnitude * 0.2;

    yMin = minWeight - padding;
    yMax = maxWeight + padding;
  } else {
    yMax = range.minimum;
    yMax = range.maximum;
  }

  const EstimatedMaxTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (!active || !payload) {
      return null
    }

    const rawInfo = payload[0].payload as EstimatedMaxData;
    return (
      <div className="bg-background-600 p-2">
        <p>{rawInfo.date}</p>
        <p>Estimated Max Weight: {rawInfo.weight}</p>
      </div>
    );
  };


  return (
    <div className="bg-background-800 h-min w-min pr-6 text-center border-2">
      <h1 className="font-bold">Estimated Max {exerciseName} Weight</h1>
      <LineChart width={width} height={height} data={estimatedMaxData}>
        <XAxis dataKey="date" stroke={PRIMARY_COLOR}/>
        <YAxis domain={[yMin, yMax]} stroke={PRIMARY_COLOR}/>
        <Line type="monotone" dataKey="weight" stroke={PRIMARY_COLOR}/>
        <Tooltip content={<EstimatedMaxTooltip/>}/>
      </LineChart>
    </div>
  );
}

export default EstimatedMaxWeightGraph