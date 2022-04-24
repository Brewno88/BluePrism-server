import * as fs from 'fs';
import { mockData } from './schema.js';

const dbFile = './src/api/db.json';

if (!fs.existsSync(dbFile)) {
  const json = JSON.stringify(mockData);

  fs.writeFile('./src/api/db.json', json, function (err) {
    if (err) {
      throw err;
    } else {
      console.log('Mock data created');
    }
  });
} else {
  console.log('Using previously created mock data');
}
