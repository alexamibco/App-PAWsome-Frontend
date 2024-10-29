import { useSayHi } from "../../hooks/useSayHi";

interface SayHiProps {
  className?: string;
}

export const SayHi: React.FC<SayHiProps> = ({ className }) => {
  const sayHi = useSayHi();

  return (
    <div className={`text-text font-playpen font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl transition-all duration-300 ease-in-out ${className}`}>
      {sayHi}
    </div>
  );
};