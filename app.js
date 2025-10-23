/**
 * @fileoverview Türkiye Cumhuriyeti Kimlik Numarası (TCKN) doğrulama fonksiyonları.
 *
 * Kod, SOLID prensiplerine uygun olarak, özellikle Tek Sorumluluk Prensibi (SRP)
 * gözetilerek yeniden yapılandırılmıştır. Tüm fonksiyonlar global erişim için
 * tanımlanmıştır.
 *
 * @author Ferhat Cengiz
 * @version 2.0.1
 * @date 2025
 */

/**
 * TCKN'nin temel yapısal geçerlilik kurallarını (uzunluk, sadece rakam, '0' ile başlamama) kontrol eder.
 * @param {string} tckn Kontrol edilecek TC Kimlik Numarası (string olarak).
 * @returns {boolean} Temel kurallara uyuyorsa true, aksi halde false.
 * @private
 */
const _ferhatCengiz_temelYapıKontrol = (tckn) => {
    if (!/^\d{11}$/.test(tckn)) return false;
    if (tckn.startsWith('0')) return false;
    return true;
};

/**
 * TCKN'nin 10. hanesini kontrol eden matematiksel kuralı uygular.
 * Kontrol: (Tek haneler (1, 3, 5, 7, 9) toplamının 7 katı - Çift haneler (2, 4, 6, 8) toplamı) mod 10 = 10. hane.
 * @param {number[]} haneler TCKN'nin 11 hanesini içeren sayı dizisi.
 * @returns {boolean} 10. hane kuralı geçerliyse true, aksi halde false.
 * @private
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
 * TCKN'nin 11. hanesini kontrol eden matematiksel kuralı uygular.
 * Kontrol: İlk 10 hanenin toplamı mod 10 = 11. hane.
 * @param {number[]} haneler TCKN'nin 11 hanesini içeren sayı dizisi.
 * @returns {boolean} 11. hane kuralı geçerliyse true, aksi halde false.
 * @private
 */
const _ferhatCengiz_haneOnBirKontrol = (haneler) => {
    const ilkOnHaneToplam = haneler.slice(0, 10).reduce((toplam, hane) => toplam + hane, 0);
    const haneOnBir = haneler[10];
    const hesaplananHaneOnBir = ilkOnHaneToplam % 10;
    return hesaplananHaneOnBir === haneOnBir;
};

/**
 * Türkiye Cumhuriyeti Kimlik Numarası (TCKN) geçerliliğini kontrol eden ana fonksiyon.
 * @public
 * @param {string | number} tcno Kontrol edilecek T.C. Kimlik Numarası.
 * @returns {boolean} TCKN geçerliyse true, aksi halde false.
 * @author Ferhat Cengiz
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
// console.log(tcno_dogrula('10000000146')); // true olmalı (geçerli örnek TCKN)
