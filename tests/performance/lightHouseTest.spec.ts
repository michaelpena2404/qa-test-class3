import {test, expect, chromium , Browser, Page} from '@playwright/test';
import { runLighthouse } from '../../e2e-desing/utils/lightHouseUtils';

let browser: Browser;
let page: Page;
const port = 9222;

test.beforeEach( async () => {
    browser = await chromium.launch({
        args: [`--remote-debugging-port=${port}`],
    });
    page = await browser.newPage();
});

test.afterEach(async () => {
    await browser.close();
});

test('Lighthouse Performance Test Sauce Labs Login', async () => {
    const url = 'https://www.saucedemo.com/v1/';
    await page.goto(url);
    const report = await runLighthouse(page, port, {name: 'report-lighthouse-sauce-labs-login'});
    expect(report.lhr.categories.performance.score).toBeGreaterThan(0);
});

test('Lighthouse Performance Test Sauce Labs Home', async () => {
    const url = 'https://www.saucedemo.com/v1/';
    const username = 'standard_user';
    const password = 'secret_sauce';
    await page.goto(url);
    await page.locator('[data-test="username"]').fill(username);
    await page.locator('[data-test="password"]').fill(password);
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await expect(page.getByText('Products')).toBeVisible(); 
    const report = await runLighthouse(page, port, {name: 'report-lighthouse-sauce-labs-home'});
    expect(report.lhr.categories.performance.score).toBeGreaterThan(0);
});

test('Lighthouse Performance Test Sauce Labs Home simulate performance', async () => {
    const url = 'https://www.saucedemo.com/v1/';
    const username = 'performance_glitch_user';
    const password = 'secret_sauce';
    await page.goto(url);
    await page.locator('[data-test="username"]').fill(username);
    await page.locator('[data-test="password"]').fill(password);
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await expect(page.getByText('Products')).toBeVisible(); 
    const report = await runLighthouse(page, port, {name: 'report-lighthouse-sauce-labs-home-performance-glitch'});
    expect(report.lhr.categories.performance.score).toBeGreaterThan(0);
});
