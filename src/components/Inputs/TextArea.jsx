export const TextArea = ({ type, placeholder, handleInputChange, name, value }) => {
  return (
    <>
      <div className="">
        <textarea
          type={type}
          placeholder={placeholder}
          onChange={handleInputChange}
          value={value}
          name={name}
          className="block mt-2 w-full max-w-[280px] sm:max-w-[350px] placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-3 sm:px-4 h-24 sm:h-32 py-2 sm:py-2.5 text-sm sm:text-base text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 resize-y"
        ></textarea>
      </div>
    </>
  );
};
