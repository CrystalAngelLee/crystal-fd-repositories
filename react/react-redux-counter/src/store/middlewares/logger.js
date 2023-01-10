export default function Logger (store) {
    return  next => action => {
        // ！！！注意此步必须
        next(action)
    }
}
