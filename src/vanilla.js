import { is } from "./shallow";

const createStore = (createState) => {
  let state;
  let listeners = new Set();
  const setState = (tool) => {
    const nextState = typeof tool === "function" ? tool(state) : tool;

    if (nextState !== state) {
      const previousState = state;

      state = Object.assign({}, state, nextState);

      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const getState = () => state;

  const subscribeWithSelector = (
    subscribeFn,
    selectorFn = getState,
    equlityFn = is
  ) => {
    return subscribeFn(state);
  };

  const subscribe = (subscribeFn, selectorFn, equalityFn) => {
    if (selectorFn || equalityFn) {
      console.log(subscribeWithSelector(state));
    }
    listeners.add(subscribeFn);
  };

  const clear = () => {
    listeners.clear();
  };

  state = createState(setState, getState, clear);

  return {
    setState,
    getState,
    subscribe,
    clear,
  };
};

export default createStore;
