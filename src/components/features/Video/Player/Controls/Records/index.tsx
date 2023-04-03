import { memo } from 'react';

import Btn from '../Btn';
import LayersIcon from '@/assets/icons/layers.svg';

interface RecordsProps {
  onToggle: () => void;
}

const Records = ({ onToggle }: RecordsProps) => {
  return (
    <div>
      <Btn label="Records" onClick={onToggle}>
        <LayersIcon />
      </Btn>
    </div>
  );
};

export default memo(Records);
