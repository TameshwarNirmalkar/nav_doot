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

const toSnakeCase = (str: string) => {
  if (typeof str !== "string") return str;
  return str.replace(/([a-z0-9]|(?<=[A-Z]))([A-Z])/g, "$1_$2").toLowerCase();
};
const toSnakeCaseKeys = (item: { [key: string]: any }): { [key: string]: any } => {
  if (item === null || typeof item !== "object") {
    return item;
  }
  if (Array.isArray(item)) {
    return item.map(toSnakeCaseKeys);
  }
  const newObject: { [key: string]: any } = {};
  for (const key in item) {
    if (Object.hasOwn(item, key)) {
      const newKey = toSnakeCase(key);
      newObject[newKey] = toSnakeCaseKeys(item[key]);
    }
  }
  return newObject;
};

const toSnakeCaseKeysInArray = (array: { [key: string]: any }[]) => {
  if (!Array.isArray(array)) {
    console.error("Input must be an array.");
    return array;
  }
  return array.map(toSnakeCaseKeys);
};

export { getUniqueFilters, toSnakeCaseKeysInArray };
