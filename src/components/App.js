import React, { useReducer } from 'react';

import './App.css';

import TotalDisplay from './TotalDisplay';
import CalcButton from './CalcButton';
//import action types
import { APPLY_NUMBER, 
         CHANGE_OPERATION, 
         applyNumber, 
         addOne, 
         changeOperator, 
         CLEAR_DISPLAY, 
         clearDisplay, 
         MEMORY_ADD, 
         memoryAdd,
         MEMORY_APPLY,
         memoryApply,
         MEMORY_CLEAR,
        memoryClear } from '../actions/index.js';


//keep record of input state
const initialState = {
  total: 0,
  operators: '+',
  memory: 0,
}

const calculateResult = (num1, num2, operation) => {
      console.log(`num1: ${num1}, num2: ${num2}, oper: ${operation}`)
  switch(operation) {
    case("+"):
    return Number(num1) + Number(num2);
    case("*"):
    return Number(num1) * Number(num2);
    case("-"):
    return Number(num1) - Number(num2);
  }
}
const reducer = (state, action) => {
  switch(action.type) {
    case CHANGE_OPERATION:
      return ({ 
        ...state, 
        operators: action.payload
      });
    case CLEAR_DISPLAY:
      return ({
        ...state,
        total: initialState.total
      })
    case MEMORY_APPLY:
      return ({
        ...state,
        total:calculateResult(state.total, state.memory, state.operators)
      })
    case MEMORY_ADD:
      return ({
        ...state,
        memory: state.total
      })
    case MEMORY_CLEAR:
      return ({
        ...state,
        memory: 0
      })
    case APPLY_NUMBER:
      return ({ 
        ...state, 
        total: calculateResult(state.total, action.payload, state.operators)
  })
}}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const handleChangeOperators = evt => {
    const { value } = evt.target
    dispatch(changeOperator(value))
  }

  const handleValueChange = evt => {
    const { value } = evt.target
    dispatch(applyNumber(value))
  }

  const handleClearDisplay = () => {
    dispatch(clearDisplay());
  }

  const handleMemoryAdd = () => {
    dispatch(memoryAdd())
  }

  const handleMemoryApply = () => {
    dispatch(memoryApply())
  }

  const handleMemoryClear = () => {
    dispatch(memoryClear())
  }

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#"> Reducer Challenge</a>
      </nav>

      <div className = "container row mt-5">
        <div className="col-md-12 d-flex justify-content-center">
          <form name="Cal">
            
            <TotalDisplay value={state.total}/>
            <div className="row details">
              <span id="operation"><b>Operation:</b> { state.operators }</span>
              <span id="memory"><b>Memory:</b> {state.memory}</span>
            </div>
            
            <div className="row">
              <CalcButton 
              value={"M+"}
              onClick={handleMemoryAdd}
              />
              <CalcButton 
              value={"MR"}
              onClick={handleMemoryApply}
              />
              <CalcButton 
              value={"MC"}
              onClick={handleMemoryClear}
              />
            </div>

            <div className="row">
              <CalcButton 
              value={1}
              onClick={handleValueChange} 
              />
              <CalcButton 
              value={2}
              onClick={handleValueChange}
              />
              <CalcButton 
              value={3}
              onClick={handleValueChange}
              />
            </div>

            <div className="row">
              <CalcButton 
              value={4}
              onClick={handleValueChange}
              />
              <CalcButton 
              value={5}
              onClick={handleValueChange}
              />
              <CalcButton
              value={6}
              onClick={handleValueChange}
              />
            </div>

            <div className="row">
              <CalcButton
              value={7}
              onClick={handleValueChange}
              />
              <CalcButton 
              value={8}
              onClick={handleValueChange}
              />
              <CalcButton 
              value={9}
              onClick={handleValueChange}
              />
            </div>

            <div className="row">
              <CalcButton 
              value={"+"}
              onClick={handleChangeOperators}
              />
              <CalcButton 
              value={"*"}
              onClick={handleChangeOperators}
              />
              <CalcButton 
              value={"-"}
              onClick={handleChangeOperators}
              />
            </div>

            <div className="row ce_button">
              <CalcButton 
              value={"CE"}
              onClick={handleClearDisplay}
              />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
