import { makeAutoObservable, action, observable } from "mobx";
import { FiledProps, FormDataProps } from "../types";

export class FormStore {
  constructor(fileds: Array<FiledProps>, defaultData: FormDataProps = {}) {
    this.fileds = fileds;
    this.formData = defaultData;
    makeAutoObservable(this, {
      setFormData: action,
      formData: observable,
    });
  }
  fileds: Array<FiledProps> = [];
  formData: FormDataProps = {};

  setFormData = (params: FormDataProps) => {
    Object.keys(params).forEach((p) => {
      this.formData[p] = params[p];
    });
  };
}
