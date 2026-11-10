import { test, expect } from './fixtures';
import type { Page } from '@playwright/test';

// Clicks "Add to cart" and waits until the background request has finished,
// otherwise navigating to the cart too early can cancel it.
async function clickAddToCart(page: Page, productId: number, quantity: string) {
  await page.goto(`/product_details/${productId}`);
  await page.locator('#quantity').fill(quantity);
  await page.locator('.product-information button.cart').click();
  await page.waitForLoadState('networkidle');
}

async function addToCart(page: Page, productId: number, quantity: string) {
  await clickAddToCart(page, productId, quantity);
  await expect(page.locator('#cartModal')).toContainText('Added!');
}

const cartRows = (page: Page) => page.locator('#cart_info_table tbody tr');

test.describe('Sepet', () => {
  test('TC-13 [BUG-01] negatif adet sepete eklenmemeli', async ({ page }) => {
    test.fail(true, 'BUG-01: -5 adet sepete ekleniyor, toplam Rs. -2500 oluyor');
    await clickAddToCart(page, 1, '-5');
    await page.goto('/view_cart');
    await expect(cartRows(page)).toHaveCount(0);
  });

  test('TC-14 [BUG-04] 0 adet sepete eklenmemeli', async ({ page }) => {
    test.fail(true, 'BUG-04: 0 adet "Added!" mesajıyla kabul ediliyor');
    await clickAddToCart(page, 2, '0');
    await page.goto('/view_cart');
    await expect(cartRows(page)).toHaveCount(0);
  });

  test('TC-15 aynı ürün tekrar eklenince adetler toplanır', async ({ page }) => {
    await addToCart(page, 2, '1');
    await addToCart(page, 2, '2');
    await page.goto('/view_cart');
    await expect(cartRows(page)).toHaveCount(1);
    await expect(cartRows(page).first()).toContainText('Rs. 1200');
  });

  test('TC-16 sepetten ürün silinince sepet boş mesajı görünür', async ({ page }) => {
    await addToCart(page, 1, '1');
    await page.goto('/view_cart');
    await expect(cartRows(page)).toHaveCount(1);
    await page.locator('.cart_quantity_delete').first().click();
    await expect(page.locator('#empty_cart')).toBeVisible();
  });
});
