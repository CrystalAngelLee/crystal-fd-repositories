export default function thunk ({ dispatch }) {
    return next => action => {
        if (typeof action === 'function') {
            return action(dispatch)
        }
        next(action)
    }
}