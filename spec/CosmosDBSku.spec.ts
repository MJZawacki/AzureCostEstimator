import { expect, assert } from 'chai';
import 'mocha';

import { RateTable, Sku, Meter, CostInput } from '../src/RateTable';
import { RateTableFileStore } from '../src/RateTableFileStore';
import * as fs from 'fs';
import { doesNotReject } from 'assert';
import * as config from "config";
import { AzRestAPI } from '../src/AzRestAPI';
import { CosmosDBSku } from '../src/CosmosDBSku';
var path = require('path');



describe('CosmosDB', () => {

 
  var skus: any[], meters: any[], ratetable: RateTable;

  before(function() {
    this.timeout(30000);
    // load sku and meter raw data

    skus = JSON.parse(fs.readFileSync('skus_raw_data.json', 'utf8'));
    meters = JSON.parse(fs.readFileSync('meters_raw_data.json', 'utf8'));
    // Create RateTable
    ratetable = new RateTable();
    ratetable.setData(skus, meters);

    // Assert that RateTable has cosmosdb skus

    expect(skus).to.not.be.null;
    expect(meters).to.not.be.null;
    expect(ratetable).to.not.be.null;

    
  });

  it('FilterSku should return correct CosmosDB sku details', function() {
    var cosmosdb_meters = CosmosDBSku.FilterSku(meters);
    expect(cosmosdb_meters.length).to.be.least(30);

  });

  it('FilterSku should return correct CosmosDB sku details for EastUS', function() {
    var cosmosdb_meters = CosmosDBSku.FilterSku(meters);
    expect(cosmosdb_meters).to.have.deep.keys.('location': 'US West' });

  });



  it('CosmosDB should be returned as a valid sku', async () => {
    var sku = ratetable.findSku('eastus','CosmosDB');
    expect(sku).to.not.be.null;
    expect(sku.length).to.be.length(1);
  });

  it('CosmosDB should return correct costs for 300 R/U and 1GB', async () => {

    // SETUP
    
    
    // TRY
    var result = CosmosDBSku.CalculateCost(300, .56, 1, 1.45);

    // ASSERT
    expect(result).to.equal("1");
    
  });

  it('CosmosDB should return correct costs for 3000 R/U and 10GB', async () => {

    // SETUP
    
    
    // TRY
    var result = CosmosDBSku.CalculateCost(3000, .56, 10, 1.45);

    // ASSERT
    expect(result).to.equal("1");
    
  });

});




