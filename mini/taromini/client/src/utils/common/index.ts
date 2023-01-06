export const uuid = () => Math.random().toString().slice(3, 9)

export const fixpointer = (n: number) => Math.floor(n * 100) / 100
