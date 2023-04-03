import { memo } from 'react';

import Btn from '../Btn';
import SettingIcon from '@/assets/icons/gear.svg';

interface SettingsProps {
  onToggle: () => void;
}

const Settings = ({ onToggle }: SettingsProps) => {
  return (
    <div>
      <Btn label="Settings" onClick={onToggle}>
        <SettingIcon />
      </Btn>
    </div>
  );
};

export default memo(Settings);
