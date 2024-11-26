import React, { FunctionComponent } from 'react';

interface IInputErrorProps {
  message?: string | React.ReactNode;
}

const InputError: FunctionComponent<IInputErrorProps> = ({ message }) => {
  return (
    <div className={ message ? 'block': 'hidden'} >
      <p className="text-sm text-red-600 dark:text-red-400 ">
        {message}
      </p>
    </div>
  );
};

export default InputError;
