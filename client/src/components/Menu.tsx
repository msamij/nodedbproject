import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import './Menu.css';

function Menu(props: { handleOnMenuItemClick: (rowData: string) => void }) {
  const selectRef = useRef<HTMLTableRowElement>(null);
  const [rowHeading, setRowHeading] = useState(['']);
  const [rowData, setRowData] = useState<any[]>([]);
  const rowRefs = useRef<Array<HTMLTableRowElement | null>>([]);

  useEffect(() => {
    (async () => {
      let result = await fetch(`http://127.0.0.1:3000/countries`, {
        method: 'GET',
      });
      const jsonResponse: any[] = await result.json();
      setRowHeading(Object.keys(jsonResponse[0]));
      setRowData(jsonResponse);
    })();
  }, []);

  return (
    <div className="menu">
      <table>
        <thead>
          <tr>
            {rowHeading.map((el, index) => (
              <th key={index}>{el}</th>
            ))}
          </tr>
        </thead>

        <tbody onClick={(event: any) => props.handleOnMenuItemClick(event.target.closest('tr').innerText)}>
          {rowData.map((data, index) => (
            <tr key={index}>
              {Object.values(data).map((el: any, index) => (
                <td key={index}>{el}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Menu;
