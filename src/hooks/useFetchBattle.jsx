import { useEffect, useState } from 'react';

const useFetchBattle = (interval = 60000) => { // Intervalo en milisegundos (default: 5000ms)
  const [battleData, setBattleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBattle = async () => {
      try {
        const response = await fetch('/api/battle');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBattleData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBattle(); // Fetch on initial render

    const intervalId = setInterval(fetchBattle, interval);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [interval]);

  return { battleData, loading, error };
};

export default useFetchBattle;
