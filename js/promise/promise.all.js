function promiseAll(arr) {
    const res = [];
    return new Promise((resolve, reject) => {
      const addData = (key, val) => {
        res[key] = val;
        if (res.length === arr.length) resolve(res);
      };
      for (let i = 0; i < arr.length; i++) {
        const cur = arr[i];
        if (cur instanceof Promise) {
          cur.then(
            (val) => addData(i, val),
            (err) => reject(err)
          );
        } else {
          addData(i, cur);
        }
      }
    });
}
  