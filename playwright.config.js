// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // පරීක්ෂණ ගොනු ඇති ස්ථානය
  testDir: './tests',

  /* පරීක්ෂණ එකින් එක (Serial) ක්‍රියාත්මක වීමට workers 1 ක් ලෙස ලබා දිය යුතුය */
  /* මෙය බ්‍රවුසර් කිහිපයක් එකවර විවෘත වීම වළක්වයි */
  workers: 1,

  /* පරීක්ෂණ එකවර (Parallel) ක්‍රියාත්මක වීම අක්‍රිය කරයි */
  fullyParallel: false,

  /* පරීක්ෂණයක් අසාර්ථක වුවහොත් නැවත උත්සාහ කරන වාර ගණන */
  retries: 0,

  /* වාර්තා සකස් කරන ආකාරය */
  reporter: 'html',

  /* බ්‍රවුසරය සම්බන්ධ සැකසුම් */
  use: {
    /* බ්‍රවුසරය විවෘතව පෙන්වීමට false ලබා දෙන්න */
    headless: false,

    /* වෙබ් අඩවියේ මූලික ලිපිනය (විකල්ප) */
    baseURL: 'https://www.swifttranslator.com/',

    /* පරීක්ෂණයේදී වීඩියෝ හෝ screenshot ලබා ගැනීමට අවශ්‍ය නම් */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* තිරයේ ප්‍රමාණය */
    viewport: { width: 1280, height: 720 },
  },

  /* පරීක්ෂා කළ යුතු බ්‍රවුසර් වර්ග */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // ඔබට අවශ්‍ය නම් Firefox හෝ Safari මෙතැනට එක් කළ හැක
  ],
});