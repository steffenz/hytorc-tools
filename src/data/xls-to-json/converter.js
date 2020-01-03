var xlsx = require('node-xlsx').default;
var fs = require('fs');
var path = require('path');

const args = process.argv.slice(2);

const getValuesFromFile = (fileName) => {
    const sheet1 = xlsx.parse(fs.readFileSync(`${args[0]}/${fileName}`))[0];

    // Drop all rows not containing 5 columns
    const items = sheet1.data.filter(row => (row.length === 5));
    
    // Remove first (headers) and last (revision) texts
    items.splice(0,1);
    items.splice(items.length - 1, 1);
    
    // Create JSON object
    return items.map(item => (
        { psi: item[0], nm: Math.round(item[4]) }
    ));
    
}

const dir = path.join(__dirname, args[0]);
 
fs.readdir(dir, (err, files) => {
    if(err){console.log(err)}

    let data = files.map(file => (
        {
            model: file,
            presets: getValuesFromFile(file)
        }
    ))

    fs.writeFileSync('output.json', JSON.stringify(data));
})
