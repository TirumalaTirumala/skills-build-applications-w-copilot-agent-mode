
const Teams = () => {
  const [teams, setTeams] = useState([]);
  const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/teams/`;

  useEffect(() => {
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams data:', data);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  if (!teams.length) {
    return <div><h2>Teams</h2><p>No teams found.</p></div>;
  }

  const headers = Array.from(new Set(teams.flatMap(obj => Object.keys(obj))));

  return (
    <div>
      <h2>Teams</h2>
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
            {teams.map((team, idx) => (
              <tr key={team.id || idx}>
                {headers.map(header => (
                  <td key={header}>{String(team[header])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;
