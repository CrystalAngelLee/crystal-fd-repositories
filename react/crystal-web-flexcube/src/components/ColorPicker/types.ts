import Common from "../../types/common";

export interface ColorPickerProps extends Common {
  value?: string;
  onChange?: (value: string) => void;
}

export interface StyledProps {}
