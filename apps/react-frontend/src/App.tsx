import BodyWeightGraph from "./ui/graphs/body-weight-graph";
import ExerciseMaxGraph from "./ui/graphs/exercise-weight-graph";
import { useWindowSize } from "./utils";

function App() {
  const { width, height} = useWindowSize();

  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return (
  <div className="bg-background">
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
}

export default App;