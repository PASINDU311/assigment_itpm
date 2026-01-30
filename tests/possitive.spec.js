import { test, expect } from '@playwright/test';

test.describe('Singlish to Sinhala - 24 Positive Functional Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
    });

    async function verifyTranslation(page, inputSinglish, expectedSinhala) {
        const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
        const outputElement = page.locator('div').filter({ hasText: /^Sinhala$/ }).locator('..').locator('div').nth(1);
        await inputArea.clear();
        await inputArea.pressSequentially(inputSinglish, { delay: 10 });
        await expect(async () => {
            const actualText = await outputElement.innerText();
            expect(actualText.trim()).toBe(expectedSinhala);
        }).toPass({ timeout: 15000 });
    }

    test('Pos_Fun_0001: Simple sentences', async ({ page }) => {
        await verifyTranslation(page, 'apee nangi adha udheema aluth sindhu kiyanavaa.', 'අපේ නන්ගි අද උදේම අලුත් සින්දු කියනවා.');
    });

    test('Pos_Fun_0002: Compound sentences', async ({ page }) => {
        await verifyTranslation(page, 'mama gedhara yanavaa, haebaeyi vahina nisaa bus ekee yannee.', 'මම ගෙදර යනවා, හැබැයි වහින නිසා bus එකේ යන්නේ.');
    });

    test('Pos_Fun_0003: Long inputs (Long Text)', async ({ page }) => {
        const longInput = 'shrii lankaavee viviDha pradheesha vala thiyena dharshaniiya sThaana balanna godak vidheeshikayoo lankaavata enavaa. eeth eegollanta godak velaavata thiyena prashnaya thamayi hariyata maarga upadheeshakayek naethikamayi. api meeka gaena hithalaa aluth vidhihata hithuvoth lankaavee tourism thavath dhiyuNu karanna puluvanveyi kiyala mama hithanavaa.';
        const longExpected = 'ශ්‍රී ලන්කාවේ විවිධ ප්‍රදේශ වල තියෙන දර්ශනීය ස්ථාන බලන්න ගොඩක් විදේශිකයෝ ලන්කාවට එනවා. ඒත් ඒගොල්ලන්ට ගොඩක් වෙලාවට තියෙන ප්‍රශ්නය තමයි හරියට මාර්ග උපදේශකයෙක් නැතිකමයි. අපි මේක ගැන හිතලා අලුත් විදිහට හිතුවොත් ලන්කාවේ tourism තවත් දියුණු කරන්න පුලුවන්වෙයි කියල මම හිතනවා.';
        await verifyTranslation(page, longInput, longExpected);
    });

    test('Pos_Fun_0004: Complex sentences', async ({ page }) => {
        await verifyTranslation(page, 'oyaa heta udheema enavaanam mama balan innavaa.', 'ඔයා හෙට උදේම එනවානම් මම බලන් ඉන්නවා.');
    });

    test('Pos_Fun_0005:  Interrogative (questions) ', async ({ page }) => {
        await verifyTranslation(page, 'oyaagee aluth laptop ekee battery eka check karalaa baeluvadha?', 'ඔයාගේ අලුත් laptop එකේ battery එක check කරලා බැලුවද?');
    });

    test('Pos_Fun_0006: Imperative (commands)', async ({ page }) => {
        await verifyTranslation(page, 'vahaama methanata aevith meyaata eeka dhenna', 'වහාම මෙතනට ඇවිත් මෙයාට ඒක දෙන්න');
    });

    test('Pos_Fun_0007: Negative forms', async ({ page }) => {
        await verifyTranslation(page, 'mama adha udhee office giyee naehae vaessa nisaa. ', 'මම අද උදේ office ගියේ නැහැ වැස්ස නිසා. ');
    });

    test('Pos_Fun_0008: Requests', async ({ page }) => {
        await verifyTranslation(page, 'karuNaakarala magee mail eka poddak check karala balanna.', 'කරුණාකරල මගේ mail එක පොඩ්ඩක් check කරල බලන්න.');
    });

    test('Pos_Fun_0009:   Informal phrasing', async ({ page }) => {
        await verifyTranslation(page, 'adoo machan,  meeka niyamayi supirii !!', 'අඩෝ මචන්,  මේක නියමයි සුපිරී !!');
    });

    test('Pos_Fun_0010: Frequently used day-to-day expressions', async ({ page }) => {
        await verifyTranslation(page, 'mata adha godak nidhimathayi api passe kaeema kamu.', 'මට අද ගොඩක් නිදිමතයි අපි පස්සෙ කෑම කමු.');
    });

    test('Pos_Fun_0011:Multi-word expressions', async ({ page }) => {
        await verifyTranslation(page, 'mata oona oyaagee udhavva meeka hariyata karanna.', 'මට ඕන ඔයාගේ උදව්ව මේක හරියට කරන්න.');
    });

    test('Pos_Fun_0012: Spaces', async ({ page }) => {
        await verifyTranslation(page, 'api heta kandy yamu.', 'අපි හෙට kandy යමු.');
    });

    test('Pos_Fun_0013: Repeated word expressions', async ({ page }) => {
        await verifyTranslation(page, 'hari hari , eka eka prashNa dhaen thiyanavaa.', 'හරි හරි , එක එක ප්‍රශ්ණ දැන් තියනවා.');
    });

    test('Pos_Fun_0014: PastTense', async ({ page }) => {
        await verifyTranslation(page, 'api iiyee udheema padam karaa.', 'අපි ඊයේ උදේම පඩම් කරා.');
    });

    test('Pos_Fun_0015: FutureTense', async ({ page }) => {
        await verifyTranslation(page, 'api iiLaGA sathiyee aluth office ekata yamu.', 'අපි ඊළඟ සතියේ අලුත් office එකට යමු.');
    });

    test('Pos_Fun_0016: Negation patterns', async ({ page }) => {
        await verifyTranslation(page, 'mama eeka dhannee naee saha karanna baee.', 'මම ඒක දන්නේ නෑ සහ කරන්න බෑ.');
    });

    test('Pos_Fun_0017:  Singular/plural usage', async ({ page }) => {
        await verifyTranslation(page, 'Lamayi dhennama sellam karanavaa sahaa sindhu kiyanavaa.', 'ළමයි දෙන්නම සෙල්ලම් කරනවා සහා සින්දු කියනවා.');
    });

    test('Pos_Fun_0018:  English technical/brand terms embedded in Singlish ', async ({ page }) => {
        await verifyTranslation(page, 'zoom meeting ekee link eka whatsApp karanna.', 'zoom meeting එකේ link එක whatsApp කරන්න.');
    });

    test('Pos_Fun_0019: common English words', async ({ page }) => {
        await verifyTranslation(page, 'nimaali office enna parakku vennee traffic nisaa.', 'නිමාලි office එන්න පරක්කු වෙන්නේ traffic නිසා.');
    });

    test('Pos_Fun_0020: English abbreviations', async ({ page }) => {
        await verifyTranslation(page, 'magee NIC sahaa ID card eka scan karalaa evanna.', 'මගේ NIC සහා ID card එක scan කරලා එවන්න.');
    });

    test('Pos_Fun_0021: Currency', async ({ page }) => {
        await verifyTranslation(page, 'mila kiiyadha? ( Rs.5500 /- vagee veyi ! )', 'මිල කීයද? ( Rs.5500 /- වගේ වෙයි ! )');
    });

    test('Pos_Fun_0022:  Time and date formats', async ({ page }) => {
        await verifyTranslation(page, 'meeting eka 10.30 AM ta 2026-05-21 dhinayata thiyennee.', 'meeting එක 10.30 AM ට 2026-05-21 දිනයට තියෙන්නේ.');
    });

    test('Pos_Fun_0023: Units of measurements', async ({ page }) => {
        await verifyTranslation(page, 'mata 5kg siini sahaa 500ml kiri dhenna.', 'මට 5kg සීනි සහා 500ml කිරි දෙන්න.');
    });

    test('Pos_Fun_0024: paragraph inputs', async ({ page }) => {
        await verifyTranslation(page, '(test) "mama naanna yanavaa. ita passee api photo gamu."', '(test) "මම නාන්න යනවා. ඉට පස්සේ අපි photo ගමු."');
    });
});