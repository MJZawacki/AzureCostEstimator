export class CosmosDBSku {
    
    static CalculateCost(ru: number, rateT1: number, storage: number, storageRate: number): number {

        let monthlycost = rateT1 * ru;
        monthlycost = monthlycost + storage * storageRate;
        return monthlycost;
        
    }

    static FilterSku(meters: any[]) {
        // Where MeterCategory == 'Azure Cosmos DB'
        // AND MeterStatus != 'Deprecated'
            cosmosmeters = meters.filter((x) => { return ((x.location == location) && ((x.name == skuname) || (x.size.includes(skuname))))});
        }
        // Combine Cascading Rates for each region as one Sku
        
    }


}