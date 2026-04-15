
const Activities = () => {
  const [activities, setActivities] = useState([]);
  const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities data:', data);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  if (!activities.length) {
    return <div><h2>Activities</h2><p>No activities found.</p></div>;
  }

  // Get all unique keys for table headers
  const headers = Array.from(new Set(activities.flatMap(obj => Object.keys(obj))));

  return (
    <div>
      <h2>Activities</h2>
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
            {activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                {headers.map(header => (
                  <td key={header}>{String(activity[header])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
