import type {Capsule, Mission} from "../types/types";

const RenderCell = (key: keyof Capsule, value: Capsule[keyof Capsule]) => {
  //
  if (key === "missions") {
    const missions = value as Mission[];
    if (missions.length === 0) return <span className="text-gray-500">No missions</span>;

    return (
      <div className="overflow-x-auto">
        <table className="text-xs w-full border border-gray-300 rounded shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1 border text-left">Name</th>
              <th className="px-2 py-1 border text-left">Flight</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((mission, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-2 py-1 border">{mission.name}</td>
                <td className="px-2 py-1 border">{mission.flight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  //
  if (key === "original_launch") {
    const isoString = value as string | null;
    const formatted = isoString
      ? new Date(isoString).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Asia/Kolkata",
        })
      : "Not launched";
    return <span className="text-gray-700 text-sm">{formatted}</span>;
  }

  //
  if (typeof value === "object" && value !== null) {
    return <span className="text-gray-700 text-sm break-all">{JSON.stringify(value)}</span>;
  }

  //
  return (
    <span className="text-gray-700 text-sm">
      {value === null || value === "" ? "N/A" : String(value)}
    </span>
  );
};

export default RenderCell;
