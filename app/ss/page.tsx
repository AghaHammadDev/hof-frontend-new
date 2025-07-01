"use client";

import React, { useState } from "react";
import Spreadsheet from "react-spreadsheet";

export default function SpreadsheetPage() {
  const [data, setData] = useState(
    Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ({ value: "" }))
    )
  );

  const addRow = () => {
    const newRow = data[0].map(() => ({ value: "" }));
    setData([...data, newRow]);
  };

  const addColumn = () => {
    const newData = data.map((row) => [...row, { value: "" }]);
    setData(newData);
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Editable Spreadsheet</h1>

      <div className="mb-4 flex gap-4">
        <button
          onClick={addRow}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Row
        </button>
        <button
          onClick={addColumn}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Column
        </button>
      </div>

      <div className="bg-white rounded text-black overflow-auto p-2">
        <Spreadsheet data={data} onChange={setData} />
      </div>
    </div>
  );
}
