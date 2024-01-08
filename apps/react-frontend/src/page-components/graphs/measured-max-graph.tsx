import { useEffect, useState } from "react";
import LoadingIndicator from "../../components/loading-indicator";
import { Line, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { PRIMARY_COLOR } from "../../constants";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { LineChart } from "recharts";
import { MeasuredMaxData } from "@tendec/express-backend/src/endpoints/data/measured-max";
import { fetchMeasuredMax } from "../../lib/backend/fetch-exercise-max";
import { GraphRange } from "./types";

export interface MeasuredMaxGraphProps {
  width?: number,
  height?: number,
  range: GraphRange,
  exerciseName: string
}
function MeasuredMaxWeightGraph({
  width = 500,
  height = 300,
  range,
  exerciseName,
}: MeasuredMaxGraphProps) {
  const [measuredMaxData, setMeasuredMaxData] = useState<MeasuredMaxData[]>();

  useEffect(() => {
    fetchMeasuredMax(exerciseName)
      .then(setMeasuredMaxData)
      .catch(console.error)
  }, []);

  if (!measuredMaxData) {
    return (
      <LoadingIndicator/>
    )
  }

  let yMin = 0;
  let yMax = 0;
  if (range === "auto") {
    const weights = measuredMaxData.map(exercise => exercise.weight);
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

  const MeasuredMaxTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (!active || !payload) {
      return null
    }

    const rawInfo = payload[0].payload as MeasuredMaxData;
    return (
      <div className="bg-background-600 p-2">
        <p>{rawInfo.date}</p>
        <p>Weight: {rawInfo.weight}</p>
        <p>Reps: {rawInfo.repetitions}</p>
      </div>
    );
  };


  return (
    <div className="bg-background-800 h-min w-min pr-6 text-center border-2">
      <h1 className="font-bold">Max {exerciseName} Weight</h1>
      <LineChart width={width} height={height} data={measuredMaxData}>
        <XAxis dataKey="date" stroke={PRIMARY_COLOR}/>
        <YAxis domain={[yMin, yMax]} stroke={PRIMARY_COLOR}/>
        <Line type="monotone" dataKey="weight" stroke={PRIMARY_COLOR}/>
        <Tooltip content={<MeasuredMaxTooltip/>}/>
      </LineChart>
    </div>
  );
}

export default MeasuredMaxWeightGraph