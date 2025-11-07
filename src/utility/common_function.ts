// Utility function to extract unique values and format them for Antd filters
const getUniqueFilters = <T, K extends keyof T>(data: T[], dataIndex: K): { text: string; value: string }[] => {
  // 1. Get all unique values for the given dataIndex
  const uniqueValues = Array.from(new Set(data.map((item) => String(item[dataIndex]))));

  // 2. Map them into the required Antd filter format
  return uniqueValues.map((value) => ({
    text: value,
    value: value.toLowerCase(),
  }));
};

/**
 * Converts the keys of all objects within an array from CamelCase to snake_case.
 *
 * @param {Array<Object>} arr The input array of objects with CamelCase keys.
 * @returns {Array<Object>} A new array with all object keys converted to snake_case.
 */
const toSnakeCaseKeysInArray = (arr: { [key: string]: any }[]) => {
  if (!Array.isArray(arr)) {
    console.error('Input is not an array.');
    return arr;
  }

  // Helper function to convert a single object's keys
  const convertObjectKeys = (obj: { [key: string]: any }) => {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    const newObj: { [key: string]: any } = {};
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        newObj[newKey] = obj[key];
      }
    }
    return newObj;
  };

  // Use map to apply the conversion to every object in the array
  const transformedArray = arr.map(convertObjectKeys);

  return transformedArray;
};

export { getUniqueFilters, toSnakeCaseKeysInArray };
