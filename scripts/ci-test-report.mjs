// Surface Playwright's failure messages as GitHub annotations when CI logs are unavailable.
import { readFileSync } from 'node:fs';
const report = JSON.parse(readFileSync('/tmp/guidesoft-playwright.json', 'utf8'));
function reportSuite(suite) {
  for (const spec of suite.specs ?? []) {
    for (const test of spec.tests ?? []) {
      for (const result of test.results ?? []) {
        for (const error of result.errors ?? []) {
          const message = `${spec.title}: ${error.message ?? 'Test failed'}`
            .replace(/\x1b\[[0-9;]*m/g, '')
            .replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
          console.log(`::error::${message}`);
        }
      }
    }
  }
  for (const child of suite.suites ?? []) reportSuite(child);
}
for (const suite of report.suites ?? []) reportSuite(suite);
