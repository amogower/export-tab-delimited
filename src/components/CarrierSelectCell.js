import React from 'react';

const carriers = [
  'Blue Package',
  'USPS',
  'UPS',
  'FedEx',
  'DHL',
  'DHL Global Mail',
  'Fastway',
  'UPS Mail Innovations',
  'Royal Mail',
  'FedEx SmartPost',
  'OSM',
  'OnTrac',
  'Streamlite',
  'Newgistics',
  'Canada Post',
  'City Link',
  'GLS',
  'GO!',
  'Hermes Logistik Gruppe',
  'Parcelforce',
  'TNT',
  'Target',
  'SagawaExpress',
  'NipponExpress',
  'YamatoTransport',
  'Other',
];

function CarrierSelectCell({ id, addSelectValue, carrier }) {
  const handleSelectChange = event => {
    addSelectValue(id, event.target.value);
  };

  return (
    <td>
      <table>
        <tbody>
          <tr>
            <td>
              <select
                onChange={handleSelectChange}
                value={carrier || ''}
              >
                <option value="" />
                {carriers.map(({ id, name }) => (
                  <option value={id}>{name}</option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  );
};

export default CarrierSelectCell;
