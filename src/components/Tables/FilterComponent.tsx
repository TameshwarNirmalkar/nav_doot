import { TableColumnType } from 'antd';
import { RiFilter3Fill } from 'react-icons/ri';

/**
 * Creates a standard Antd table filter configuration.
 * @param filterOptions The array of filter options (e.g., [{text: 'User A', value: 'user_a'}, ...])
 * @param dataIndex The key of the record field to perform the filtering against.
 */
export const CreateStandardFilter = (filterOptions: TableColumnType<any>['filters'], dataIndex: string) => {
  return {
    filters: filterOptions,
    filterMode: 'tree' as const, // 'as const' ensures correct type inference
    filterSearch: true,
    filterMultiple: true,
    filterIcon: <RiFilter3Fill size={20}></RiFilter3Fill>,
    onFilter: (value: string | number | boolean, record: any): boolean => {
      // Ensure the record field exists and convert to string for consistent comparison
      const recordValue = record[dataIndex] ? String(record[dataIndex]).toLowerCase() : '';
      const filterValue = String(value).toLowerCase();

      return recordValue === filterValue;

      // If you need a more robust check (e.g., for tree mode where 'value' could be part of the path):
      // return recordValue.includes(filterValue);
    },
  };
};
