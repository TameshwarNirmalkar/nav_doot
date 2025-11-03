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

export { getUniqueFilters };
