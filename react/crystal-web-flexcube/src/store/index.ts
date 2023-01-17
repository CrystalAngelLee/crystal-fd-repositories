import { createContext, useContext } from "react";
import canvasStore, { CanvasStore } from "../pages/Canvas/store";

interface StoreProps {
  canvasStore: CanvasStore;
}

class RootStore {
  canvasStore: CanvasStore;
  constructor() {
    this.canvasStore = canvasStore;
  }
}

const rootStore = new RootStore();
const RootStoreContext = createContext<Partial<StoreProps>>({});
const useRootStore = () => useContext(RootStoreContext);

export { RootStore, rootStore, RootStoreContext, useRootStore };
