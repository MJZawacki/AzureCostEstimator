import { RateTable } from "./RateTable"

import * as fs from 'fs';

import { IRateTableStore } from "./IRateTableStore";
var path = require('path');

export class RateTableFileStore implements IRateTableStore  {

    private filecachedir: string;

    constructor(filecachedir: string) {
        this.filecachedir = filecachedir;
    }
    

    public async saveRateTable(id: string, rates : RateTable) : Promise<string> {
        this._ratetable = rates;
        // save to file
        let ratestring = JSON.stringify(rates);
        // create directory if not exist
        if (!fs.existsSync(this.filecachedir)) {
            // create dir
            fs.mkdirSync(this.filecachedir);
        }
        // set rate file
        var ratefile = path.join(this.filecachedir, id);
        fs.writeFileSync(ratefile, ratestring, 'utf8');
        return new Promise((resolve, reject) => {
            resolve(ratefile);
        });
    }

    public async getRateTable(id: string) : Promise<RateTable> {
        if (this._ratetable == null) {
            var ratefile = path.join(this.filecachedir, id);
            // load from file
            if (fs.existsSync(ratefile)) {
                this._ratetable = new RateTable(fs.readFileSync(ratefile, 'utf8'));
            } else {
                return null;
            }
        }
        return new Promise((resolve, reject) => {
            resolve(this._ratetable);
        });
    }

    private _ratetable : RateTable
}
