import { columnDelimiter, maxColWidth, adjColWidthThres } from "../Constants";
import * as XLSX from 'xlsx';

export function exportToExcel(data) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "data.xlsx");
}

export function modifyColWidth(width, col) {
  if (width > adjColWidthThres) {
    return maxColWidth;
  }
}

export function parseCSV(cur_instance, data) {
  let parseData = [];
  let lines = data.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] !== "") {
      let toPush = lines[i].split(columnDelimiter);
      toPush.forEach(
        (str) =>
          (str = str.replace(/^"|"$/g, "")) // Remove double quotes from string values
      );
      parseData.push(toPush);
    }
  }

  cur_instance.loadData(parseData);
}
