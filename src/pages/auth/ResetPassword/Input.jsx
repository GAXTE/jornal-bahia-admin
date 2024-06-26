import { forwardRef } from "react";

export const Input = forwardRef(({ error, type, autoComplete, ...rest }, ref) => {
  return (
    <div>
      <input type={type} className="inputDefault price m" ref={ref} autoComplete={autoComplete} {...rest} />
      {error ? <p>{error.message}</p> : null}
    </div>
  );
});
