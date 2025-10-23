# 🇹🇷 Türkiye Cumhuriyeti Kimlik Numarası (TCKN) Doğrulama Kütüphanesi

Bu proje, **T.C. Kimlik Numarası (TCKN)** doğrulaması için hazırlanmış, **SOLID prensiplerine uygun** bir JavaScript kütüphanesidir.  
Kod, özellikle **Tek Sorumluluk Prensibi (SRP)** gözetilerek modüler ve okunabilir şekilde yapılandırılmıştır.

---

## 🧠 Özellikler

- ✅ TCKN’nin yapısal geçerliliğini kontrol eder (11 hane, yalnızca rakam, “0” ile başlamama)
- ✅ 10. hane doğrulama algoritmasını uygular
- ✅ 11. hane doğrulama algoritmasını uygular
- ✅ SOLID prensiplerine uygun, modüler ve test edilebilir yapı

---

## 📦 Kullanım

Aşağıdaki kodu projenize dahil edip doğrudan kullanabilirsiniz.

```javascript
/**
 * @fileoverview Türkiye Cumhuriyeti Kimlik Numarası (TCKN) doğrulama fonksiyonları.
 * @author
 * Ferhat Cengiz
 * @version 2.0.1
 * @date 2025
 */

/**
 * TCKN'nin temel yapısal geçerlilik kurallarını kontrol eder.
 */
const _ferhatCengiz_temelYapıKontrol = (tckn) => {
    if (!/^\d{11}$/.test(tckn)) return false;
    if (tckn.startsWith('0')) return false;
    return true;
};

/**
 * 10. hane doğrulama algoritması.
 */
const _ferhatCengiz_haneOnKontrol = (haneler) => {
    const ilkDokuzHane = haneler.slice(0, 9);
    const haneOn = haneler[9];
    let tekHanelerToplam = 0, ciftHanelerToplam = 0;

    for (let i = 0; i < 9; i++) {
        if (i % 2 === 0) tekHanelerToplam += ilkDokuzHane[i];
        else ciftHanelerToplam += ilkDokuzHane[i];
    }

    const sonuc = (tekHanelerToplam * 7 - ciftHanelerToplam) % 10;
    const hesaplananHaneOn = sonuc < 0 ? sonuc + 10 : sonuc;

    return hesaplananHaneOn === haneOn;
};

/**
 * 11. hane doğrulama algoritması.
 */
const _ferhatCengiz_haneOnBirKontrol = (haneler) => {
    const ilkOnHaneToplam = haneler.slice(0, 10).reduce((toplam, hane) => toplam + hane, 0);
    const haneOnBir = haneler[10];
    const hesaplananHaneOnBir = ilkOnHaneToplam % 10;
    return hesaplananHaneOnBir === haneOnBir;
};

/**
 * Ana doğrulama fonksiyonu.
 */
function tcno_dogrula(tcno) {
    const tcknString = String(tcno).trim();
    if (!_ferhatCengiz_temelYapıKontrol(tcknString)) return false;
    const haneler = tcknString.split('').map(Number);
    if (!_ferhatCengiz_haneOnKontrol(haneler)) return false;
    if (!_ferhatCengiz_haneOnBirKontrol(haneler)) return false;
    return true;
}

// Örnek kullanım:
console.log(tcno_dogrula('10000000146')); // true (örnek geçerli TCKN)
