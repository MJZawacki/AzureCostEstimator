

import { expect, assert, should } from 'chai';
import 'mocha';



import { RateTable, Sku, Meter, CostInput,  } from '../src/RateTable';
import { RateTableFileStore } from '../src/RateTableFileStore';
import * as fs from 'fs';
import { doesNotReject } from 'assert';
import * as config from "config";
import { AzRestAPI } from '../src/AzRestAPI';
import { CosmosDBSku, ICosmosDBSkuInput } from '../src/CosmosDBSku';
import { RegionStore, Regions } from '../src/Regions';

var path = require('path');



describe('CosmosDB', () => {

 
  var skus: any[], meters: any[], ratetable: RateTable, datacenters: RegionStore;

  before(function() {
    this.timeout(30000);
    // load sku and meter raw data

    skus = JSON.parse(fs.readFileSync('skus_raw_data.json', 'utf8'));
    meters = JSON.parse(fs.readFileSync('meters_raw_data.json', 'utf8'));
    // Create RateTable
    ratetable = new RateTable();
    ratetable.setData(skus, meters);

    datacenters = new RegionStore();
  
    expect(skus).to.not.be.null;
    expect(meters).to.not.be.null;
    expect(ratetable).to.not.be.null;

    
  });

  it('FilterSku should return correct CosmosDB sku details', function() {
    var sku = new CosmosDBSku(datacenters);
    var cosmosdb_meters = sku.FilterSku(meters);
    expect(cosmosdb_meters.length).to.be.least(30);

  });

  it('FilterSku should return correct CosmosDB sku details for westus', function() {
    var sku = new CosmosDBSku(datacenters);
    var cosmosdb_meters = sku.FilterSku(meters);
    cosmosdb_meters = cosmosdb_meters.filter((x) => x.location == 'westus');
    expect(cosmosdb_meters.length).to.equal(1);
    expect(cosmosdb_meters[0].location).to.equal('westus');


    // need to figure out how to work with typescript and chai-like & chai-things to make this work
    //expect(cosmosdb_meters).to.be.an('array').that.contains.something.like({location: 'US West'});

    //expect(cosmosdb_meters).to.have.deep.property('location', 'US West');

  });



  it('CosmosDB should be returned as a valid sku for westus', async () => {
    var sku = ratetable.findSku('westus','CosmosDB');
    expect(sku).to.not.be.null;
    expect(sku.length).to.equal(1);
  });

  it('CosmosDB should return correct costs for 300 R/U and 1GB', async () => {
    var sku_input: ICosmosDBSkuInput = {
      ru: 300,
      multimaster: false,
      data: 500,
      hours: 30*24
    }
    // SETUP
    
    
    // TRY
    var result = CosmosDBSku.CalculateCost(300, .56, 1, 1.45);

    // ASSERT
    expect(result.toFixed(2)).to.equal("3.13");
    
  });

  it('CosmosDB should return correct costs for 3000 R/U and 10GB', async () => {

    // SETUP
    
    
    // TRY
    var result = CosmosDBSku.CalculateCost(3000, .56, 10, 1.45);

    // ASSERT
    expect(result.toFixed(2)).to.equal("31.30");
    
  });

});




