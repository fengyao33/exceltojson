import xlsx from 'xlsx';
import { promises as fs } from 'fs';

// 讀取 Excel 文件
const workbook = xlsx.readFile('01.xlsx');

// 選擇第一個工作表
const sheet_name_list = workbook.SheetNames;
const first_sheet_name = sheet_name_list[0];
const worksheet = workbook.Sheets[first_sheet_name];

// 將工作表轉換為 JSON
const json_data = xlsx.utils.sheet_to_json(worksheet);

// 轉換格式
const formatted_data = json_data.map((item) => {
  return {
    text: item.q,
    select: [
      { id: 'a', text: item.a.toString(), choiceed: false },
      { id: 'b', text: item.b.toString(), choiceed: false },
      { id: 'c', text: item.c.toString(), choiceed: false },
      { id: 'd', text: item.d.toString(), choiceed: false }
    ],
    correct: item.aa.toLowerCase(),
    finish: false,
    choiced: ""
  };
});

// 將格式化的 JSON 數據寫入文件
try {
  await fs.writeFile('output.json', JSON.stringify(formatted_data, null, 2));
  console.log('JSON 文件已成功保存！');
} catch (err) {
  console.error('寫入 JSON 文件時出錯：', err);
}