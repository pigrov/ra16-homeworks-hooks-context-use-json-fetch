import { useEffect, useState } from "react";

const Data = () => {
  const [data, loading, error] = useJsonFetch("http://localhost:7070/data");
  console.log(error);

  return (
    <div className="Data">
      <div className="Result">
        {loading && "Loading..."}
        {data.status}
        {error && <span>Error </span>}
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
        if (response.ok) {
          const data = await response.json();
          setError(response.status + " " + data.status);
        }
        setData(data);
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
