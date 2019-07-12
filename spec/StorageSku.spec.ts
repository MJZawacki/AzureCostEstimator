import { expect, assert } from 'chai';
import 'mocha';

import { RateTable, Sku, Meter, CostInput } from '../src/RateTable';
import { RateTableFileStore } from '../src/RateTableFileStore';
import * as fs from 'fs';
import { doesNotReject } from 'assert';
import * as config from "config";
import { AzRestAPI } from '../src/AzRestAPI';
var path = require('path');



describe('StorageSku', () => {

  var store, ratecard;
  before(async function() {
    // create local cache of ratecard if it doesn't exist
    this.timeout(50000);
    let filecache = config.get('filecache') as string; 
    try { 
      expect(filecache).to.not.be.null;
      expect(filecache).to.not.equal('.');
      expect(filecache).to.not.equal('.\\');
      expect(filecache).to.not.equal('./');
      var cacheexists = fs.existsSync(filecache);
      if (cacheexists) 
      {
        var files = fs.readdirSync(filecache); 
        for (var i in files)
        {
          var ratefile = path.join(filecache, files[i]);
          fs.unlinkSync(ratefile)
        }
      }
     
    }
    catch(e) { 
      throw e; 
    }

    store = new RateTableFileStore(filecache);
    ratecard = await AzRestAPI.getRateTable('MS-AZR-0121p', store);
    expect(ratecard).to.not.be.null;
    // Clear Cache

    
  });



  it('CalculateCosts should return correct costs for P60 sku', async () => {


    let input : CostInput[] =  [{
      "name": "P60",
      "location": "eastus",
      "hours": 730,
      "priority": null,
      "os": null,
      "quantity": 3,
      "type": "storage"
    }];
    let output = ratecard.CalculateCosts(input);
   
    expect(output.monthlytotal).to.equal("2838.24");
    expect(output.annualtotal).to.equal("34058.88");
    expect(output.costs.length).to.equal(input.length);
  });

  
});





var loadtestsku = function() {
  return JSON.parse(
    `
      {
        "resourceType": "virtualMachines",
        "name": "Standard_A8_v2",
        "tier": "Standard",
        "size": "A8_v2",
        "family": "standardAv2Family",
        "locations": [
          "eastus"
        ],
        "locationInfo": [
          {
            "location": "eastus",
            "zones": [
              "3",
              "2",
              "1"
            ]
          }
        ],
        "capabilities": [
          {
            "name": "MaxResourceVolumeMB",
            "value": "81920"
          },
          {
            "name": "OSVhdSizeMB",
            "value": "1047552"
          },
          {
            "name": "vCPUs",
            "value": "8"
          },
          {
            "name": "HyperVGenerations",
            "value": "V1"
          },
          {
            "name": "MemoryGB",
            "value": "16"
          },
          {
            "name": "MaxDataDiskCount",
            "value": "16"
          },
          {
            "name": "LowPriorityCapable",
            "value": "True"
          },
          {
            "name": "PremiumIO",
            "value": "False"
          },
          {
            "name": "vCPUsAvailable",
            "value": "8"
          },
          {
            "name": "ACUs",
            "value": "100"
          },
          {
            "name": "vCPUsPerCore",
            "value": "1"
          },
          {
            "name": "CombinedTempDiskAndCachedIOPS",
            "value": "8000"
          },
          {
            "name": "CombinedTempDiskAndCachedReadBytesPerSecond",
            "value": "167772160"
          },
          {
            "name": "CombinedTempDiskAndCachedWriteBytesPerSecond",
            "value": "83886080"
          },
          {
            "name": "EphemeralOSDiskSupported",
            "value": "False"
          }
        ],
        "restrictions": [],
        "location": "eastus",
        "basename": "A8 v2",
        "meterregion": "US East",
        "ratecards": [
          {
            "EffectiveDate": "2016-11-01T00:00:00Z",
            "IncludedQuantity": 0,
            "MeterCategory": "Virtual Machines",
            "MeterId": "5b056dd5-4e11-4b04-8f7c-c8f0534823bc",
            "MeterName": "A8 v2",
            "MeterRates": {
              "0": 0.4
            },
            "MeterRegion": "US East",
            "MeterStatus": "Active",
            "MeterSubCategory": "Av2 Series",
            "MeterTags": [],
            "Unit": "1 Hour"
          },
          {
            "EffectiveDate": "2017-04-01T00:00:00Z",
            "IncludedQuantity": 0,
            "MeterCategory": "Virtual Machines",
            "MeterId": "6a13f3f2-8b89-485c-9292-46117f133619",
            "MeterName": "A8 v2 Low Priority",
            "MeterRates": {
              "0": 0.08
            },
            "MeterRegion": "US East",
            "MeterStatus": "Active",
            "MeterSubCategory": "Av2 Series",
            "MeterTags": [],
            "Unit": "1 Hour"
          },
          {
            "EffectiveDate": "2017-04-01T00:00:00Z",
            "IncludedQuantity": 0,
            "MeterCategory": "Virtual Machines",
            "MeterId": "2be4732f-179f-4869-82c2-e808df842fe2",
            "MeterName": "A8 v2 Low Priority",
            "MeterRates": {
              "0": 0.24
            },
            "MeterRegion": "US East",
            "MeterStatus": "Active",
            "MeterSubCategory": "Av2 Series Windows",
            "MeterTags": [],
            "Unit": "1 Hour"
          },
          {
            "EffectiveDate": "2016-11-01T00:00:00Z",
            "IncludedQuantity": 0,
            "MeterCategory": "Virtual Machines",
            "MeterId": "2781f1d6-dbe4-4dbf-97c9-af5ccfd8a31b",
            "MeterName": "A8 v2",
            "MeterRates": {
              "0": 0.6
            },
            "MeterRegion": "US East",
            "MeterStatus": "Active",
            "MeterSubCategory": "Av2 Series Windows",
            "MeterTags": [],
            "Unit": "1 Hour"
          }
        ]
      }`);
}