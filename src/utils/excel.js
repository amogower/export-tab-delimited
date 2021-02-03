import readXlsxFile from 'read-excel-file';

export function handleTemplate(file) {
  return readXlsxFile(file)
    .then(([headers]) => headers)
    .catch(console.log);
}

function formatDate(date) {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

export function handleMailManifest(file) {
  return readXlsxFile(file)
    .then(([headers, ...rows]) => {
      const rowObjs = rows.map((row) =>
        row
          .reduce((obj, column, idx) => {
            let col = column;
            if (col instanceof Date)
              col = formatDate(col);
            return {
              ...obj,
              [headers[idx]]: col,
            };
          }, {})
      );
      return [headers, rowObjs];
    })
    .catch(console.log);
}

function convertToTabDelimited(objArray) {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (const index in array[i]) {
      // TODO: Do we need to add a tab after an empty line anyway?
      if (line !== '') line += '\t';

      line += array[i][index];
    }

    str += `${line}\r\n`;
  }

  return str;
}

export function exportTabDelimitedFile(headers, items, fileTitle) {
  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  const jsonObject = JSON.stringify(items);

  const csv = convertToTabDelimited(jsonObject);

  const exportedFilenmae = fileTitle ? `${fileTitle}.txt` : 'export.txt';

  const blob = new Blob([csv], { type: 'text/plain;charset=utf-8;' });

  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', exportedFilenmae);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function aggregateAndDownload(templateHeaders, mappings, values, mailManifestRows) {
  const aggregate = mailManifestRows.map(row => {
    return templateHeaders.reduce((obj, header) => {
      if (!mappings[header] && !values[header]) {
        return {
          ...obj,
          [header]: '',
        };
      }
      return {
        ...obj,
        [header]: mappings[header] ? row[mappings[header]] : values[header],
      };
    }, {});
  });

  exportTabDelimitedFile(templateHeaders, aggregate);
}
