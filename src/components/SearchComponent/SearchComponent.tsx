import { Button, Input, Space } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { CgSearch } from 'react-icons/cg';

interface SearchPropsI {
  searchLabel?: string;
  onSearch: (val: string) => void;
  onChangeHandler?: (val: string) => void;
  stylesProps?: React.CSSProperties;
  placeholder?: string;
}

export default memo(function SearchComponent({ searchLabel, onSearch, onChangeHandler, stylesProps, placeholder = 'Search' }: SearchPropsI) {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      if (typeof onChangeHandler === 'function') {
        onChangeHandler(e.target.value);
      }
    },
    [onChangeHandler],
  );

  const handleSearch = useCallback(() => {
    onSearch(searchValue);
  }, [searchValue, onSearch]);

  return (
    <Space align="center" className="flex items-center">
      <div className="pl-3">{searchLabel || 'Permission'}</div>
      <div>
        <Input id="search_fld" name="search_fld" suffix={<CgSearch onClick={handleSearch} />} placeholder={placeholder} style={{ width: 380, ...stylesProps }} onChange={handleInputChange} onPressEnter={handleSearch} />
        {/* <Button type="primary" onClick={handleSearch} icon={<CgSearch />}></Button> */}
      </div>
    </Space>
  );
});
