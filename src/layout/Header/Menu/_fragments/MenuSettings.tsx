import Toggle from '@/components/common/Element/Toggle';
import ThemeLightIcon from '@/assets/icons/theme-light.svg';
import ThemeDarkIcon from '@/assets/icons/theme-dark.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setDarkMode } from '@/store/features/settings/settings.slice';

export default function MenuSettings() {
  const darkMode = useAppSelector((state) => state.settings.darkMode);
  const dispatch = useAppDispatch();

  const toggleHandler = () => {
    dispatch(setDarkMode(!darkMode));
  };

  return (
    <div>
      <button
        className="flex items-center w-full p-4 gap-4 cursor-pointer hover:bg-hover transition"
        onClick={toggleHandler}
      >
        <div className="w-6 h-6">
          {darkMode ? <ThemeDarkIcon /> : <ThemeLightIcon />}
        </div>
        <Toggle name="Dark Mode" active={darkMode} onChange={toggleHandler} />
      </button>
    </div>
  );
}
