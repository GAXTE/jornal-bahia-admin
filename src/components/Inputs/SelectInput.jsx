export const SelectInput = ({ name1, array, handleInputChange }) => {
  return (
    <>
      <select
        name={name1}
        onChange={handleInputChange}
        className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
      >
        {array.map((obj) => (
          <option key={obj.id} value={obj.id}>
            {obj.name}
          </option>
        ))}
      </select>
    </>
  );
};
