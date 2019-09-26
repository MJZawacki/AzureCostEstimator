import * as fs from 'fs';

export interface IRegionMap {
    Location: string,
    MeterRegion: string,
    Estimated: boolean
}

export class Regions {
    [id: string] : IRegionMap
}

export class RegionStore {

    private _locations: Regions;
    private _regions: Regions;
    constructor() {

        var regiondata = JSON.parse(fs.readFileSync('src/data/datacenters.json', 'utf8')) as IRegionMap[];
        this._locations = new Regions();
        this._regions = new Regions();
        regiondata.forEach((x) => { this._locations[x.MeterRegion.toLowerCase()] = { Estimated: x.Estimated, MeterRegion: x.MeterRegion, Location: x.Location}})
        regiondata.forEach((x) => { this._regions[x.Location.toLowerCase()] = { Estimated: x.Estimated, MeterRegion: x.MeterRegion, Location: x.Location}})


    }

    public MeterRegionLookup(location) : string {
    
        var lowlocation = location.toLowerCase();
        //let regions : Array<any> = this._datacenters.filter((x) => { return x.location.toLowerCase() == location.toLowerCase() });
        
        var region = this._regions[lowlocation];
        


        if (region === undefined)
            //console.log('No Region for ' + location);
            throw new Error('No Region for ' + location);
        return region.MeterRegion;
    }

    public LocationLookup(region) : string {
    
        var lowregion = region.toLowerCase();
        //let regions : Array<any> = this._datacenters.filter((x) => { return x.location.toLowerCase() == location.toLowerCase() });
        
        var location = this._locations[lowregion];
        


        if (location === undefined)
            console.log('No Region for ' + location);

        return location.Location;
    }
    
}

