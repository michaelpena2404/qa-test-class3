import { Page } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

//Configurar desktop para lighthouse
const desktopConfig = {
    extends: 'lighthouse:default',
    settings: {
    formFactor: 'desktop' as const,
    screenEmulation: {
      mobile: false,
      width: 1280,
      height: 720,
      deviceScaleRatio: 1,
      disabled: false,
    },
    emulatedUserAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
  },
};

export async function runLighthouse(
    page: Page,
    port: number | string,
    options:{name?:string} = {},

) {
 return await playAudit({
    page,
    port: typeof port === 'string' ? parseInt(port) : port,
    opts: {
        maxWaitForLoad: 120000,
    },
    thresholds: {
      performance: 0,
      accessibility: 0,
      'best-practices': 0,
      seo: 0,
    },
    reports: {
      formats: { json: true, html: true },
      name: options.name,
      directory: 'lighthouse-reports',
    },
    config: desktopConfig,
 });
}