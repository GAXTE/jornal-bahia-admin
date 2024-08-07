import { useEffect } from "react";

export const SelectInput = ({ name1, array, handleInputChange, placeholder }) => {
  useEffect(() => {}, [array]);
  return (
    <>
      <select
        name={name1}
        onChange={handleInputChange}
        className="mt-1.5 w-full max-w-[350px] rounded-lg border-gray-300 text-gray-700 sm:text-sm"
      >
        <option value="">{placeholder}</option>
        {array &&
          array.map((obj) => (
            <option key={obj.id} value={obj.id}>
              {obj.name}
            </option>
          ))}
      </select>
    </>
  );
};
