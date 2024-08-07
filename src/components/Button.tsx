import React from 'react';
type ButtonProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
};




export const Button = ({ children, isDisabled }: ButtonProps) => {
  return (
    <div className="flex justify-center  my-2">
      <button
        type="submit"
        className="bg-primary text-white font-LibreBodoni border p-4 rounded-lg text-lg w-full hover:scale-105 transition-transform-all duration-150 ease-in"
        disabled={isDisabled}
      >
        {children}
      </button>
      {isDisabled && <p className="text-red-700">Website is blocking our extension</p>}
    </div>
  );
};

