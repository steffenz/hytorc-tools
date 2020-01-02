var xlsx = require('node-xlsx').default;
var fs = require('fs');

const sheet1 = xlsx.parse(fs.readFileSync(`./stealth36.xls`))[0];

// Drop all rows not containing 5 columns
const items = sheet1.data.filter(row => (row.length === 5));

// Remove first (headers) and last (revision) texts
items.splice(0,1);
items.splice(items.length - 1, 1);

// Create JSON object
const objs = items.map(item => (
    { psi: item[0], nm: item[4] }
));


fs.writeFileSync('output.json', JSON.stringify(objs));
