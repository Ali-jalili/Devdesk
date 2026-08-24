/** @format */

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
      headers: [
        {
          key: "",
          value: "",
        },
      ],
      params: [
        {
          key: "",
          value: "",
        },
      ],
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

  async function submitFormRequest(data: FormData) {
    console.log(data);
    console.log(collectionId);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitFormRequest)}>
        <label>Name</label>
        <input
          {...register("name", {
            required: true,
          })}
        />

        <label>Method</label>
        <input
          {...register("method", {
            required: true,
          })}
        />

        <label>URL</label>
        <input
          {...register("url", {
            required: true,
          })}
        />

        <h3>Headers</h3>

        {headerFields.map((field, index) => (
          <div key={field.id}>
            <input {...register(`headers.${index}.key`)} placeholder="Key" />

            <input
              {...register(`headers.${index}.value`)}
              placeholder="Value"
            />

            <button type="button" onClick={() => removeHeader(index)}>
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

        <h3>Params</h3>

        {paramFields.map((field, index) => (
          <div key={field.id}>
            <input {...register(`params.${index}.key`)} placeholder="Key" />

            <input {...register(`params.${index}.value`)} placeholder="Value" />

            <button type="button" onClick={() => removeParam(index)}>
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

        <label>Body</label>
        <textarea {...register("body")} />

        <label>Description</label>
        <input {...register("description")} />

        <button type="submit">Create Request</button>
      </form>
    </div>
  );
}
