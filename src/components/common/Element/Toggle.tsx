import { motion } from 'framer-motion';
import { useState } from 'react';

const toggleVariants = {
  active: { x: '50%' },
  inActive: { x: '-50%' },
};

interface ToggleProps {
  name?: string;
  initialChecked?: boolean;
  onClick: (checked: boolean) => void;
}

export default function Toggle({ name, initialChecked, onClick }: ToggleProps) {
  const [checked, setChecked] = useState(initialChecked);

  const toggleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setChecked(checked);
    onClick(checked);
  };

  return (
    <div className="flex gap-2">
      <span>{name}</span>
      <label className="peer">
        <input
          type="checkbox"
          hidden
          defaultChecked={initialChecked}
          onChange={toggleHandler}
        />
        <div className="relative flex justify-center items-center w-12 h-6 cursor-pointer rounded-full bg-secondary">
          <motion.div
            className="w-4 h-4 rounded-full bg-primary"
            variants={toggleVariants}
            initial="inActive"
            animate={checked ? 'active' : 'inActive'}
          />
        </div>
      </label>
    </div>
  );
}
