import React, { useState } from 'react';

import MappingCell from './MappingCell';
import InputCell from './InputCell';

function CellSelector({ id, addMapping, addValue, isHidden, mailManifestHeaders, mapping, value }) {
  const [cellType, setCellType] = useState('');

  const chooseCellType = event => {
    setCellType(event.target.value);
  };

  return (
    <td className={isHidden ? '' : 'hidden'}>
      <select
        onChange={chooseCellType}
        value={cellType || ''}
      >
        <option value="" />
        <option value="mapper">Mapper</option>
        <option value="input">Input</option>
      </select>
      <br />
      <br />
      {(mapping || cellType === 'mapper') ? (
        <MappingCell
          id={id}
          addMapping={addMapping}
          mailManifestHeaders={mailManifestHeaders}
          mapping={mapping}
        />
      ) : (value || cellType === 'input') ? (
        <InputCell
          id={id}
          addValue={addValue}
          value={value}
        />
      ) : null}
    </td>
  );
}

export default CellSelector;
