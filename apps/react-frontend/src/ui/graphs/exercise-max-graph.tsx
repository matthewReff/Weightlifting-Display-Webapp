import { useEffect, useState } from "react";
import { fetchBodyweightData } from "../../lib/backend/fetch-bodyweight";
import LoadingIndicator from "../loading-indicator";
import { BodyWeightData } from "@tendec/express-backend/src/endpoints/data/body-weight";
import { Line, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { PRIMARY_COLOR } from "../../constants";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { LineChart } from "recharts";
import { ExerciseMaxData } from "@tendec/express-backend/src/endpoints/data/exercise-max";
import { fetchExerciseMax } from "../../lib/backend/fetch-exercise-max";

interface ExerciseMaxGraph {
  width?: number,
  height?: number,
  yMin: number,
  yMax: number,
  exerciseName: string
}
function ExerciseMaxGraph({
  width = 500,
  height= 300,
  yMin,
  yMax,
  exerciseName
}: ExerciseMaxGraph) {
  const [exerciseMaxData, setExerciseMaxData] = useState<ExerciseMaxData[]>();

  useEffect(() => {
    fetchExerciseMax(exerciseName)
    .then(setExerciseMaxData)
    .catch(console.error)
  }, []);

  if (!exerciseMaxData) {
    return (
      <LoadingIndicator/>
    )
  }

  const ExerciseMaxTooltip = ({
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
      <p>Max Weight: {rawInfo.weight}</p>
    </div>
  );
};


  return (
    <div className="bg-background-800 h-min w-min pr-6 text-center border-2">
      <h1 className="font-bold">Max {exerciseName} Weight</h1>
      <LineChart width={width} height={height} data={exerciseMaxData}>
        <XAxis dataKey="date" stroke={PRIMARY_COLOR}/>
        <YAxis domain={[yMin, yMax]} stroke={PRIMARY_COLOR}/>
        <Line type="monotone" dataKey="weight" stroke={PRIMARY_COLOR}/>
        <Tooltip content={<ExerciseMaxTooltip/>}/>
      </LineChart>
    </div>
  );
}

export default ExerciseMaxGraph