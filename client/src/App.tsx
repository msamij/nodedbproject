import { ChangeEvent, useEffect, useState } from 'react';

type JsonResponse = [
  {
    country_id: number;
    country: string;
    last_update: string;
  }
];

function App() {
  const [data, setData] = useState<JsonResponse>([{ country_id: 0, country: '', last_update: '' }]);
  const [countryInput, setCountryInput] = useState('');
  const [countrySelect, setCountrySelect] = useState('');

  useEffect(() => {
    (async () => {
      let result = await fetch(`http://127.0.0.1:3000?country=${countryInput}`, {
        method: 'GET',
      });
      const json: JsonResponse = await result.json();
      setData(json);
    })();
  }, [countryInput]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => setCountryInput(event.target.value);

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => setCountrySelect(event.target.value);

  return (
    <div className="App">
      <input type="text" onChange={onInputChange} placeholder="Enter Country Name:" />
      <select onChange={onSelectChange}>
        <option>Select Country</option>
        {data.map(el => (
          <option key={el.country_id}>{el.country}</option>
        ))}
      </select>
    </div>
  );
}

export default App;
