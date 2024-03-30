import EstimatedMaxGraph from "./graphs/estimated-max-graph";
import { useWindowSize } from "../common/use-window-stats";
import { useState } from "react";
import { OneRepEstimateFunction } from "../../../express-backend/src/endpoints/data/estimated-max";
import Select, { SelectOption } from "../components/select";

const EstimatedMaxGraphs = () => {
  const [ selectedMaxEstimationFunction, setSelectedMaxEstimationFunction ] = useState<OneRepEstimateFunction>("Brzycki");
  const selectOptions: SelectOption[] = [
    {
      value: "Brzycki",
      label: "Estimate Max with Brzycki Method",
    },
    {
      value: "Epley",
      label: "Estimate Max with Epley Method",
    },
  ];

  const { width, height} = useWindowSize();

  const halfWidth = (width * .9) / 2;
  const halfHeight = (height * .9) / 2;

  return (
    <div>
      <h1 className="text-center text-4xl py-2">Estimated Max Weight Lifted</h1>
      <div className="flex justify-center">
        <Select
          options={selectOptions}
          onChange={e => {
            setSelectedMaxEstimationFunction(e.target.value as OneRepEstimateFunction);
          }}
        />
      </div>
      <div className="flex flex-wrap justify-between px-10 py-2">
        <EstimatedMaxGraph
          width={halfWidth}
          height={halfHeight}
          range={"auto"}
          exerciseName="Squat"
          maxEstimateFunction={selectedMaxEstimationFunction}
        />
        <EstimatedMaxGraph
          width={halfWidth}
          height={halfHeight}
          range={"auto"}
          exerciseName="Deadlift"
          maxEstimateFunction={selectedMaxEstimationFunction}
        />
      </div>
      <div className="flex flex-wrap justify-between px-10 py-2">
        <EstimatedMaxGraph
          width={halfWidth}
          height={halfHeight}
          range={"auto"}
          exerciseName="Bench"
          maxEstimateFunction={selectedMaxEstimationFunction}
        />
        <EstimatedMaxGraph
          width={halfWidth}
          height={halfHeight}
          range={"auto"}
          exerciseName="Overhead Press"
          maxEstimateFunction={selectedMaxEstimationFunction}
        />
      </div>
      <div className="flex flex-wrap justify-between px-10 py-2">
        <EstimatedMaxGraph
          width={halfWidth}
          height={halfHeight}
          range={"auto"}
          exerciseName="Pull Up"
          maxEstimateFunction={selectedMaxEstimationFunction}
        />
      </div>
    </div>
  );
};

export default EstimatedMaxGraphs;