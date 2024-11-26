import React, { HtmlHTMLAttributes, FunctionComponent, ReactNode } from 'react';

interface ISuccessBannerProps extends HtmlHTMLAttributes<HTMLDivElement>  {
   children?: ReactNode;
}

const SuccessBanner: FunctionComponent<ISuccessBannerProps> = ({ children, className, ...rest }) => {
   return (
      <div
         className={`bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg ${className || ''}`}
         {...rest}
      >
         {children}
      </div>
   );
};

export default SuccessBanner;
