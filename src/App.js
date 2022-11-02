import { useEffect, useState } from "react";

const Data = () => {
  const [data, loading, error] = useJsonFetch("http://localhost:7070/data");
  console.log("data", data, "loading", loading, "error", error);

  return (
    <div className="Data">
      <div className="Result">
        <p>1. {loading && "Loading..."}</p>
        <p>2. {data.status}</p>
        <p>3. {error && <span>Error </span>}</p>
      </div>
    </div>
  );
};

function useJsonFetch(url, opts) {
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData("");
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, opts);
        console.log(response);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setData(data);
        }
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return [data, loading, error];
}

function App() {
  return (
    <div className="App">
      <Data />
    </div>
  );
}

export default App;
