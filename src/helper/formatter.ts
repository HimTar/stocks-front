export const formatNumber = (num: number | null | undefined) => {
  if (num) return parseFloat(num.toFixed(2)).toLocaleString();

  return 0;
};

export const formatDate = (date: string | null | undefined) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};
