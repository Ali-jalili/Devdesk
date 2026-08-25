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

          <input
            {...register("method")}
            placeholder="Method"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />

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

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-3 font-semibold">Description</h3>

        <textarea
          {...register("description")}
          rows={3}
          className="w-full rounded-lg border border-border px-3 py-2 text-sm"
        />
      </div>

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
