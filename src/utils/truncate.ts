const truncate = (string: string, count: number) => {
  return string.length > 0 ? string.slice(0, count) + "..." : string;
};

export { truncate };
