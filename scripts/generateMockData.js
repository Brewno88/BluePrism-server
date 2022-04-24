import * as fs from 'fs';
import { mockData } from './schema.js';

const dbFile = 'db.json';

if (!fs.existsSync(dbFile)) {
  const json = JSON.stringify(mockData);

  fs.writeFile(dbFile, json, function (err) {
    if (err) {
      throw err;
    } else {
      console.log('Mock data created');
    }
  });
} else {
  console.log('Using previously created mock data');
}
