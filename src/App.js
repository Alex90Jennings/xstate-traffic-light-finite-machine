import './App.css';
import { createMachine, interpret } from 'xstate';
import { useMachine } from '@xstate/react';
import "./index.css";

const trafficLightMachine = createMachine({
  id: 'traffic lights',
  "initial": "green",
  states: {
    "red": {
      on: {
        "SWITCH_GREEN": {
          target: "green"
        }
      },
      after: {
        3000: { target: 'green' }
      }
    },
    "yellow": {
      on: {
        "SWITCH_RED": {
          target: "red"
        }
      },
      after: {
        3000: { target: 'red' }
      }
    },
    "green": {
      on: {
        "SWITCH_YELLOW": {
          target: "yellow"
        }
      },
      after: {
        3000: { target: 'yellow' }
      }
    }
  }
})

const trafficLightMachineService = interpret(trafficLightMachine).onTransition((state) =>
  console.log(state.value)
);

trafficLightMachineService.start();
trafficLightMachineService.send({ type: 'RESOLVE' });

function App() {
  const [state, send] = useMachine(trafficLightMachine)

  return (
  <div className="App three-rows">
    <section>
      <button  className={state.value === 'green' ? 'green' : ''} onClick={() => send("SWITCH_YELLOW")}>Switch</button>
    </section>
    <section>
      <button className={state.value === 'yellow' ? 'yellow' : ''} onClick={() => send("SWITCH_RED")}>Switch</button>
    </section>
    <section>
      <button className={state.value === 'red' ? 'red' : ''} onClick={() => send("SWITCH_GREEN")}>Switch</button>
    </section>
  </div>);
}

export default App;