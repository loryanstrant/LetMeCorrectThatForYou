import { test, expect } from '@playwright/test';

test('renders all corrections and filters by letter', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.correction')).toHaveCount(17);
  await page.getByRole('button', { name: 'P', exact: true }).click();
  await expect(page.locator('.correction:visible')).toHaveCount(5);
  await expect(page.getByText('Showing 5')).toBeVisible();
  await expect(page.getByRole('button', { name: 'P', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('preserves exact casing and historical direct links', async ({ page }) => {
  await page.goto('/#copilot');
  const card = page.locator('#copilot');
  await expect(card).toBeVisible();
  await expect(card.getByRole('heading', { name: 'Copilot', exact: true })).toBeVisible();
  await expect(card.getByText('CoPilot', { exact: true })).toBeVisible();
  await expect(card).toHaveClass(/targeted/);
});

test('remains complete without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/#team');
  await expect(page.locator('.correction')).toHaveCount(17);
  await expect(page.locator('#team')).toBeVisible();
  await context.close();
});

test('has no horizontal overflow at 380px', async ({ page }) => {
  await page.setViewportSize({ width: 380, height: 800 });
  await page.goto('/');
  const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client);
});

test('links to The Rebrand Registry as part of the network', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'The “Get Your Story Straight” network' })).toBeVisible();
  const registry = page.getByRole('link', { name: /The Rebrand Registry/ });
  await expect(registry).toHaveAttribute('href', 'https://www.msrebrandregistry.com/');
  await expect(registry).toHaveAttribute('target', '_blank');
});

test('about and suggestion navigation are available', async ({ page }) => {
  await page.goto('/about/');
  await expect(page.getByRole('heading', { name: 'Correctness, delivered politely.' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Suggest a correction/ })).toHaveAttribute('href', /github\.com/);
});
