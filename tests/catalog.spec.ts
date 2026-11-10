import { test, expect } from './fixtures';

test.describe('Katalog ve ürün detay', () => {
  test('TC-08 marka sayaçları marka sayfasındaki ürün sayısıyla aynı', async ({ page }) => {
    await page.goto('/products');
    const links = page.locator('.brands-name a');
    const brands = await links.evaluateAll((els) =>
      els.map((a) => ({
        href: a.getAttribute('href')!,
        count: Number((a.textContent || '').match(/\((\d+)\)/)?.[1]),
      })),
    );
    expect(brands.length).toBeGreaterThan(0);
    for (const b of brands) {
      await page.goto(b.href);
      await expect(page.locator('.productinfo'), b.href).toHaveCount(b.count);
    }
  });

  test('TC-10 geçerli ürün detayı doğru bilgileri gösterir', async ({ page }) => {
    await page.goto('/product_details/1');
    const info = page.locator('.product-information');
    await expect(info.locator('h2')).toHaveText('Blue Top');
    await expect(info).toContainText('Rs. 500');
    await expect(info).toContainText('Women > Tops');
  });

  test('TC-11 [BUG-03] var olmayan ürün 404 dönmeli', async ({ page }) => {
    test.fail(true, 'BUG-03: var olmayan ürün 200 ile boş ama "In Stock" bir sayfa açıyor');
    const response = await page.goto('/product_details/99999');
    expect(response?.status()).toBe(404);
  });

  test('TC-12 [BUG-02] 404 sayfası teknik detay sızdırmamalı', async ({ page }) => {
    test.fail(true, 'BUG-02: Django debug sayfası URL kalıplarını gösteriyor');
    const response = await page.goto('/product_details/abc');
    expect(response?.status()).toBe(404);
    await expect(page.locator('body')).not.toContainText('URLconf');
  });
});
