export const logError = (type, msg, e?:object) => {
  throw new Error(msg);
}