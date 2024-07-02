import React, { useState, useEffect } from "react";

function Datepicker() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleString().replace(/,/g, "");
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 right-auto flex items-center">
        <svg className="w-4 h-4 fill-current text-slate-600 dark:text-slate-400 ml-3" viewBox="0 0 16 16">
          <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
        </svg>
      </div>
      <input
        type="text"
        className="form-input pl-16 dark:bg-slate-800 text-slate-500 hover:text-slate-600 font-semibold w-[15.5rem]"
        value={formatDate(date)}
        readOnly
      />
    </div>
  );
}

export default Datepicker;
