/** @format */

import useGetWorkspaces from "./useWorkspaces";

export default function Workspaces() {
  const { data, isLoading, error } = useGetWorkspaces();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return data?.map((item) => <div key={item.id}> {item.name} </div>);
}
