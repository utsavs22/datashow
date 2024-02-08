import Papa from 'papaparse';

export const parseCsv = (file, callback) => {
  Papa.parse(file, {
    complete: (result) => {
      callback(result.data);
    },
    header: true,
  });
};
