const { test, expect } = require('@playwright/test');
const path = require('path');
const xlsx = require('xlsx');

const EXCEL_PATH = path.join(__dirname, '..', 'Test_cases.xlsx');
const SHEET_INDEX = 0;

function readExcelCases() {
  const wb = xlsx.readFile(EXCEL_PATH);
  const ws = wb.Sheets[wb.SheetNames[SHEET_INDEX]];
  const range = xlsx.utils.decode_range(ws['!ref']);

  const cases = [];

  for (let r = 6; r <= range.e.r + 1; r++) {
    const tcid = ws[`A${r}`]?.v;
    if (!tcid || typeof tcid !== 'string') continue;

    const name = (ws[`B${r}`]?.v || '').toString().trim();
    const input = (ws[`D${r}`]?.v || '').toString();
    const expected = (ws[`E${r}`]?.v || '').toString();

    if (!input.trim()) continue;

    cases.push({
      id: tcid.trim(),
      name: name || 'Unnamed',
      input,
      expected,
    });
  }
  return cases;
}

const cases = readExcelCases();

test.describe('SwiftTranslator – Excel Driven Tests', () => {

  // ------------------------------
  // Functional tests (Pos_Fun / Neg_Fun)
  // ------------------------------
  for (const tc of cases.filter(c => /_(Fun)_/.test(c.id))) {
    test(`${tc.id} - ${tc.name}`, async ({ page }) => {
      await page.goto('https://www.swifttranslator.com/');

      // Singlish input
      const inputBox = page.getByRole('textbox', {
        name: 'Input Your Singlish Text Here.'
      });
      await inputBox.fill(tc.input);

      // Sinhala output panel
      const sinhalaPanel = page.locator('div', { hasText: 'Sinhala' }).first();

      // Wait for conversion
      await expect(sinhalaPanel).not.toHaveText(/^\s*Sinhala\s*$/i, {
        timeout: 20000
      });

      // Expected Sinhala match check
      await expect(sinhalaPanel).toContainText(
        tc.expected.trim(),
        { timeout: 20000 }
      );
    });
  }

  // ------------------------------
  // UI Test – Pos_UI_0001
  // ------------------------------
  const uiCase = cases.find(c => c.id === 'Neg_UI_0001');

  if (uiCase) {
    test(`${uiCase.id} - Real-time Sinhala output update`, async ({ page }) => {
      await page.goto('https://www.swifttranslator.com/');

      const inputBox = page.getByRole('textbox', {
        name: 'Input Your Singlish Text Here.'
      });

      const sinhalaPanel = page.locator('div', { hasText: 'Sinhala' }).first();

      // Type gradually (real-time behaviour)
      await inputBox.type(uiCase.input, { delay: 150 });

      // Output should update while typing (not after submit)
      await expect(sinhalaPanel).toContainText(
        uiCase.expected.trim(),
        { timeout: 20000 }
      );
    });
  }
});
