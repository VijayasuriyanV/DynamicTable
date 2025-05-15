import React from "react";
import type {Capsule} from "../types/types";
import RenderCell from "./RenderCell";

interface TableRowProps {
  capsule: Capsule;
}

const TableRow: React.FC<TableRowProps> = ({capsule}) => (
  <tr className="hover:bg-indigo-50 border-b last:border-b-0">
    {Object.entries(capsule).map(([key, value]) => (
      <td
        key={key}
        className="px-4 py-3 text-sm text-gray-700 align-top whitespace-pre-wrap break-words max-w-xs">
        {RenderCell(key as keyof Capsule, value)}
      </td>
    ))}
  </tr>
);

export default TableRow;
