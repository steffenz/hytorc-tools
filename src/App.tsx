import React, { useState, useContext } from 'react';
import Calculator from './components/Calculator';
import CalculatorContext from './components/context/CalculatorContext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import getTools from './helpers/getTools';

const App: React.FC = () => {

  const [ step, setStep ] = useState(0);
  const [ torque, setTorque ] = useState();
  const [ tools, setTools ] = useState(getTools());
  const [ selectedTool, setSelectedTool ] = useState();
  const [ selectedModel, setSelectedModel ] = useState();

  const nextStep = () => setStep(step+1);
  const previousStep = () => setStep((step-1) >= 0 ? step-1 : 0)

  const theme = createMuiTheme({
    palette: {
      primary: { main: '#db1f29'},
    }
  }); 

  return (
    <CalculatorContext.Provider value={{ step, torque, setTorque, setStep, tools, setTools, selectedTool, setSelectedTool, selectedModel, setSelectedModel, nextStep, previousStep }}>
      <ThemeProvider theme={theme}>
        <Calculator/>
      </ThemeProvider>
    </CalculatorContext.Provider>
  );
}

export default App;
