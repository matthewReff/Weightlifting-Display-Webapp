import { useState } from "react";
import MeasuredMaxGraphs from "./page-components/measured-max-graphs";
import EstimatedMaxGraphs from "./page-components/estimated-max-graphs";
import Select, { SelectOption } from "./components/select";

export enum GraphsToDisplay {
  ESTIMATED_MAX = "ESTIMATED_MAX",
  MEASURED_MAX = "MEASURED_MAX"
}
function App() {
  const [ selectedGraphsToDisplay, setSelectedGraphsToDisplay ] = useState<string>(GraphsToDisplay.MEASURED_MAX);
  const selectOptions: SelectOption[] = [
    {
      value: GraphsToDisplay.MEASURED_MAX,
      label: "Measured Max Lifts",
    },
    {
      value: GraphsToDisplay.ESTIMATED_MAX,
      label: "Estimated Max Lifts",
    },
  ];

  return (
    <div className="bg-background">
      <Select
        options={selectOptions}
        onChange={e => {
          setSelectedGraphsToDisplay(e.target.value);
        }}
      />
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