import { is } from "./shallow.js";

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
    let curState = selectorFn(state);
    // 클로저를 이용하여 이전 상태를 가둬둠

    function subscribeSelector() {
      let nextState = selectorFn(state);
      if (!equlityFn(curState, nextState)) {
        // selector로 조회해서 다를경우 이전 상태를 업데이트하고 함수를 반환
        let prevState = curState;
        curState = nextState;
        subscribeFn(nextState, prevState);
      }
    }
    listeners.add(subscribeSelector);
    return () => listeners.delete(subscribeSelector);
    // 나중에 api=subscribe(...); 해두고 api()로 초기화하기 위함
  };

  const subscribe = (subscribeFn, selectorFn, equalityFn) => {
    if (selectorFn || equalityFn) {
      return subscribeWithSelector(subscribeFn, selectorFn, equalityFn);
    }
    listeners.add(subscribeFn);
    return () => listeners.delete(listener);
    // 나중에 api=subscribe(...); 해두고 api()로 초기화하기 위함
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
