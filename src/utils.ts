export class Utils {
  static objectCleaner(object: object) {
    const cleanObject = {};
    Object.keys(object).forEach((key) => {
      if (
        object[key] === object[key] &&
        object[key] !== '' &&
        object[key] !== undefined &&
        object[key] !== null
      ) {
        cleanObject[key] = object[key];
      }
    });
    return cleanObject;
  }
}
