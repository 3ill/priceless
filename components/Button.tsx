import React from 'react';
import { useFormStatus } from 'react-dom';

const Button = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="searchbar-btn !bg-gray-800 !bg-opacity-80 hover:scale-110 active:scale-105"
      disabled={pending}
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        <p>Search</p>
      )}
    </button>
  );
};

export default Button;
