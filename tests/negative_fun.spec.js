import { test, expect } from '@playwright/test';

test.describe('Singlish to Sinhala - 10 Negative Functional Tests', () => {

    test.beforeEach(async ({ page }) => {
        // සෑම ටෙස්ට් එකකටම පෙර වෙබ් අඩවියට පිවිසීම
        await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
    });

    async function verifyNegativeTranslation(page, inputSinglish, expectedOutput) {
        const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
        const outputElement = page.locator('div').filter({ hasText: /^Sinhala$/ }).locator('..').locator('div').nth(1);

        await inputArea.clear();
        await inputArea.pressSequentially(inputSinglish, { delay: 50 });

        await expect(async () => {
            const actualText = await outputElement.innerText();
            // Negative tests වලදී අප බලාපොරොත්තු වන්නේ පද්ධතිය අදාළ වචනය පරිවර්තනය නොකර තබා ගැනීම හෝ දෝෂ සහිතව පෙන්වීමයි
            expect(actualText.trim()).toBe(expectedOutput);
        }).toPass({ timeout: 10000 });
    }

    // --- 10 NEGATIVE TEST CASES ---

    test('Neg_Fun_0001: Empty input handling', async ({ page }) => {
        const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
        const outputElement = page.locator('div').filter({ hasText: /^Sinhala$/ }).locator('..').locator('div').nth(1);
        await inputArea.clear();
        // කිසිවක් ටයිප් නොකළ විට අවුට්පුට් එක හිස් විය යුතුය
        await expect(outputElement).toBeEmpty();
    });

    test('Neg_Fun_0002: PastTense', async ({ page }) => {
        // තේරුමක් නැති අකුරු පෙළක් දුන් විට එය එලෙසම ඉතිරි වේදැයි බැලීම
        await verifyNegativeTranslation(page, 'api iiyee udheema nuwara eliya trip ekak giyaa.', 'අපි ඊයේ උදේම නුවර එලිය trip එකක් ගියා.');
    });

    test('Neg_Fun_0003: Chat_Shorthand', async ({ page }) => {
        // වැරදි විදිහට ටයිප් කළ වචනයක් (උදා: 'kaeema' වෙනුවට 'kmaa')
        await verifyNegativeTranslation(page, 'thx machan.', 'thanks මචන්.'); 
    });

    test('Neg_Fun_0004: mail_Glitch', async ({ page }) => {
        // 'Thx' වැනි කෙටි යෙදුම් සිංහලට හැරවීමට පද්ධතිය අසමත් විය හැක
        await verifyNegativeTranslation(page, 'email eka gpasindu47@gmail.com ekata yavanna!', 'email එක gpasindu47@gmail.com එකට යවන්න!');
    });

    test('Neg_Fun_0005: Stress_No_Spaces', async ({ page }) => {
        // සංකේත පමණක් ලබා දුන් විට ඒවා වෙනස් නොවිය යුතුය
        await verifyNegativeTranslation(page, 'mamaanuradhapurayanavaa.', 'මමanuradhapuraයනවා.');
    });

    test('Neg_Fun_0006: URL_Path_Corruption', async ({ page }) => {
        // වෙනත් භාෂාවක වචනයක් Singlish ලෙස දුන් විට සිදුවන දේ
        await verifyNegativeTranslation(page, 'http://test.com/path.', 'http://test.com/path.'); 
    });

    test('Neg_Fun_0007: Abbrev_Full_Stop', async ({ page }) => {
        // ඉතා දිගු තනි වචනයක් දුන් විට පද්ධතියේ හැසිරීම
        await verifyNegativeTranslation(page, 'mama u.S.A yanavaa.','මම U.S.A යනවා.');
    });

    test('Neg_Fun_0008: Case_Sensitivity_Error', async ({ page }) => {
        // අංක පමණක් දුන් විට ඒවා සිංහල ඉලක්කම් වලට හැරෙන්නේ නැති බව තහවුරු කිරීම
        await verifyNegativeTranslation(page, 'MAMA gedhara YANAVA.', 'මම ගෙදර යනවා');
    });

    test('Neg_Fun_0009: Multi_Symbol_Stress', async ({ page }) => {
        // සමහර ඉංග්‍රීසි වචන (උදා: 'the') සිංහල අකුරෙන් ලියවුණත් තේරුමක් නැත
        await verifyNegativeTranslation(page, '!@#$%^&*()_+', '!@#$%^&*()_+');
    });

    test('Neg_Fun_0010: Mid_Word_Case_Clash', async ({ page }) => {
        // Code tags ලබා දී පද්ධතිය ආරක්ෂිතදැයි බැලීම (Security/Negative focus)
        await verifyNegativeTranslation(page, 'mama panSALATA yanavaa.', 'මම පන්සලට යනවා.');
    });

});