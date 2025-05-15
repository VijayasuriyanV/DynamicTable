import React from "react";
import type {Capsule} from "../types/types";

interface TableHeaderProps {
  keys: (keyof Capsule)[];
  sortKey: keyof Capsule | null;
  sortOrder: "asc" | "desc";
  onSort: (key: keyof Capsule) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({keys, sortKey, sortOrder, onSort}) => (
  <thead className="bg-indigo-600 text-white">
    <tr>
      {keys.map((key) => (
        <th
          key={String(key)}
          onClick={() => onSort(key)}
          className="px-4 py-3 text-left font-semibold tracking-wide text-sm capitalize whitespace-nowrap cursor-pointer select-none">
          {String(key).replace(/_/g, " ")}
          <span className="ml-1">
            {sortKey === key ? (sortOrder === "asc" ? "🔼" : "🔽") : "⬍"}
          </span>
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
