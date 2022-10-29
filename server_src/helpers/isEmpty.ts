const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    typeof value === "undefined" ||
    (typeof value === "string" && value.trim().length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
};

export default isEmpty;
