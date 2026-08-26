/** @format */

import RequestDeleteButton from "./RequestDeleteButton";

type Request = {
  id: string;
  name: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  params: Record<string, string>;
  body: string;
  description: string;
  example_request: string;
  example_response: string;
  notes: string;
  collection_id: string;
  created_at: string;
};

interface RequestViewProps {
  data: Request;
  onEdit: () => void;
  onDeleteSuccess: () => void;
}

export default function RequestView({
  data,
  onEdit,
  onDeleteSuccess,
}: RequestViewProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}

      <div className="rounded-xl border border-border p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {data.method.toUpperCase()}
              </span>

              <h1 className="text-xl font-semibold">{data.name}</h1>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">{data.url}</p>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Edit Request
          </button>
        </div>
      </div>

      {/* Headers */}

      <section className="rounded-xl border border-border p-6">
        <h2 className="font-semibold">Headers</h2>

        <div className="mt-4 space-y-2">
          {Object.entries(data.headers).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between rounded-lg bg-muted px-3 py-2 text-sm"
            >
              <span>{key}</span>

              <span className="text-muted-foreground">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Params */}

      <section className="rounded-xl border border-border p-6">
        <h2 className="font-semibold">Params</h2>

        <div className="mt-4 space-y-2">
          {Object.entries(data.params).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between rounded-lg bg-muted px-3 py-2 text-sm"
            >
              <span>{key}</span>

              <span className="text-muted-foreground">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}

      <section className="rounded-xl border border-border p-6">
        <h2 className="font-semibold">Body</h2>

        <pre className="mt-4 overflow-auto rounded-lg bg-muted p-4 text-sm">
          {data.body}
        </pre>
      </section>

      {/* Description */}

      <section className="rounded-xl border border-border p-6">
        <h2 className="font-semibold">Description</h2>

        <p className="mt-3 text-sm text-muted-foreground">
          {data.description || "No description"}
        </p>

        <h2 className="font-semibold">ExampleRequest</h2>

        <p className="mt-3 text-sm text-muted-foreground">
          {data.example_request || "No ExampleRequest"}
        </p>

        <h2 className="font-semibold">ExampleResponse</h2>

        <p className="mt-3 text-sm text-muted-foreground">
          {data.example_response || "No ExampleResponse"}
        </p>

        <h2 className="font-semibold">Notes</h2>

        <p className="mt-3 text-sm text-muted-foreground">
          {data.notes || "No Notes"}
        </p>
      </section>

      {/* Actions */}

      <div className="flex justify-end">
        <RequestDeleteButton requestId={data.id} onSuccess={onDeleteSuccess} />
      </div>
    </div>
  );
}
