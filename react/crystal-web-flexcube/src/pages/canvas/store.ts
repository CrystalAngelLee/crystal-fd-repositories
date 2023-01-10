import { FormStore } from "../../components/Form";
import { getFormConfig } from "./utils";

export class CanvasStore {
  formStore: FormStore;
  constructor() {
    const { fileds, datas } = getFormConfig();
    this.formStore = new FormStore(fileds, datas);
  }
}

const store = new CanvasStore();

export default store;
