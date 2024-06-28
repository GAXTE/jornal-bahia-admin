export const DefaultInput = ({
  label,
  type,
  placeholder,
  handleInputChange,
  name,
}) => {
  return (
    <>
      {/* <label
        for={label}
        class="block text-sm text-gray-500 dark:text-gray-300"
      ></label> */}

      <input
        type={type}
        placeholder={placeholder}
        onChange={handleInputChange}
        name={name}
        class="block  mt-2 w-full max-w-[350px] placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300  "
      />
    </>
  );
};
