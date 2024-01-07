import BodyWeightGraph from "./graphs/body-weight-graph";
import ExerciseMaxGraph from "./graphs/exercise-weight-graph";
import { useWindowSize } from "../common/use-window-stats";

const MeasuredMaxGraphs = () => {
  const { width, height} = useWindowSize();

  const halfWidth = width / 2;
  const halfHeight = height / 2;
  return (
    <div>
      <BodyWeightGraph
        width={halfWidth}
        height={halfHeight}
      />
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
        exerciseName="Bench"
      />
      <ExerciseMaxGraph
        width={halfWidth}
        height={halfHeight}
        range={"auto"}
        exerciseName="Deadlift"
      />
    </div>
  );
};

export default MeasuredMaxGraphs;