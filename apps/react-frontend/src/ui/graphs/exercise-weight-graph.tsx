import { useEffect, useState } from "react";
import LoadingIndicator from "../loading-indicator";
import { Line, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { PRIMARY_COLOR } from "../../constants";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { LineChart } from "recharts";
import { ExerciseMaxData } from "@tendec/express-backend/src/endpoints/data/exercise-max";
import { fetchExerciseMax } from "../../lib/backend/fetch-exercise-max";

export type GraphRange =  {
  minimum: number,
  maximum: number
} | "auto"
export interface ExerciseWeightGraph {
  width?: number,
  height?: number,
  range: GraphRange,
  exerciseName: string
}
function ExerciseWeightGraph({
  width = 500,
  height = 300,
  range,
  exerciseName
}: ExerciseWeightGraph) {
  const [exerciseWeightData, setExerciseWeightData] = useState<ExerciseMaxData[]>();

  useEffect(() => {
    fetchExerciseMax(exerciseName)
    .then(setExerciseWeightData)
    .catch(console.error)
  }, []);

  if (!exerciseWeightData) {
    return (
      <LoadingIndicator/>
    )
  }

  let yMin = 0;
  let yMax = 0;
  if (range === "auto") {
    const weights = exerciseWeightData.map(exercise => exercise.weight);
    const maxWeight = Math.max(...weights);
    const minWeight = Math.min(...weights);

    const padding = maxWeight * 0.2;

    yMin = Math.max(0, minWeight - padding);
    yMax = maxWeight + padding;
  } else {
    yMax = range.minimum;
    yMax = range.maximum;
  }

  const ExerciseWeightTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
  if (!active || !payload) {
    return null
  }

  const rawInfo = payload[0].payload as ExerciseMaxData;
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
      <LineChart width={width} height={height} data={exerciseWeightData}>
        <XAxis dataKey="date" stroke={PRIMARY_COLOR}/>
        <YAxis domain={[yMin, yMax]} stroke={PRIMARY_COLOR}/>
        <Line type="monotone" dataKey="weight" stroke={PRIMARY_COLOR}/>
        <Tooltip content={<ExerciseWeightTooltip/>}/>
      </LineChart>
    </div>
  );
}

export default ExerciseWeightGraph