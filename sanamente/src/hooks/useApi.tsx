import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (trigger: boolean) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    // Si el trigger no es verdadero, no hacemos la solicitud
    if (!trigger) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);  // Limpiamos errores previos
      try {
        const response = await axios.get('http://localhost:8000/hello/show'); // Cambia la URL por la de tu API
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [trigger]); // La solicitud solo se ejecuta cuando `trigger` cambia a `true`

  return { data, loading, error };
};

export default useApi;
