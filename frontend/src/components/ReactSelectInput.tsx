import Select, { MultiValue } from 'react-select';
import { FunctionComponent } from 'react';

interface ISelectInputProps {
   isMultiple?: true | undefined;
   id: string;
   label: string;
   availableOptions: { value: string; label: string }[];
   selectedValues: MultiValue<{ value: string; label: string }> | null;
   onChange: (newValue: MultiValue<{ value: string; label: string }>) => void;
}
const ReactSelectInput: FunctionComponent<ISelectInputProps> = ({ isMultiple, id, label, availableOptions, selectedValues, onChange }) => (
   <div className="col-span-6 sm:col-span-6">
      <label htmlFor={id} className="block font-medium text-sm text-gray-700 dark:text-gray-300">
         {label}
      </label>
      <div>
         <Select
            id={id}
            placeholder={`Select by ${label.toLowerCase()}...`}
            options={availableOptions}
            value={selectedValues}
            isClearable={false}
            isMulti={isMultiple}
            onChange={onChange}
         />
      </div>
   </div>
);

export default ReactSelectInput;
