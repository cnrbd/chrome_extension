import React from 'react';
type ButtonProps = {
    children: React.ReactNode;
};

export const Button = ({ children }: ButtonProps) => {
    return (
      <div className="flex justify-center  my-2">
        <button
          type="submit"
          className="bg-green-200 border p-4 rounded-lg text-lg w-full"
        >
          {children}
        </button>
      </div>
    );
}
