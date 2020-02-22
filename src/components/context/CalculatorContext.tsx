import React from 'react';
import { Tool, Model } from '../../types';

type CalculatorContext = {
  step: number,
  torque: number,
  tools: Tool[],
  selectedTool: Tool | undefined,
  selectedModel: Model | undefined,

  setStep(step: number): void,
  setTorque(torque: number): void,
  setTools(tools:[Tool]): void,
  setSelectedTool(tool: Tool): void,
  setSelectedModel(model: Model): void,
  nextStep(): void,
  previousStep(): void,
}

const throwNotImplementedErr = () => { throw new Error('Method not implemented') }

export default React.createContext<CalculatorContext>({
  step: 0,
  torque: 0,
  tools: [],
  selectedTool: undefined,
  selectedModel: undefined,

  setStep: (step:number) => throwNotImplementedErr,
  setTorque: (torque: number) => throwNotImplementedErr,
  setTools: (tools:[Tool]) => throwNotImplementedErr,
  setSelectedTool:(tool: Tool) => throwNotImplementedErr,
  setSelectedModel:(model: Model) => throwNotImplementedErr,
  nextStep:() => throwNotImplementedErr,
  previousStep:() => throwNotImplementedErr,
});