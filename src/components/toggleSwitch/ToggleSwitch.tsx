interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className={`block w-10 h-6 rounded-full ${checked ? "bg-principal" : "bg-gray-300"}`}></div>
      <div
        className={`dot absolute left-1 top-1 bg-text w-4 h-4 rounded-full transition ${checked ? "transform translate-x-4" : ""}`}
      ></div>
    </label>
  );
};
