import { expect, assert, should } from 'chai';
import 'mocha';
import { RegionStore } from '../src/Regions';


describe('RegionStore', () => {

    it('RegionLookup should return correct values for region by MeterRegion', function() {
        var store = new RegionStore();
        var location = store.LocationLookup('US East');
        expect(location).to.equal('eastus');
    });

    it('RegionLookup should return correct values for region by Location', function() {
        var store = new RegionStore();
        var location = store.MeterRegionLookup('eastus');
        expect(location).to.equal('US East');
    })

});