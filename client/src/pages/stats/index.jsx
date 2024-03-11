import React, { useState, useEffect } from 'react';
import api from 'src/util/api';

const StatsIndex = () => {
  const [stats, setStats] = useState();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true)
    api.get(`/stats`)
      .then((res) => {
        setStats(res.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('StatsIndex error', error)
        setIsLoading(false)
      })
  }, []);

  if (!stats || isLoading) return <div>Loading stats (this takes several minutes!)</div>

  return <div>{Object.entries(stats).map(([ key, value ]) => (
    <p key={key}>{key}: {value}</p>
  ))}</div>;
};

export default StatsIndex;
