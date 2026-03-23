/**
 * Helpers reutilizables para gestos mobile
 */

export async function scrollDown(driver) {
  const { width, height } = await driver.getWindowSize();
  await driver.touchAction([
    { action: 'press', x: Math.round(width / 2), y: Math.round(height * 0.7) },
    { action: 'moveTo', x: Math.round(width / 2), y: Math.round(height * 0.3) },
    { action: 'release' },
  ]);
}

export async function waitAndClick(element, timeout = 10000) {
  await element.waitForDisplayed({ timeout });
  await element.click();
}

export async function waitAndSetValue(element, value, timeout = 10000) {
  await element.waitForDisplayed({ timeout });
  await element.setValue(value);
}