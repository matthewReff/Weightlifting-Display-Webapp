import ExerciseMaxGraph from "./graphs/measured-max-graph";
import { useWindowSize } from "../common/use-window-stats";

const MeasuredMaxGraphs = () => {
  const { width, height} = useWindowSize();

  const halfWidth = (width * .9) / 2;
  const halfHeight = (height * .9) / 2;

  return (
    <div>
      <h1 className="text-center text-4xl py-2">Measured Max Weight Lifted</h1>
      <div className="flex flex-wrap justify-between px-10 py-2">
        <ExerciseMaxGraph
          width={halfWidth}
          height={halfHeight}
          range={"auto"}
          exerciseName="Squat"
        />
        <ExerciseMaxGraph
          width={halfWidth}
          height={halfHeight}
          range={"auto"}
          exerciseName="Deadlift"
        />
      </div>
      <div className="flex flex-wrap justify-between px-10 py-2">
        <ExerciseMaxGraph
          width={halfWidth}
          height={halfHeight}
          range={"auto"}
          exerciseName="Bench"
        />
        <ExerciseMaxGraph
          width={halfWidth}
          height={halfHeight}
          range={"auto"}
          exerciseName="Overhead Press"
        />
      </div>
      <div className="flex flex-wrap justify-between px-10 py-2">
        <ExerciseMaxGraph
          width={halfWidth}
          height={halfHeight}
          range={"auto"}
          exerciseName="Pull Up"
        />
      </div>
    </div>
  );
};

export default MeasuredMaxGraphs;