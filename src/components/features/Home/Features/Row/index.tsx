import { motion } from 'framer-motion';

import { featureVariants } from '@/constants/variants';

interface RowProps {
  index: number;
  header: string;
  description: JSX.Element;
  visual: React.FC;
}

export default function Row({
  index,
  header,
  description,
  visual: Visual,
}: RowProps) {
  return (
    <motion.li
      className="group flex flex-col gap-4 lg:gap-8 lg:flex-row lg:[&:nth-of-type(even)]:flex-row-reverse"
      variants={index % 2 ? featureVariants.right : featureVariants.left}
    >
      <div className="flex-shrink-0 border-2 border-secondary w-full h-80 rounded-md shadow-xl lg:w-2/5 lg:max-w-lg">
        <Visual />
      </div>
      <div className="flex flex-col w-full p-4 gap-4">
        <h3 className="font-medium text-2xl">{header}</h3>
        <div className="flex flex-col gap-4 text-lg">{description}</div>
      </div>
    </motion.li>
  );
}
