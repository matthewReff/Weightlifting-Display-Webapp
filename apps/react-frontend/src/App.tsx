import { useState } from "react";
import MeasuredMaxGraphs from "./page-components/measured-max-graphs";
import EstimatedMaxGraphs from "./page-components/estimated-max-graphs";

export enum GraphsToDisplay {
  ESTIMATED_MAX = "ESTIMATED_MAX",
  MEASURED_MAX = "MEASURED_MAX"
}
function App() {
  const [ selectedGraphsToDisplay, setSelectedGraphsToDisplay ] = useState<GraphsToDisplay>(GraphsToDisplay.MEASURED_MAX);

  return (
    <div className="bg-background">
      { selectedGraphsToDisplay === GraphsToDisplay.MEASURED_MAX &&
        <MeasuredMaxGraphs />
      }
      { selectedGraphsToDisplay === GraphsToDisplay.ESTIMATED_MAX &&
        <EstimatedMaxGraphs />
      }
    </div>
  );
}

export default App;