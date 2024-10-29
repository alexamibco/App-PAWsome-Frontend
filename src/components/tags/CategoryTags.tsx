import React from 'react';

interface Props {
  text: string;
  icon: JSX.Element;
  onClick: () => void;
}

export const CategoryTags: React.FC<Props> = ({ text, icon, onClick }) => {
  return (
    <div className="flex flex-col justify-center items-center transition-all duration-300 ease-in-out cursor-pointer" onClick={onClick}>
      <div className="aspect-square w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 rounded-full bg-principal flex flex-col justify-center items-center mb-[-12px] text-[var(--color-text)] transition-all duration-300 ease-in-out hover:bg-accent-light">
        <div className="w-8 sm:w-10 md:w-12 lg:w-14 xl:w-16 h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 transition-all duration-300 ease-in-out">
          {React.cloneElement(icon, { width: '100%', height: '100%' })}
        </div>
        <p className="text-center text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[17px] 
          font-dosis mt-1 transition-all duration-300 ease-in-out">
          {text}
        </p>
      </div>
    </div>
  );
};
