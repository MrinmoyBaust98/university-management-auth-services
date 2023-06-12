const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Partial<T> => {
  const finalobject: Partial<T> = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalobject[key] = obj[key];
    }
  }
  return finalobject;
};

export default pick;
