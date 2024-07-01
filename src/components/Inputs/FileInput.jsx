export const FileInput = ({ type, accept, handleFileChange, text }) => {
  return (
    <>
      <div>
        <label
          htmlFor="Arquivo"
          className="block text-sm text-gray-500 dark:text-gray-300"
        >
          {text}
        </label>

        <input
          type={type}
          accept={accept}
          onChange={handleFileChange}
          className="block w-full max-w-[350px]  px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
        />
      </div>
    </>
  );
};
