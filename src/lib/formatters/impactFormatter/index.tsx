import parse from "html-react-parser";

export function formatImpact(formattedImpact: string[]) {
  return parse(
    `<b>${formattedImpact[0]}</b> ${formattedImpact[1]} <b>${formattedImpact[2]}</b>`,
  );
}
