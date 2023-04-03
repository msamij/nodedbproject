import { useState } from 'react';
import './DropDown.css';
import Menu from './Menu';

function DropDown() {
  const [selectClick, setSelectClick] = useState(false);
  const [selectText, setSelectText] = useState('Click on drop down');
  const [option, setOption] = useState('Select item');

  const handleSelectOnClick = () => {
    setSelectClick(true);
    setSelectText('Click on any item');
  };

  const handleOnMenuItemClick = (rowData: string) => {
    setOption(rowData);
    setSelectClick(false);
    setSelectText('Click on drop down');
  };
  return (
    <>
      <div className="container">
        <h2>{selectText}</h2>
        <select className="container__select" onMouseDown={handleSelectOnClick}>
          <option>{option}</option>
        </select>
      </div>
      {selectClick ? <Menu handleOnMenuItemClick={handleOnMenuItemClick} /> : ''}
    </>
  );
}

export default DropDown;
