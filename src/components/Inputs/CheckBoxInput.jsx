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
            className="flex flex-wrap cursor-pointer items-start gap-[4px]"
          >
            <div className="flex items-center">
              &#8203;
              <input
                onChange={handleTagChange}
                type="checkbox"
                className="size-4 rounded border-gray-300 "
                id={id}
                value={value}
              />
            </div>

            <div>
              <strong className="font-medium text-gray-900"> {name} </strong>
            </div>
          </label>
        </div>
      </fieldset>
    </>
  );
};
