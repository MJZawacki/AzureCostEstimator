import { Sku } from "./RateTable";

export class CosmosDBSku {
    
    static CalculateCost(ru: number, rateT1: number, storage: number, storageRate: number): number {

        let monthlycost = rateT1 * ru;
        monthlycost = monthlycost + storage * storageRate;
        return monthlycost;
        
    }

    private static groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
             const key = keyGetter(item);
             const collection = map.get(key);
             if (!collection) {
                 map.set(key, [item]);
             } else {
                 collection.push(item);
             }
        });
        return map;
    }

    static FilterSku(meters: any[]) {
        // Where MeterCategory == 'Azure Cosmos DB'
        // AND MeterStatus != 'Deprecated'
        var cosmosmeters = meters.filter((x) => { return ((x.MeterCategory == 'Azure Cosmos DB') && ((x.MeterStatus != 'Deprecated')))});
        var finalmeter = cosmosmeters[0];
        // Combine Cascading Rates for each region as one Sku
        var grouped_meters = this.groupBy(cosmosmeters, meter => meter.MeterRegion);
        var final_meter_set = [];
        for (var key of grouped_meters.keys()) {
            // build single sku
            let cosmosSku : Sku = {
                "basename": "CosmosDB",
                "id": "CosmosDB",
                "location": key, // TODO change to dev_location
                "name": "RU/s",
                "ratecards": grouped_meters.get(key),
                "meterregion": key,
                "resourceType": "PaaS",
                "size": "N/A"

            }
            final_meter_set.push(cosmosSku);
           
        
          }


        // return one sku per region
        return final_meter_set;
    }


}