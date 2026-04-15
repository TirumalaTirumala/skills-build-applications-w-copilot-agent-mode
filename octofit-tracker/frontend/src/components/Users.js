
const Users = () => {
  const [users, setUsers] = useState([]);
  const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/users/`;

  useEffect(() => {
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users data:', data);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  if (!users.length) {
    return <div><h2>Users</h2><p>No users found.</p></div>;
  }

  const headers = Array.from(new Set(users.flatMap(obj => Object.keys(obj))));

  return (
    <div>
      <h2>Users</h2>
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
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                {headers.map(header => (
                  <td key={header}>{String(user[header])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
