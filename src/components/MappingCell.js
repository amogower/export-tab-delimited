import React from 'react';

function MappingCell({ id, addMapping, mailManifestHeaders, mapping }) {
  const handleMappingSelect = event => {
    addMapping(id, event.target.value);
  };

  return (
    <>
      <select
        onChange={handleMappingSelect}
        value={mapping || ''}
      >
        <option value="" />
        {mailManifestHeaders.map(header => (
          <option
            key={`option_${header}`}
            value={header}
          >
            {header}
          </option>
        ))}
      </select>
    </>
  );
};

export default MappingCell;
