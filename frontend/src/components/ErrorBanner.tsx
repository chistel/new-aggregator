import React, { HtmlHTMLAttributes, FunctionComponent, ReactNode } from 'react';

interface IErrorBannerProps extends HtmlHTMLAttributes<HTMLDivElement>  {
   children?: ReactNode;
}

const ErrorBanner: FunctionComponent<IErrorBannerProps> = ({ children, className, ...rest }) => {
   return (
      <div
         className={`bg-red-100 border-l-4 border-red-500 text-red-700 p-2 rounded-lg ${className || ''}`}
         {...rest}
      >
         {children}
      </div>
   );
};

export default ErrorBanner;
