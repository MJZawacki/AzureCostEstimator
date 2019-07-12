import { AzRestAPI } from './AzRestAPI';
import config = require("config");
import * as fs from 'fs';

async function downloadTestData () {

    var id = config.get('defaultoffer') as string;
    let skus =  await AzRestAPI.downloadSkus();
    let meters = await AzRestAPI.downloadMeters(id);

    let skuoutput = JSON.stringify(skus);
    fs.writeFileSync('./skus_raw_data.json', skuoutput,'utf8');
    let meteroutput = JSON.stringify(meters);
    fs.writeFileSync('./meters_raw_data.json', meteroutput,'utf8');
    
}

downloadTestData();