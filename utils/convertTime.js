export default function Convert(date) {
  let convert = new Date(date);
  let formattedDate = convert.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formattedDate;
}
