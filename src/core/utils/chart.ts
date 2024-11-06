
// export const colors = ["#60ACFC", "#32D3EB", "#5BC49F", "#FEB64D", "#FF7B7B", "#9287E7", "#27A1EA", "#4EBECD", "#9CDC82", "#FF9F69", "#E9668E", "#747BE1"];
export const colors = [
  "#62ABFA",
  "#3AB4E5",
  "#36D0F6",
  "#3AD2C3",
  "#58C59E",
  "#D3ED56",
  '#F5B959',
  '#F68371',
  '#FC7B7F',
  '#D461A6',
  "#8E88E8",
  '#686FD9',
];

export const colors_6 = [
  "#62ABFA",
  "#36D0F6",
  "#58C59E",
  '#F5B959',
  '#FC7B7F',
  "#8E88E8",
];

export function getColor(index: number, length: number) {
  if (length > 6) return colors[index % (colors.length)]
  else return colors_6[index % (colors_6.length)]
}

export function transparentize(color: string, opacity: number) {
  var alpha = opacity === undefined ? 0.5 : 1 - opacity;
  var r = parseInt(color.substring(1, 3), 16);
  var g = parseInt(color.substring(3, 5), 16);
  var b = parseInt(color.substring(5, 7), 16);
  return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
};
export const lineChartOptions: any = {
  responsive: true,
  cutout: "10%",
  plugins: {
    legend: {
      position: "bottom"
    },
  }
}