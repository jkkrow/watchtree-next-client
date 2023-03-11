import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';

const toggleVariants = {
  active: { x: '50%' },
  inActive: { x: '-50%' },
};

interface ToggleProps {
  name?: string;
  active?: boolean;
  onChange: (checked: boolean) => void;
}

export default function Toggle({ name, active, onChange }: ToggleProps) {
  const [checked, setChecked] = useState(active);
  const toggleState = useMemo(() => active ?? checked, [active, checked]);

  const toggleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange(event.target.checked);
  };

  return (
    <div className="flex gap-4">
      <span>{name}</span>
      <label onClick={(event) => event.stopPropagation()}>
        <input
          type="checkbox"
          hidden
          checked={toggleState}
          onChange={toggleHandler}
        />
        <div className="relative flex justify-center items-center w-12 h-6 cursor-pointer rounded-full bg-secondary">
          <motion.div
            className="w-4 h-4 rounded-full bg-inversed"
            variants={toggleVariants}
            initial={toggleState ? 'active' : 'inActive'}
            animate={toggleState ? 'active' : 'inActive'}
          />
        </div>
      </label>
    </div>
  );
}
