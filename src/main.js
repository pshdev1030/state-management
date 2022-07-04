import createStore from "./vanilla.js";

const store = createStore((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

const param1 = store.getState();
console.log(param1);
store.setState((state) => state.increasePopulation());
const param2 = store.getState();
console.log(param2);
store.subscribe();
