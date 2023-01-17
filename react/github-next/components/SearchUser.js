import { useState, useCallback, useRef } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import api from '../lib/api';
const { Option } = Select;

function SearchUser({ onChange, value }) {
  const lastFetchIdRef = useRef(0);
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const onSearch = useCallback(
    debounce((value) => {
      lastFetchIdRef.current += 1;
      const fetchId = lastFetchIdRef.current;
      setFetching(true);
      setOptions([]);

      api.request({ url: `/search/users?q=${value}` }).then((result) => {
        if (fetchId !== lastFetchIdRef.current) {
          return;
        }
        const data = result.data.items.map((user) => ({
          text: user.login,
          value: user.login,
        }));
        setFetching(false);
        setOptions(data);
      });
    }, 500),
    []
  );
  const handleChange = (value) => {
    setOptions([]);
    setFetching(false);
    onChange(value);
  };
  return (
    <Select
      style={{ width: 200 }}
      showSearch
      placeholder="创建者"
      filterOption={false}
      allowClear={true}
      value={value}
      onSearch={onSearch}
      onChange={handleChange}
      notFoundContent={
        fetching ? <Spin size="small" /> : <span>nothing found</span>
      }
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.text}
        </Option>
      ))}
    </Select>
  );
}

export default SearchUser;
