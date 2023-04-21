import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import UploadAlert from './Alert';
import UploadList from './List';
import { useAppSelector, useAppDispatch } from '@/hooks/store';
import { setUploadConfig } from '@/store/features/settings/settings.slice';
import { uploadPopupVariants } from '@/constants/variants';

export default function UploadPopup() {
  const progresses = useAppSelector((state) => state.upload.progresses);
  const popupSize = useAppSelector((state) => state.settings.upload.popupSize);
  const dispatch = useAppDispatch();

  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePopupHandler = () => {
    if (popupSize === 'brief') {
      dispatch(setUploadConfig({ popupSize: 'full' }));
    }

    if (popupSize === 'full') {
      dispatch(setUploadConfig({ popupSize: 'brief' }));
    }
  };

  const dragStartHandler = () => {
    setDragging(true);
  };

  const dragEndHandler = () => {
    setDragging(false);
  };

  return (
    <AnimatePresence>
      {progresses.length ? (
        <>
          <div
            className="fixed pointer-events-none w-screen h-screen max-w-full"
            key="backdrop"
            ref={containerRef}
          />
          <motion.div
            className="fixed bottom-12 left-12 bg-primary text-primary ring-2 ring-secondary shadow-lg overflow-hidden z-20"
            key="container"
            drag
            dragConstraints={containerRef}
            dragTransition={{ bounceStiffness: 1000, power: 0 }}
            whileDrag={{ scale: 0.8 }}
            variants={uploadPopupVariants.container}
            initial={popupSize === 'brief' ? 'inActive' : 'active'}
            animate={popupSize === 'brief' ? 'inActive' : 'active'}
            data-dragging={dragging}
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
          >
            <div
              className="h-full data-[dragging=true]:pointer-events-none"
              data-dragging={dragging}
            >
              <UploadAlert
                on={popupSize === 'brief'}
                progresses={progresses}
                onToggle={togglePopupHandler}
              />
              <UploadList
                on={popupSize === 'full'}
                progresses={progresses}
                onToggle={togglePopupHandler}
              />
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
