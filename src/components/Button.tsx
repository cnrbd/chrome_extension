import React from 'react';
type ButtonProps = {
    children: React.ReactNode;
};

export const Button = ({ children }: ButtonProps) => {
    return (
        <button className='bg-green-200 border p-4 m-2'>
            {children}
        </button>
    )
}
