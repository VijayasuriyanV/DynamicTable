import React, {useEffect, useState} from "react";
import type {Capsule} from "../types/types";
import {API_URL} from "../constants";
import SearchInput from "./SearchInput";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

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

  const capsuleKeys = capsules[0] ? (Object.keys(capsules[0]) as (keyof Capsule)[]) : [];

  return (
    <div className="mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">SpaceX Capsule Data</h2>
        <SearchInput value={searchQuery} onChange={handleSearchChange} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-md border border-gray-200">
          <TableHeader
            keys={capsuleKeys}
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
          <tbody>
            {sortedCapsules.length > 0 ? (
              sortedCapsules.map((capsule, index) => <TableRow key={index} capsule={capsule} />)
            ) : (
              <tr>
                <td colSpan={capsuleKeys.length} className="text-center px-4 py-6 text-gray-500">
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
