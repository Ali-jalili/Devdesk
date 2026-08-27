/** @format */

export function convertKeyValueArrayToObject(
  items: {
    key: string;
    value: string;
  }[],
) {
  return items.reduce(
    (acc, item) => {
      if (item.key) {
        acc[item.key] = item.value;
      }

      return acc;
    },
    {} as Record<string, string>,
  );
}
