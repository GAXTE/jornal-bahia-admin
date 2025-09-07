export const CheckBoxInput = ({
  id,
  handleTagChange,
  value,
  name,
  htmlFor,
}) => {
  return (
    <>
      <fieldset className="flex">
        <legend className="sr-only">Checkboxes</legend>

        <div className="space-y-2">
          <label
            htmlFor={htmlFor}
            className="flex flex-wrap cursor-pointer items-start gap-1 sm:gap-2"
          >
            <div className="flex items-center">
              &#8203;
              <input
                onChange={handleTagChange}
                type="checkbox"
                className="w-3 h-3 sm:w-4 sm:h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                id={id}
                value={value}
              />
            </div>

            <div>
              <strong className="font-medium text-gray-900 text-sm sm:text-base"> {name} </strong>
            </div>
          </label>
        </div>
      </fieldset>
    </>
  );
};
