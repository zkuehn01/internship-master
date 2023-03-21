import * as XLSX from 'xlsx';
import { maxColWidth } from './Constants';

export function exportBtnSetup(hotTableComponent) {
  let btn = document.getElementById('export-file');
  const cur_instance = hotTableComponent.current.hotInstance;

  const exportFunction = function () {
    const data = cur_instance.getData();
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "internships.xlsx", {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
      cellStyles: true,
      cellDates: true,
      columnStyles: [{
        width: maxColWidth,
        format: "@"
      }],
      defaultCellStyle: {
        font: { name: "Arial", sz: 10 },
        alignment: {
          horizontal: "center",
          vertical: "middle"
        }
      }
    });
    
    btn.disabled = true;
    setTimeout(function() {
      btn.disabled = false;
    }, 1000);
    
    btn.removeEventListener('click', exportFunction);
  };

  btn.addEventListener('click', exportFunction, { once: true });
}
