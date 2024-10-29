import { useState } from "react";

interface InputSearchProps{
  className?:string;
  onSearch: (query: string) => void; 
}

export const InputSearch:React.FC<InputSearchProps> = ({className, onSearch}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  return (
    <div className="max-w-3xl mx-auto min-w-[280px]">
      <form
        onSubmit={handleSearch}
        className= {`flex flex-row items-center min-w-[250px] gap-2 p-2 bg-white rounded-full shadow-lg ${className}`}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a place"
          className="flex-1 px-4 py-2 rounded-full border border-principal focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="w-auto px-4 py-2 bg-primary text-text rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="sr-only">Buscar</span>
        </button>
      </form>
    </div>
  );
};
