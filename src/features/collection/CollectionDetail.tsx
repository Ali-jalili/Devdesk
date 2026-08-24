/** @format */

import { useParams } from "react-router-dom";

export default function CollectionDetail() {
  const { collectionId } = useParams();

  return <div>CollectionDetail:::{collectionId}</div>;
}
