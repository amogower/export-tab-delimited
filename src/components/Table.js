import React from 'react';

import CellSelector from './CellSelector';

function Table({
  addMapping,
  addValue,
  mailManifestHeaders,
  mappings,
  templateHeaders,
  toggleColumn,
  values,
  visibilitySettings,
}) {
  return (
    <table>
      <thead>
        <tr>
          {templateHeaders
            .map(header  => (
              <td
                key={`header_${header}`}
                className={visibilitySettings.indexOf(header) === -1 ? '' : 'hidden'}
              >
                <span>{header}</span>
                <br />
                <input
                  id={`toggle_${header}`}
                  type="checkbox"
                  onChange={toggleColumn}
                  checked={visibilitySettings.indexOf(header) === -1}
                />
              </td>
            ))
          }
        </tr>
      </thead>
      <tbody>
        <tr>
          {mailManifestHeaders.length > 0 && templateHeaders.map(header => (
            <CellSelector
              key={`cell_${header}`}
              id={header}
              addMapping={addMapping}
              addValue={addValue}
              isHidden={visibilitySettings.indexOf(header) === -1}
              mailManifestHeaders={mailManifestHeaders}
              mapping={mappings[header] || ''}
              value={values[header] || ''}
            />
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
