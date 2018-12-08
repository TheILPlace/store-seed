export function getStoresSnapshot(__stores__) {
    let acc = {};
    const keys =  Object.keys(__stores__);
    for (let i = 0; i < keys.length; i++) {
      let storeName = keys[i];
      acc[storeName] = __stores__[storeName].getSnapshot();
    }

    return acc;
  }