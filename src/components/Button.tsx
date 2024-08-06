import React from 'react';
type ButtonProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
};

export const Button = ({ children, isDisabled }: ButtonProps) => {
  return (
    <div className="flex justify-center flex-col  my-2">
      <button
        type="submit"
        className="bg-green-200 border p-4 rounded-lg text-lg w-full"
        disabled={isDisabled}
      >
        {children}
      </button>
      {isDisabled ? (
        <p className="text-red-700">Website is blocking our extension</p>
      ) : (
        ""
      )}
    </div>
  );
};
