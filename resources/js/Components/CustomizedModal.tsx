import { type FC, useRef, ReactNode } from 'react';

import useOutsideClick from '@/Hooks/useOutsideClick';
import useLockBodyScroll from '@/Hooks/useLockBodyScroll';

type TModalProps = {
    open: boolean
    children: ReactNode
    onClose: () => void
    title?: string
    closable?: boolean
}

const CustomizedModal:  FC<TModalProps> = ({ open = false, children, onClose, title, closable }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => onClose());
  useLockBodyScroll(!open);

  if (!open) return null;

  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 z-[10] px-4  w-screen h-screen bg-gray20 bg-opacity-20 flex justify-center items-center'>
      <div
        ref={ref}
        className='relative px-14 py-16 max-sm:px-7 max-sm:py-14 max-w-[675px] w-full bg-primary rounded-2xl flex flex-col z-50'
      >
  
          <h3 className='text-2xl text-white'>{title}</h3>
          {closable && (
            <button className='absolute top-3 right-5' onClick={onClose} type='button'>
              <span className='text-4xl text-white '>&times;</span>
            </button>
          )}
        {children && children}
      </div>
    </div>
  );
};

export default CustomizedModal;
