/** @format */

import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import useUpdateRequest from "@/app/hook/useUpdateRequest";
import { convertKeyValueArrayToObject } from "@/utils/convertKeyValueArrayToObject";

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
  example_request: string;
  example_response: string;
  notes: string;
};

interface RequestEditFormProps {
  data: {
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
  };

  onSuccess: () => void;
  onCancel: () => void;
}

export default function RequestEditForm({
  data,
  onSuccess,
  onCancel,
}: RequestEditFormProps) {
  const { requestId } = useParams();

  const { mutate, isPending } = useUpdateRequest();

  const { register, control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: data.name,
      method: data.method,
      url: data.url,
      headers: Object.entries(data.headers).map(([key, value]) => ({
        key,
        value,
      })),
      params: Object.entries(data.params).map(([key, value]) => ({
        key,
        value,
      })),
      body: data.body,
      description: data.description,
      example_request: data.example_request,
      example_response: data.example_response,
      notes: data.notes,
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

  function submitForm(formData: FormData) {
    if (!requestId) return;

    const requestData = {
      name: formData.name,
      method: formData.method,
      url: formData.url,
      headers: convertKeyValueArrayToObject(formData.headers),
      params: convertKeyValueArrayToObject(formData.params),
      body: formData.body,
      description: formData.description,
      example_request: formData.example_request,
      example_response: formData.example_response,
      notes: formData.notes,
    };

    mutate(
      {
        requestId,
        data: requestData,
      },
      {
        onSuccess() {
          toast.success("Request updated successfully");
          onSuccess();
        },

        onError(error) {
          toast.error(error.message);
        },
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="mx-auto max-w-4xl space-y-6"
    >
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-5 text-lg font-semibold">Edit Request</h2>

        <div className="space-y-4">
          <input
            {...register("name")}
            placeholder="Request name"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />

          <select
            {...register("method")}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>

          <input
            {...register("url")}
            placeholder="URL"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Headers</h3>

          <button
            type="button"
            onClick={() =>
              appendHeader({
                key: "",
                value: "",
              })
            }
            className="text-sm font-medium text-primary"
          >
            + Add Header
          </button>
        </div>

        <div className="space-y-3">
          {headerFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
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
                className="rounded-lg px-3 text-sm text-destructive hover:bg-muted"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Params</h3>

          <button
            type="button"
            onClick={() =>
              appendParam({
                key: "",
                value: "",
              })
            }
            className="text-sm font-medium text-primary"
          >
            + Add Param
          </button>
        </div>

        <div className="space-y-3">
          {paramFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
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
                className="rounded-lg px-3 text-sm text-destructive hover:bg-muted"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-3 font-semibold">Body</h3>

        <textarea
          {...register("body")}
          rows={8}
          className="w-full rounded-lg border border-border px-3 py-2 text-sm"
        />
      </div>

      {/* Documentation */}
      <section className="rounded-xl border border-border p-6">
        <div>
          <h2 className="text-sm font-semibold">Documentation</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add information to help other developers understand this endpoint.
          </p>
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <label className="text-sm font-medium">Description</label>

            <textarea
              {...register("description")}
              rows={3}
              className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm"
              placeholder="Explain what this request does..."
            />
          </div>

          <div>
            <label className="text-sm font-medium">Example Request</label>

            <textarea
              {...register("example_request")}
              rows={6}
              className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm font-mono"
              placeholder={`{
  "email": "user@example.com",
  "password": "123456"
}`}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Example Response</label>

            <textarea
              {...register("example_response")}
              rows={6}
              className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm font-mono"
              placeholder={`{
  "token": "abc123",
  "user": {}
}`}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Notes</label>

            <textarea
              {...register("notes")}
              rows={3}
              className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm"
              placeholder="Add important notes about this endpoint..."
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-border px-5 py-2 text-sm font-medium hover:bg-muted"
        >
          Cancel
        </button>

        <button
          disabled={isPending}
          type="submit"
          className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
