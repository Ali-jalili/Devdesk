/** @format */

import useGetCollection from "@/app/hook/useGetCollection";
import { useParams } from "react-router-dom";

export default function CollectionDetail() {
  const { collectionId } = useParams<{ collectionId: string }>();

  const { data } = useGetCollection(collectionId);

  console.log(data);

  return <div>CollectionDetail:::{collectionId}</div>;
}
