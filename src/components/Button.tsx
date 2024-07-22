import React from 'react';
type ButtonProps = {
    children: React.ReactNode;
};

export const Button = ({ children }: ButtonProps) => {
    return (
        <div className="flex justify-center">
            <button className='bg-green-200 border p-4 m-2 w-11/12'>
                {children}
            </button>
        </div>
    )
}
