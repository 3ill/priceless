'use client';
import React from 'react';
import toast from 'react-hot-toast';
import Button from './Button';
import { isValidProductUrl } from '@/utils/validation';
import { scrapeAndStoreProduct } from '@/lib/actions';

const Searchbar = () => {
  

  const handleSubmit = async (data: FormData) => {
    const url = data.get('url') as string;
    const isValidLink = isValidProductUrl(url);

    if (!isValidLink) {
      return toast.error('Please provide a valid amazon link');
    }

    try {
      const product = await scrapeAndStoreProduct(url);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  return (
    <form
      action={(FormData) => handleSubmit(FormData)}
      className="flex flex-wrap gap-4 mt-12"
    >
      <input
        type="text"
        name="url"
        placeholder="Enter product link"
        className="searchbar-input bg-gray-400 !placeholder-slate-50 "
      />

      <Button />
    </form>
  );
};

export default Searchbar;
