import ThemeLightIcon from '@/assets/icons/theme-light.svg';
import ThemeDarkIcon from '@/assets/icons/theme-dark.svg';
import Toggle from '@/components/common/Element/Toggle';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setDarkMode } from '@/store/features/settings/settings.slice';

export default function ThemeToggle() {
  const darkMode = useAppSelector((state) => state.settings.darkMode);
  const dispatch = useAppDispatch();

  const toggleHandler = () => {
    dispatch(setDarkMode(!darkMode));
  };

  return (
    <div className="flex items-center gap-2">
      {darkMode ? (
        <ThemeDarkIcon width={24} height={24} />
      ) : (
        <ThemeLightIcon width={24} height={24} />
      )}
      <Toggle
        name="Dark Mode"
        onClick={toggleHandler}
        initialChecked={darkMode}
      />
    </div>
  );
}
