import ThemeLightIcon from '@/assets/icons/theme-light.svg';
import ThemeDarkIcon from '@/assets/icons/theme-dark.svg';
import Toggle from '@/components/common/Element/Toggle';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setDarkMode } from '@/store/features/settings/settings.slice';

export default function MenuSettings() {
  const darkMode = useAppSelector((state) => state.settings.darkMode);
  const dispatch = useAppDispatch();

  const toggleHandler = () => {
    dispatch(setDarkMode(!darkMode));
  };

  return (
    <div className="flex items-center p-4 gap-2">
      <span className="w-6 h-6">
        {darkMode ? <ThemeDarkIcon /> : <ThemeLightIcon />}
      </span>
      <Toggle
        name="Dark Mode"
        onClick={toggleHandler}
        initialChecked={darkMode}
      />
    </div>
  );
}
