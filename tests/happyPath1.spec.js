import { waitAndClick } from '../helpers/gestures.js';

/**
 * Happy Path 1 — Navegación y verificación de la pantalla principal
 * Valida que la app carga correctamente y que se puede navegar
 * a la sección de formulario de entrada de texto.
 */
describe('Happy Path 1 — Navegación a Text Input', () => {

  it('debe abrir la app y navegar a Text Input', async () => {
    // Esperar que la app cargue completamente
    await driver.pause(3000);

    // Buscar el elemento de Text Input en la pantalla principal
    const textInputBtn = await $('android=new UiSelector().text("Text Input")');
    await textInputBtn.waitForDisplayed({ timeout: 15000 });
    await textInputBtn.click();

    await driver.pause(1500);

    // Verificar que llegamos a la pantalla de Text Input
    const inputField = await $('android=new UiSelector().className("android.widget.EditText")');
    const isDisplayed = await inputField.isDisplayed();
    expect(isDisplayed).toBe(true);
  });

  it('debe escribir texto y verificar que aparece en pantalla', async () => {
    const inputField = await $('android=new UiSelector().className("android.widget.EditText")');
    await inputField.waitForDisplayed({ timeout: 10000 });

    await inputField.setValue('Leo QA Automation');
    await driver.pause(1000);

    const inputText = await inputField.getText();
    expect(inputText).toBe('Leo QA Automation');
  });

});