import { test, expect } from './fixtures';

const results = (page) => page.locator('.productinfo');

test.describe('Arama', () => {
  test('TC-01 "top" araması ilgili ürünleri listeler', async ({ page }) => {
    await page.goto('/products?search=top');
    await expect(results(page)).toHaveCount(14);
  });

  test('TC-02 arama büyük/küçük harf duyarsızdır', async ({ page }) => {
    await page.goto('/products?search=TOP');
    await expect(results(page)).toHaveCount(14);
  });

  test('TC-04 arama kutusuna girilen script çalışmaz', async ({ page }) => {
    let dialogOpened = false;
    page.on('dialog', async (d) => { dialogOpened = true; await d.dismiss(); });
    await page.goto('/products?search=' + encodeURIComponent('<script>alert(1)</script>'));
    await expect(page.locator('.title.text-center')).toContainText('Searched Products');
    expect(dialogOpened).toBe(false);
  });

  test('TC-06 [BUG-05] fazladan boşluklar temizlenmeli', async ({ page }) => {
    test.fail(true, 'BUG-05: arama baştaki/sondaki ve çift boşlukları temizlemiyor');
    await page.goto('/products?search=' + encodeURIComponent(' top '));
    await expect(results(page)).toHaveCount(14);
    await page.goto('/products?search=' + encodeURIComponent('Blue  Top'));
    await expect(results(page)).toHaveCount(1);
  });

  test('TC-07 [BUG-06] sonuçsuz aramada mesaj gösterilmeli', async ({ page }) => {
    test.fail(true, 'BUG-06: sonuç yokken kullanıcıya mesaj gösterilmiyor');
    await page.goto('/products?search=xyznotexist');
    await expect(results(page)).toHaveCount(0);
    await expect(page.getByText(/no products found|bulunamadı/i)).toBeVisible({ timeout: 3_000 });
  });
});
