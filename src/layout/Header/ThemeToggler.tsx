import { useAppDispatch, useAppSelector } from '@/hooks/store.hook';
import { setDarkMode } from '@/store/features/settings/settings.slice';

export default function ThemeToggler() {
  const darkMode = useAppSelector((state) => state.settings.darkMode);
  const dispatch = useAppDispatch();

  const toggleHandler = () => {
    dispatch(setDarkMode(!darkMode));
  };

  return <div onClick={toggleHandler}>Toggle</div>;
}
