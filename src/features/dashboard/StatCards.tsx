/** @format */

const stats = [
  {
    title: "Workspaces",
    value: "3",
    description: "Active workspaces",
  },
  {
    title: "Collections",
    value: "12",
    description: "API collections",
  },
  {
    title: "Requests",
    value: "48",
    description: "Stored requests",
  },
  {
    title: "Environments",
    value: "5",
    description: "Configured environments",
  },
];

export default function StatCards() {
  return (
    <div
      className="
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {stats.map((item) => (
        <div
          key={item.title}
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-slate-500
            "
          >
            {item.title}
          </p>

          <p
            className="
              mt-3
              text-3xl
              font-bold
              text-slate-950
            "
          >
            {item.value}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-400
            "
          >
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
