import { Tool, Model, Preset } from '../types/';
import stealthData from './../data/stealth-fixed.json';

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
    return [ stealth ];
})