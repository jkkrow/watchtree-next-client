import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

import SearchIcon from '@/assets/icons/search.svg';
import { searchVariants } from '@/constants/variants';

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const searchInput = searchInputRef.current;
    if (!keyword || !searchInput) return;

    router.push(`/browse/search/?keyword=${keyword}`);
    searchInput.blur();
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const inputFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
    setFocused(true);
  };

  const inputBlurHandler = () => {
    setFocused(false);
  };

  return (
    <form className="flex justify-center items-center" onSubmit={searchHandler}>
      <motion.label
        className="cursor-pointer w-6 h-6 mr-2"
        htmlFor="search-input"
        variants={searchVariants.button}
        initial="inActive"
        animate={focused ? 'active' : 'inActive'}
      >
        <SearchIcon />
      </motion.label>
      <motion.input
        className="w-40 border-b-2 border-current outline-none bg-transparent"
        id="search-input"
        ref={searchInputRef}
        type="text"
        placeholder="Search Videos"
        autoComplete="off"
        variants={searchVariants.input}
        initial="inActive"
        animate={focused ? 'active' : 'inActive'}
        style={{ originX: 1 }}
        onChange={inputChangeHandler}
        onFocus={inputFocusHandler}
        onBlur={inputBlurHandler}
      />
    </form>
  );
}
