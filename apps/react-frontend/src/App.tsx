import BodyWeightGraph from "./ui/graphs/body-weight-graph";
import { useWindowSize } from "./utils";

function App() {
  const { width, height} = useWindowSize();

  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return (
  <div className="bg-background">
    <BodyWeightGraph width={halfWidth} height={halfHeight}/>
  </div>
  );
}

export default App;