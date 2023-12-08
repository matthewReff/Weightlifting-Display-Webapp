import { fetchBodyweightData } from "./lib/backend/fetch-bodyweight";

function App() {
  return (
  <div className="bg-background">
    <p className="text-primary text-3xl font-bold underline">Hello world!</p>
    <button
      onClick={async () => {
        //const a = await fetch("data/body-weight")
        const a = await fetchBodyweightData();
        console.log(a);
      }}
    >
    <p>Debug</p>
    </button>
  </div>
  );
}

export default App;
