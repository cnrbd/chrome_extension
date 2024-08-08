import React from 'react';
type ButtonProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  error_message?: string;
};




export const Button = ({
  children,
  isDisabled,
  error_message,
}: ButtonProps) => {
  return (
    <>
      <div className="flex justify-center  my-2">
        <button
          type="submit"
          className="bg-primary text-white font-LibreBodoni border p-4 rounded-lg text-lg w-full hover:scale-105 transition-transform-all duration-150 ease-in"
          disabled={isDisabled}
        >
          {children}
        </button>
      </div>
      {isDisabled && <p className="text-red-700">{error_message}</p>}
    </>
  );
};

