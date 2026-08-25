/** @format */

import { useForm, useFieldArray } from "react-hook-form";

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
}

 function RequestEditForm({
  data,
}: RequestEditFormProps) {
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

  function submitForm(data: FormData) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="space-y-5"
    >
      <input
        {...register("name")}
        className="w-full rounded-lg border p-2"
      />

      <input
        {...register("method")}
        className="w-full rounded-lg border p-2"
      />

      <input
        {...register("url")}
        className="w-full rounded-lg border p-2"
      />

      <div>
        <h3 className="mb-2 font-semibold">Headers</h3>

        {headerFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input
              {...register(`headers.${index}.key`)}
              placeholder="Key"
              className="rounded-lg border p-2"
            />

            <input
              {...register(`headers.${index}.value`)}
              placeholder="Value"
              className="rounded-lg border p-2"
            />

            <button
              type="button"
              onClick={() => removeHeader(index)}
            >
              Delete
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            appendHeader({
              key: "",
              value: "",
            })
          }
        >
          + Add Header
        </button>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Params</h3>

        {paramFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input
              {...register(`params.${index}.key`)}
              placeholder="Key"
              className="rounded-lg border p-2"
            />

            <input
              {...register(`params.${index}.value`)}
              placeholder="Value"
              className="rounded-lg border p-2"
            />

            <button
              type="button"
              onClick={() => removeParam(index)}
            >
              Delete
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() =>
            appendParam({
              key: "",
              value: "",
            })
          }
        >
          + Add Param
        </button>
      </div>

      <textarea
        {...register("body")}
        className="w-full rounded-lg border p-2"
      />

      <input
        {...register("description")}
        className="w-full rounded-lg border p-2"
      />

      <button
        type="submit"
        className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
      >
        Save Changes
      </button>
    </form>
  );
}

export default RequestEditForm