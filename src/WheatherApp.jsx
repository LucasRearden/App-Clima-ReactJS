import React, { useState } from 'react';

export const WheatherApp = () => {
  const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
  const API_KEY = '92d84829391f626545a13fe17bb9355d';

  const [ciudad, setCiudad] = useState('');
  const [dataClima, setDataClima] = useState(null);
  const [error, setError] = useState(null);

  const handleCambioCiudad = (e) => setCiudad(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima();
  };

  const fetchClima = async () => {
    try {
      setError(null); // limpiar error anterior
      const response = await fetch(
        `${urlBase}?q=${encodeURIComponent(ciudad)}&appid=${API_KEY}&units=metric&lang=es`
      );

      if (!response.ok) {
        setError("❌ Ciudad no encontrada");
        return;
      }

      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      setError("⚠️ Ocurrió un problema de red, intenta de nuevo.");
    }
  };



  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4 text-primary">🌤 Clima dependiendo de tu ubicación</h1>

      <form
        onSubmit={handleSubmit}
        className="d-flex justify-content-center mb-4"
      >
        <input
          type="text"
          value={ciudad}
          onChange={handleCambioCiudad}
          className="form-control w-50 me-2"
          placeholder="Escribe una ciudad..."
        />
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </form>

      {error && (
        <div className="alert alert-danger mx-auto" style={{ maxWidth: "400px" }}>
          {error}
        </div>
      )}
      {dataClima && (
        <div className="card shadow-sm mx-auto p-3" style={{ maxWidth: '400px' }}>
          <h2 className="card-title">{dataClima.name}</h2>
          <p className="text-capitalize fs-4">
            {dataClima?.main?.temp.toFixed(1)}°C
          </p>
          <p className="text-capitalize">
            {dataClima.weather[0].description}
          </p>
          {dataClima?.weather?.[0]?.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
              alt={dataClima.weather[0].description}
              className="img-fluid"
            />
          )}
        </div>
      )}
    </div>
  );
};
