import React from 'react';

type ButtonProps ={
    onClick: () => void;
    content: React.ReactNode;
}

const Button = ({ onClick, content }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded hover:bg-blue-600 `}
        >
            {content}
        </button>
    );
};

export default Button;