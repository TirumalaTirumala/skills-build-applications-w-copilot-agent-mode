
const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/workouts/`;

  useEffect(() => {
    console.log('Fetching Workouts from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts data:', data);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  if (!workouts.length) {
    return <div><h2>Workouts</h2><p>No workouts found.</p></div>;
  }

  const headers = Array.from(new Set(workouts.flatMap(obj => Object.keys(obj))));

  return (
    <div>
      <h2>Workouts</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              {headers.map(header => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, idx) => (
              <tr key={workout.id || idx}>
                {headers.map(header => (
                  <td key={header}>{String(workout[header])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Workouts;
