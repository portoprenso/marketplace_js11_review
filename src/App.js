import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import Routes from './Routes/Routes';

function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
  }, []);

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
