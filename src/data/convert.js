'use strict'
const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./stealth.json'));
data.map(item => {
    item.presets.map(preset => {
        preset.psi = parseInt(preset.psi);
        preset.nm = parseInt(preset.nm);
    })
})
fs.writeFileSync('stealth-fixed.json', JSON.stringify(data));
