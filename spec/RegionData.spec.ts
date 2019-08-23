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


  it('All MeterCard Regions should have a related location', function() {
      // get all distinct locations from meter data
      var datacenters : any[] = JSON.parse(fs.readFileSync('src/data/datacenters.json', 'utf8'));
      var skus : IBaseSku[] = JSON.parse(fs.readFileSync('skus_raw_data.json', 'utf8'));
      var sku_locations = [];
      for (var i in skus) {  
          sku_locations = sku_locations.concat(skus[i].locations);
      }
      let unique_skus = new Set(sku_locations);
      // var meters : any[] = JSON.parse(fs.readFileSync('meters_raw_data.json', 'utf8'));
      // make sure that they have a mapping in datacenters.json

      unique_skus.forEach((sku_location) => {
          var location = sku_location;
          let regions : Array<any> = datacenters.filter((x) => { return x.Location.toLowerCase() == location.toLowerCase() });
          expect(regions.length).to.equal(1, "Location missing region map: " + location)

      });
    

  });

  it('Check Distinct MeterCard Regions', function() {
      // get all distinct locations from meter data
      var datacenters : any[] = JSON.parse(fs.readFileSync('src/data/datacenters.json', 'utf8'));
      var meters : any[] = JSON.parse(fs.readFileSync('meters_raw_data.json', 'utf8'));
      var meter_regions = [];
      for (var i in meters) {  
          meter_regions.push(meters[i].MeterRegion);
      }
      let unique_regions = new Set(meter_regions);
      // var meters : any[] = JSON.parse(fs.readFileSync('meters_raw_data.json', 'utf8'));
      // make sure that they have a mapping in datacenters.json
      expect(unique_regions.size).to.be.at.least(48);

  });

    it('Each location should have a matching region');

});