import { expect, assert } from 'chai';
import 'mocha';
import { RateTable, Sku, Meter, CostInput } from '../src/RateTable';
import { RateTableBlobStore } from '../src/RateTableBlobStore';
import * as fs from 'fs';
import { AssertionError, doesNotReject } from 'assert';
import { exponentialRetryPolicy } from '@azure/ms-rest-js';
import * as config from "config";
import { IBaseSku } from '../src/BaseSku';

describe('Meter Data - Regions', () => {

  var storageaccount = config.get('storageaccount');
  var storageaccountkey = config.get('storageaccountkey');
  
  it('All MeterCard Regions should have a related location', function() {
      // get all distinct locations from meter data
      var datacenters : any[] = JSON.parse(fs.readFileSync('src/data/datacenters.json', 'utf8'));
      var skus : IBaseSku[] = JSON.parse(fs.readFileSync('skus_raw_data.json', 'utf8'));
      var sku_locations = [];
      for (var i in skus) {
          sku_locations.push(skus[i].locations);
      }
      let unique_skus = new Set(sku_locations);
      // var meters : any[] = JSON.parse(fs.readFileSync('meters_raw_data.json', 'utf8'));
      // make sure that they have a mapping in datacenters.json

    for (var i in sku_locations) {
        var location = sku_locations[i].location;
        let regions : Array<any> = datacenters.filter((x) => { return x.location.toLowerCase() == location.toLowerCase() });
        expect(regions.length).to.equal(1)
    }
    

  });

});