import createStore from "../src/vanilla.js";

const store = createStore((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

store.subscribe((state) => console.log("update"));
const increase = store.getState((state) => state.increasePopulation);

increase();
increase();
increase();
