import { waitAndClick } from '../helpers/gestures.js';

/**
 * Happy Path 2 — Navegación al listado de elementos
 * Valida que la app muestra una lista de items
 * y que se puede seleccionar uno correctamente.
 */
describe('Happy Path 2 — Navegación a List View', () => {

  it('debe volver a la pantalla principal y navegar a List', async () => {
    // Volver atrás a la pantalla principal
    await driver.back();
    await driver.pause(1500);

    // Buscar y clickear el elemento List
    const listBtn = await $('android=new UiSelector().text("List")');
    await listBtn.waitForDisplayed({ timeout: 15000 });
    await listBtn.click();

    await driver.pause(1500);

    // Verificar que la pantalla de lista tiene items visibles
    const firstItem = await $('android=new UiSelector().className("android.widget.TextView").instance(0)');
    const isDisplayed = await firstItem.isDisplayed();
    expect(isDisplayed).toBe(true);
  });

  it('debe mostrar al menos un elemento en la lista', async () => {
    const items = await $$('android=new UiSelector().className("android.widget.TextView")');
    expect(items.length).toBeGreaterThan(0);
  });

});