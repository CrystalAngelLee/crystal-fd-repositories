import { useLocation } from "react-router-dom";

export const useParentPath = (): string => {
  let location = useLocation();
  if (location.pathname === "/") return "";
  return location.pathname;
};
