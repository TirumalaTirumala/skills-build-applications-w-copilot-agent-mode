
const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Leaderboard data:', data);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  if (!leaders.length) {
    return <div><h2>Leaderboard</h2><p>No leaderboard data found.</p></div>;
  }

  const headers = Array.from(new Set(leaders.flatMap(obj => Object.keys(obj))));

  return (
    <div>
      <h2>Leaderboard</h2>
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
            {leaders.map((leader, idx) => (
              <tr key={leader.id || idx}>
                {headers.map(header => (
                  <td key={header}>{String(leader[header])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
