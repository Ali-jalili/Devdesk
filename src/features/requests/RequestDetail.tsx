/** @format */

import useGetRequest from "@/app/hook/useGetRequest";
import { useParams } from "react-router-dom";

export default function RequestDetail() {
  const { requestId } = useParams();

  const { data, isLoading } = useGetRequest(requestId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Request not found</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-border p-6">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {data.method.toUpperCase()}
          </span>

          <h1 className="text-xl font-semibold">{data.name}</h1>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{data.url}</p>
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
      </section>
    </div>
  );
}
