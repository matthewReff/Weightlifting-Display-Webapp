import BodyWeightGraph from "./ui/graphs/body-weight-graph";
import ExerciseMaxGraph from "./ui/graphs/exercise-max-graph";
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
      yMin={0}
      yMax={200}
      exerciseName="Squat"
    />
    <ExerciseMaxGraph
      width={halfWidth}
      height={halfHeight}
      yMin={100}
      yMax={200}
      exerciseName="Bench"
    />
    <ExerciseMaxGraph
      width={halfWidth}
      height={halfHeight}
      yMin={200}
      yMax={300}
      exerciseName="Deadlift"
    />
  </div>
  );
}

export default App;