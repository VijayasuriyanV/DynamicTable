import React, {useEffect, useState} from "react";
import type {Capsule} from "../types/types";
import {API_URL} from "../constants";
import RenderCell from "./RenderCell";

const CapsuleTable: React.FC = () => {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortKey, setSortKey] = useState<keyof Capsule | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchCapsules();
  }, []);

  const fetchCapsules = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCapsules(data);
    } catch (error) {
      console.error("Error fetching capsules:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSort = (key: keyof Capsule) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredCapsules = capsules.filter((capsule) =>
    Object.values(capsule).some((value) => String(value).toLowerCase().includes(searchQuery))
  );

  const sortedCapsules = sortKey
    ? [...filteredCapsules].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (aVal == null) return 1;
        if (bVal == null) return -1;

        const aStr = typeof aVal === "string" ? aVal.toLowerCase() : aVal;
        const bStr = typeof bVal === "string" ? bVal.toLowerCase() : bVal;

        if (aStr < bStr) return sortOrder === "asc" ? -1 : 1;
        if (aStr > bStr) return sortOrder === "asc" ? 1 : -1;
        return 0;
      })
    : filteredCapsules;

  return (
    <div className=" mx-auto px-4 py-6 ">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 ">
        <h2 className="text-2xl font-semibold text-gray-800">SpaceX Capsule Data</h2>
        <input
          type="text"
          placeholder="Search Capsules..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-lg p-3 w-full sm:w-72 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-md border border-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              {capsules[0] &&
                Object.keys(capsules[0]).map((key) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key as keyof Capsule)}
                    className="px-4 py-3 text-left font-semibold tracking-wide text-sm capitalize whitespace-nowrap cursor-pointer select-none">
                    {key.replace(/_/g, " ")}
                    <span className="ml-1">
                      {sortKey === key ? (sortOrder === "asc" ? "🔼" : "🔽") : "⬍"}
                    </span>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {sortedCapsules.length > 0 ? (
              sortedCapsules.map((capsule, index) => (
                <tr key={index} className="hover:bg-indigo-50 border-b last:border-b-0">
                  {Object.entries(capsule).map(([key, value]) => (
                    <td
                      key={key}
                      className="px-4 py-3 text-sm text-gray-700 align-top whitespace-pre-wrap break-words max-w-xs">
                      {RenderCell(key as keyof Capsule, value)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={Object.keys(capsules[0] || {}).length}
                  className="text-center px-4 py-6 text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CapsuleTable;
