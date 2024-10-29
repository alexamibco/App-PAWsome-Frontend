interface WelcomeMessageProps {
  userName: string;
  className?: string;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName, className }) => {
  return (
    <div className={`text-accent font-playpen font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl transition-all duration-300 ease-in-out ${className}`}>
      Hey, {userName}
    </div>
  );
};