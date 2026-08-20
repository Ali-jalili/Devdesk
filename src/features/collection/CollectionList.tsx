/** @format */

type Collection = {
  id: string;
  name: string;
  description: string;
  workspace_id: string;
};

interface CollectionListProps {
  collections: Collection[];
}

function CollectionList({ collections }: CollectionListProps) {
  console.log(collections);

  return (
    <div>
      {" "}
      {collections.map((item) => (
        <div key={item.id}>
          {" "}
          <p> {item.name} </p>
          <p> {item.description} </p>
        </div>
      ))}{" "}
    </div>
  );
}

export default CollectionList;
