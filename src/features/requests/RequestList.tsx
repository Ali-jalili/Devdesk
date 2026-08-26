/** @format */

import Loading from "@/ui/Loading";
import { useNavigate } from "react-router-dom";

type Request = {
  id: string;
  name: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  params: Record<string, string>;
  body: string;
  description: string;
  collection_id: string;
  created_at: string;
};

interface RequestListProps {
  data: Request[];
  workspaceId: string;
  collectionId: string;
}

export default function RequestList({
  data,
  workspaceId,
  collectionId,
}: RequestListProps) {
  const navigate = useNavigate();

  if (!data) return <Loading />;

  return (
    <div className="space-y-4">
      {data?.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
              {item.method.toUpperCase()}
            </span>

            <h3 className="font-semibold text-slate-900">{item.name}</h3>
          </div>

          <p className="mt-3 text-sm text-slate-600">{item.url}</p>

          {item.description && (
            <p className="mt-3 text-sm text-slate-500">{item.description}</p>
          )}

          <button
            onClick={() =>
              navigate(
                `/app/workspaces/${workspaceId}/collections/${collectionId}/requests/${item.id}`,
              )
            }
            type="button"
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            View Request
          </button>
        </div>
      ))}
    </div>
  );
}
