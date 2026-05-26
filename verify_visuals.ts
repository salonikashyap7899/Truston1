import { chromium } from 'playwright';
import fs from 'fs';

async function verify() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to a common desktop size
  await page.setViewportSize({ width: 1280, height: 800 });

  console.log('Navigating to homepage...');
  await page.goto('http://localhost:5173');

  // Wait for the intro screen and click explore if it exists
  try {
    const exploreButton = page.locator('button:has-text("EXPLORE WEBSITE")');
    if (await exploreButton.isVisible({ timeout: 5000 })) {
      console.log('Clicking Explore button...');
      await exploreButton.click();
      await page.waitForTimeout(2000); // Wait for transition
    }
  } catch (e) {
    console.log('No intro screen or explore button found.');
  }

  // Take screenshot of Prime Estate section
  console.log('Capturing Prime Estate section...');
  await page.evaluate(() => {
    const el = document.querySelector('section:has-text("Prime Estate")');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'prime_estate.png' });

  // Take screenshot of Gallery section
  console.log('Capturing Gallery section...');
  await page.evaluate(() => {
    const el = document.getElementById('gallery-section');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'gallery_section.png' });

  // Take screenshot of Why Truston section (Accordion)
  console.log('Capturing Why Truston section...');
  await page.evaluate(() => {
    const el = document.querySelector('section:has-text("The Truston Difference")');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'why_truston.png' });

  // Navigate to Architecture page
  console.log('Navigating to Architecture page...');
  await page.goto('http://localhost:5173/architecture-design');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'architecture_page.png', fullPage: true });

  await browser.close();
  console.log('Verification complete.');
}

verify().catch(console.error);
