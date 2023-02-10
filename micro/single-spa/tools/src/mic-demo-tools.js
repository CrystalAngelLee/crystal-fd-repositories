// Anything exported from this file is importable by other in-browser modules.
import { ReplaySubject } from 'rxjs'
export function publicApiFunction() {}

export function consoleFunc(param) {
    console.log(`%c${param} wahahah~`, "color: skyblue")
}

export const sharedSubject = new ReplaySubject()
