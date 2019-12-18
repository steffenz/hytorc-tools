import { Tool, Model, Preset } from '../types/';
import stealthData from './../data/stealth.json';
import avantiData from './../data/avanti.json';
import xlctData from './../data/xlct.json';
import mxtData from './../data/mxt.json';
import blitzData from './../data/blitz.json';

type DataObject = {
    model: string
    presets: Array<Preset>
}

const getModelsForTool = (data: DataObject[]): Model[] => (
    data.map((item: DataObject): Model => ({
        name: item.model,
        presets: item.presets
    }))
)

export default((): Tool[] => {
    let stealth: Tool = { name: 'Stealth', models: getModelsForTool(stealthData)}
    let avanti: Tool = { name: 'Avanti', models: getModelsForTool(avantiData)}
    let xlct: Tool = { name: 'XLCT', models: getModelsForTool(xlctData)}
    let mxt: Tool = { name: 'MXT', models: getModelsForTool(mxtData)}
    let blitz: Tool = { name: 'Blitz', models: getModelsForTool(blitzData)}
    return [ stealth, avanti, xlct, mxt, blitz ];
})