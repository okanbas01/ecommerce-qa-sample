# E-Ticaret QA Örnek Çalışması – Playwright Regresyon Testleri

Herkese açık demo e-ticaret sitesi [automationexercise.com](https://automationexercise.com) üzerinde yaptığım test çalışmasının otomasyon kodu.

📄 **Test raporu, bug dökümü ve e-ticaret yönetim paneli test planı:** [QA-Test-Raporu-ve-Test-Plani.pdf](./QA-Test-Raporu-ve-Test-Plani.pdf)

## Özet

- 17 test senaryosu koşuldu: 11 geçti, 6 başarısız.
- 6 hata bulundu: 2 kritik, 2 yüksek, 1 orta, 1 düşük.
- Bu repodaki 13 otomasyon testi, bulunan hataların tamamını ve temel akışları kapsıyor.

## Bulunan hatalar

| ID | Önem | Hata | Test |
| --- | --- | --- | --- |
| BUG-01 | Kritik | Sepete negatif adetle (-5) ürün eklenebiliyor, toplam tutar eksiye düşüyor | TC-13 |
| BUG-02 | Kritik | Sunucu debug modunda; 404 sayfası admin dahil URL yapısını ifşa ediyor | TC-12 |
| BUG-03 | Yüksek | Var olmayan ürün ID'si boş ama "Stokta" görünen bir sayfa açıyor | TC-11 |
| BUG-04 | Yüksek | 0 adetle sepete ekleme "Added!" mesajıyla kabul ediliyor | TC-14 |
| BUG-05 | Orta | Arama fazladan boşlukları temizlemiyor, sonuçlar eksik geliyor | TC-06 |
| BUG-06 | Düşük | Sonuçsuz aramada kullanıcıya mesaj gösterilmiyor | TC-07 |

## Kapsam

| Alan | Testler | Neyi kontrol ediyor |
| --- | --- | --- |
| Arama | TC-01, 02, 04, 06, 07 | Büyük/küçük harf, script girişi, boşluklar, sonuçsuz arama |
| Katalog ve ürün detay | TC-08, 10, 11, 12 | Marka sayaçları, ürün bilgileri, 404 davranışı, debug sayfası |
| Sepet | TC-13, 14, 15, 16 | Negatif ve sıfır adet, adet birleştirme, ürün silme |

## Hatalar testlerde nasıl işaretlendi

Açık hatalara ait testler `test.fail()` ile işaretli. Bu testler doğru davranışı tanımlar ve hata var olduğu sürece "beklenen başarısızlık" olarak geçer. Hata düzeltildiğinde Playwright testi "beklenmedik şekilde geçti" diye raporlar. Bu, işaretin kaldırılıp testin kalıcı regresyon testi olarak tutulması gerektiğini gösterir.

## Çalıştırma

```bash
npm install
npx playwright install chromium
npx playwright test
npx playwright show-report
```

Hata anında ekran görüntüsü ve trace kaydı otomatik alınır; HTML rapordan adım adım incelenebilir.

## Proje yapısı

```
tests/
  fixtures.ts        # Reklamları engelleyen ortak test fixture'ı
  search.spec.ts     # Arama testleri
  catalog.spec.ts    # Katalog ve ürün detay testleri
  cart.spec.ts       # Sepet testleri
playwright.config.ts
```

## Hazırlayan

**Okan Baş** – QA Automation Engineer · [LinkedIn](https://www.linkedin.com/in/okannbas)
