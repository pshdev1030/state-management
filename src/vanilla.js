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

  const subscribe = (subscribeFn) => {
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
