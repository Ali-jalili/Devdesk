/** @format */

import useCreateRequest from "@/app/hook/useCreateRequest";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function CreateRequest() {
  const { collectionId } = useParams<{ collectionId: string }>();

  type FormData = {
    name: string;
    method: string;
    url: string;
    headers: {
      key: string;
      value: string;
    }[];
    params: {
      key: string;
      value: string;
    }[];
    body: string;
    description: string;
  };

  const { register, control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      method: "GET",
      headers: [{ key: "", value: "" }],
      params: [{ key: "", value: "" }],
    },
  });

  const {
    fields: headerFields,
    append: appendHeader,
    remove: removeHeader,
  } = useFieldArray({
    control,
    name: "headers",
  });

  const {
    fields: paramFields,
    append: appendParam,
    remove: removeParam,
  } = useFieldArray({
    control,
    name: "params",
  });

  function convertKeyValueArrayToObject(
    items: { key: string; value: string }[],
  ) {
    const result: Record<string, string> = {};

    items.forEach((item) => {
      if (item.key) {
        result[item.key] = item.value;
      }
    });

    return result;
  }

  const { mutate, isPending } = useCreateRequest();

  function submitFormRequest(data: FormData) {
    const requestData = {
      name: data.name,
      method: data.method,
      url: data.url,

      headers: convertKeyValueArrayToObject(data.headers),

      params: convertKeyValueArrayToObject(data.params),

      body: data.body,

      description: data.description,

      collectionId: collectionId!,
    };
    mutate(requestData);
    console.log(requestData);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold">Create Request</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Define a new API request for this collection.
        </p>
      </div>

      <form onSubmit={handleSubmit(submitFormRequest)} className="space-y-8">
        {/* Request Info */}
        <section className="rounded-xl border border-border p-6">
          <h2 className="text-sm font-semibold">Request Information</h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Name</label>

              <input
                {...register("name", { required: true })}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm"
                placeholder="Get users"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
              <div>
                <label className="mb-2 block text-sm font-medium">Method</label>

                <select
                  {...register("method")}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm"
                >
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>PATCH</option>
                  <option>DELETE</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">URL</label>

                <input
                  {...register("url", { required: true })}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm"
                  placeholder="https://api.example.com/users"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Headers */}
        <section className="rounded-xl border border-border p-6">
          <h2 className="text-sm font-semibold">Headers</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add custom headers for this request.
          </p>

          <div className="mt-4 space-y-3">
            {headerFields.map((field, index) => (
              <div key={field.id} className="flex gap-3">
                <input
                  {...register(`headers.${index}.key`)}
                  placeholder="Key"
                  className="flex-1 rounded-lg border border-border px-3 py-2 text-sm"
                />

                <input
                  {...register(`headers.${index}.value`)}
                  placeholder="Value"
                  className="flex-1 rounded-lg border border-border px-3 py-2 text-sm"
                />

                <button
                  type="button"
                  onClick={() => removeHeader(index)}
                  className="rounded-lg px-3 text-sm text-red-500 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              appendHeader({
                key: "",
                value: "",
              })
            }
            className="mt-4 text-sm font-medium text-primary"
          >
            + Add Header
          </button>
        </section>

        {/* Params */}
        <section className="rounded-xl border border-border p-6">
          <h2 className="text-sm font-semibold">Query Parameters</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Parameters sent with the request URL.
          </p>

          <div className="mt-4 space-y-3">
            {paramFields.map((field, index) => (
              <div key={field.id} className="flex gap-3">
                <input
                  {...register(`params.${index}.key`)}
                  placeholder="Key"
                  className="flex-1 rounded-lg border border-border px-3 py-2 text-sm"
                />

                <input
                  {...register(`params.${index}.value`)}
                  placeholder="Value"
                  className="flex-1 rounded-lg border border-border px-3 py-2 text-sm"
                />

                <button
                  type="button"
                  onClick={() => removeParam(index)}
                  className="rounded-lg px-3 text-sm text-red-500 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              appendParam({
                key: "",
                value: "",
              })
            }
            className="mt-4 text-sm font-medium text-primary"
          >
            + Add Parameter
          </button>
        </section>

        {/* Body */}
        <section className="rounded-xl border border-border p-6">
          <h2 className="text-sm font-semibold">Body</h2>

          <textarea
            {...register("body")}
            rows={8}
            placeholder='{
  "email": "test@example.com"
}'
            className="mt-4 w-full rounded-lg border border-border px-3 py-2 text-sm font-mono"
          />
        </section>

        {/* Description */}
        <section className="rounded-xl border border-border p-6">
          <label className="text-sm font-semibold">Description</label>

          <input
            {...register("description")}
            className="mt-3 w-full rounded-lg border border-border px-3 py-2 text-sm"
            placeholder="Explain what this request does..."
          />
        </section>

        <div className="flex justify-end">
          <button
            disabled={isPending}
            type="submit"
            className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            {isPending ? " Creating..." : " Create Request"}
          </button>
        </div>
      </form>
    </div>
  );
}
