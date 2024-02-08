import React, { useState, useEffect } from 'react';
import { parseCsv } from '../../CsvReader';


function Datashow() {
    const [csvData, setCsvData] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      parseCsv(file, (data) => {
        setCsvData(data);
        setCurrentRow(0);
      });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentRow((prevRow) => (prevRow + 1) % csvData.length);
    }, 3000); //change the time interval here. 3000 means 3 seconds and 5000 will mean 5 seconds and so on

    return () => clearInterval(intervalId);
  }, [csvData]);
  
    return (
        <div>
          <input type="file" onChange={handleFileChange} />
          <table>
            <thead>
              <tr>
                {csvData.length > 0 &&
                  Object.keys(csvData[0]).map((header) => (
                    <th key={header}>{header}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index} style={{ display: index === currentRow ? 'table-row' : 'none' }}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default Datashow