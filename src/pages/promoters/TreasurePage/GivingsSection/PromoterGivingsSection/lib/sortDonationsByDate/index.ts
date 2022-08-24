import { formatDate } from "lib/web3Helpers/timeStampFormatters";

export const paidDate = (date: string) =>
  date.split(" ")[0].split("-").reverse().join("/");

function sortDonationsByDate(donations: any) {
  const allDonations = donations
    ?.sort((a: any, b: any) => {
      const aTime = a.timestamp
        ? formatDate(a.timestamp).toString()
        : paidDate(a.paidDate);
      const bTime = b.timestamp
        ? formatDate(b.timestamp).toString()
        : paidDate(b.paidDate);

      const first = aTime.split("/").reverse().join("");
      const second = bTime.split("/").reverse().join("");
      // eslint-disable-next-line no-nested-ternary
      return first > second ? 1 : first <= second ? -1 : 0;
    })
    .reverse();
  return allDonations;
}

export default sortDonationsByDate;
