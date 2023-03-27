import { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import './App.css';

type JsonResponse = [
  {
    country_id: number;
    country: string;
    last_update: string;
  }
];

type CityResponse = [
  {
    city_id: number;
    city: string;
    country_id: number;
    last_update: string;
  }
];

function App() {
  const [data, setData] = useState<JsonResponse>([{ country_id: 0, country: '', last_update: '' }]);
  const [city, setCity] = useState<CityResponse>([{ city_id: 0, city: '', country_id: 0, last_update: '' }]);
  const [countryInput, setCountryInput] = useState('');
  const [countrySelect, setCountrySelect] = useState('');
  const [countryId, setCountryId] = useState(0);

  useEffect(() => {
    (async () => {
      if (!countryId) return;
      let result = await fetch(`http://127.0.0.1:3000/city?country=${countryId}`, {
        method: 'GET',
      });
      const json: CityResponse = await result.json();
      setCity(json);
      console.log(json);
    })();
  }, [countryId]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    (async () => {
      if (!countryInput) return;
      let result = await fetch(`http://127.0.0.1:3000?country=${countryInput}`, {
        method: 'GET',
      });
      const json: JsonResponse = await result.json();
      setData(json);
      console.log(json);
    })();
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => setCountryInput(event.target.value);

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== 'Select Country') {
      setCountrySelect(event.target.value);
      const x = data.filter(el => el.country === event.target.value);
      setCountryId(x[0].country_id);
    }
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onInputChange} placeholder="Enter Country Name:" />
        <button type="submit">Send Request</button>
      </form>
      <br />
      <select onChange={onSelectChange}>
        <option>Select Country</option>
        {data.map(el => (
          <option key={el.country_id}>{el.country}</option>
        ))}
      </select>
      <br />
      <h2>Country Name: {countrySelect}</h2>
      <br />
      <h2>
        Cities:
        {city.map(c => (
          <>
            <span key={c.city_id}>{c.city}</span>
            <br />
          </>
        ))}
      </h2>
    </div>
  );
}

export default App;
