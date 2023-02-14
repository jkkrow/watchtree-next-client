import { useRouter } from 'next/router';
import { useState, useRef } from 'react';

import SearchIcon from '@/assets/icons/search.svg';

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const searchInput = searchInputRef.current;
    if (!keyword || !searchInput) return;

    router.push(`/search/?keyword=${keyword}`);
    searchInput.blur();
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const inputFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
    <form
      className="relative flex justify-center items-center"
      onSubmit={searchHandler}
    >
      <label className="cursor-pointer mr-2" htmlFor="search-input">
        <SearchIcon className="w-6 h-6" />
      </label>
      <input
        className="w-0 focus:w-40 border-b-2 border-black outline-none transition-all"
        id="search-input"
        ref={searchInputRef}
        type="text"
        placeholder="Search Videos"
        autoComplete="off"
        onChange={inputChangeHandler}
        onFocus={inputFocusHandler}
      />
    </form>
  );
}
