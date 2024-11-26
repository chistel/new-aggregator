import React, { FunctionComponent } from 'react';
import Select, { SingleValue } from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type IFilterComponentProps = {
  keyword: string;
  onKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeywordKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  filterDate: string;
  onDateChange: (date: Date | null) => void;
  providerFilter: { value: string | null; label: string | null };
  onProviderSelection: (source: SingleValue<string | { value: string | null; label: string | null; }>) => void;
  loading: boolean;
  newsProviders: { value: string; label: string }[];
  monthAgoDate: string;
  currentDate: string;
};

export const FilterComponent: FunctionComponent<IFilterComponentProps> = ({
  keyword,
  onKeywordChange,
  onKeywordKeyDown,
  filterDate,
  onDateChange,
  providerFilter,
  onProviderSelection,
  loading,
  newsProviders,
  monthAgoDate,
  currentDate,
}) => {
  return (
    <div className="container my-4 mx-auto mb-4 w-full">
      <div className="relative">
        <input
          type="text"
          value={keyword}
          onChange={onKeywordChange}
          onKeyDown={onKeywordKeyDown}
          placeholder="Search by keyword..."
          className={`px-4 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10 w-full ${loading && 'bg-gray-200'}`}
          disabled={loading}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="col-span-1 mt-3">
          <DatePicker
            showIcon
            selected={filterDate ? new Date(filterDate) : null}
            onChange={onDateChange}
            placeholderText="Filter by Date"
            className={`w-full rounded-md ${loading ? 'bg-gray-200' : ''}`}
            minDate={new Date(monthAgoDate)}
            maxDate={new Date(currentDate)}
            wrapperClassName="w-full"
            disabled={loading}
            isClearable
          />
        </div>
        <div className="col-span-1 mt-3">
          <Select
            value={providerFilter?.value ? providerFilter : ''}
            onChange={onProviderSelection}
            options={newsProviders}
            placeholder="Filter by Provider"
            className="w-full"
            isDisabled={loading}
            isClearable
          />
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
