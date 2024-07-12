import React from "react";

interface FilterChipProps {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  onClick,
  isSelected,
}) => {
  return (
    <button
      className={`mx-1 rounded-full px-4 py-2 ${isSelected ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default FilterChip;
