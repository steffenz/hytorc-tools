import { Tool, Model, Preset } from '../types/';
import stealthData from './../data/stealth.json';
import avantiData from './../data/avanti.json';
import iceData from './../data/ice.json';
import mxtsaData from './../data/mxt-sa.json';

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
    let stealth: Tool = { name: 'Stealth', image:'stealth.png', models: getModelsForTool(stealthData)}
    let avanti: Tool = { name: 'Avanti', image:'avanti.jpg', models: getModelsForTool(avantiData)}
    let ice: Tool = { name: 'Ice', image:'ice.jpg', models: getModelsForTool(iceData)}
    let mxtsa: Tool = { name: 'MXT-SA', image:'mxt.jpg', models: getModelsForTool(mxtsaData)}
    return [ stealth, avanti, ice, mxtsa ];
})