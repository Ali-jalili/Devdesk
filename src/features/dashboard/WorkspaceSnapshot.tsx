/** @format */

export default function WorkspaceSnapshot() {
  return (
    <section
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <h2
        className="
          text-sm
          font-semibold
          text-slate-950
        "
      >
        Workspace Snapshot
      </h2>

      <div className="mt-5">
        <p
          className="
            text-xs
            text-slate-500
          "
        >
          Current workspace
        </p>

        <p
          className="
            mt-1
            text-lg
            font-semibold
            text-slate-950
          "
        >
          DevDesk API
        </p>

        <div
          className="
            mt-5
            space-y-2
            text-sm
            text-slate-600
          "
        >
          <p>Collections:</p>

          <ul
            className="
              list-disc
              pl-5
              text-slate-500
            "
          >
            <li>Authentication</li>
            <li>Products</li>
            <li>Orders</li>
          </ul>
        </div>

        <p
          className="
            mt-5
            text-xs
            text-slate-400
          "
        >
          Last activity: 2 hours ago
        </p>
      </div>
    </section>
  );
}
