import React, { useEffect, useState } from 'react';

import './App.css';
import Table from './components/Table';

import { aggregateAndDownload, handleMailManifest, handleTemplate } from './utils/excel';

function App() {
  const [templateHeaders, setTemplateHeaders] = useState([]);
  const [visibilitySettings, setVisibilitySettings] = useState([]);
  const [mailManifestHeaders, setMailManifestHeaders] = useState([]);
  const [mailManifestRows, setMailManifestRows] = useState([]);
  const [mappings, setMappings] = useState({});
  const [values, setValues] = useState({});

  useEffect(() => {
    console.log(mappings);
    console.log(values);
  }, [mappings, values]);

  // Load visibilitySettings cache
  useEffect(() => {
    const cache = localStorage.getItem('visibilitySettings');
    let cachedVisibilitySettings;

    try {
      cachedVisibilitySettings = JSON.parse(cache);
    } catch {
      cachedVisibilitySettings = [];
    }

    setVisibilitySettings(cachedVisibilitySettings);
  }, []);

  // Load mappings cache
  useEffect(() => {
    const cache = localStorage.getItem('mappings');
    let cachedMappings;

    try {
      cachedMappings = JSON.parse(cache);
    } catch {
      cachedMappings = [];
    }

    setMappings(cachedMappings);
  }, []);

   // Load values cache
   useEffect(() => {
    const cache = localStorage.getItem('values');
    let cachedValues;

    try {
      cachedValues = JSON.parse(cache);
    } catch {
      cachedValues = [];
    }

    setValues(cachedValues);
  }, []);

  // Cache column visibility
  useEffect(() => {
    localStorage.setItem('visibilitySettings', JSON.stringify(visibilitySettings || []));
  }, [visibilitySettings]);

  // Cache mappings
  useEffect(() => {
    localStorage.setItem('mappings', JSON.stringify(mappings || {}));
  }, [mappings]);

  // Cache values
  useEffect(() => {
    localStorage.setItem('values', JSON.stringify(values || {}));
  }, [values]);

  const toggleColumn = event => {
    const [, ...rest] = event.target.id.split('_');
    const id = rest.join('_');
    setVisibilitySettings(prevSettings => {
      const arr = [...prevSettings];
      const index = prevSettings.indexOf(id);
      if (index > -1) {
        arr.splice(index, 1);
      } else {
        arr.push(id);
      }
      return arr;
    });
  };

  const importTemplate = event => {
    handleTemplate(event.target.files[0])
      .then(setTemplateHeaders);
  };

  const importMailManifest = event => {
    handleMailManifest(event.target.files[0])
      .then(([headers, rowObjs]) => {
        setMailManifestHeaders(headers);
        setMailManifestRows(rowObjs);
      });
  };

  const addMapping = (key, value) => {
    setMappings(prevMappings => ({
      ...prevMappings,
      [key]: value,
    }))
  };

  const addValue = (key, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [key]: value,
    }))
  };

  const download = () => {
    aggregateAndDownload(templateHeaders, mappings, values, mailManifestRows);
  };

  return (
    <div className="app">
      <form>
        <label htmlFor="template">
          Upload Template File
          <br />
          <br />
          <input
            id="template"
            type="file"
            name="template"
            onChange={importTemplate}
          />
        </label>
        <br />
        <br />
        <label htmlFor="mail_manifest">
          Upload Mail Manifest
          <br />
          <br />
          <input
            id="mail_manifest"
            type="file"
            name="mail_manifest"
            onChange={importMailManifest}
          />
        </label>
        <br />
        <br />
        {templateHeaders.length > 0 && (
          <Table
            addMapping={addMapping}
            addValue={addValue}
            mailManifestHeaders={mailManifestHeaders}
            mappings={mappings}
            templateHeaders={templateHeaders}
            toggleColumn={toggleColumn}
            values={values}
            visibilitySettings={visibilitySettings}
          />
        )}
        <br />
        <br />
        <div>
          <button type="button" onClick={download}>
            Download Amazon Upload File
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
