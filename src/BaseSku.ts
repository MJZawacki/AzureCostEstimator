export interface IBaseSku {
    locations: string[]
}

export abstract class BaseSku implements IBaseSku {
    public locations: string[]
    public abstract FilterSku(meters: any[]);
}