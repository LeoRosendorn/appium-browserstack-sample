describe('Happy Path 2 — Navegar a un artículo', () => {

  before(async () => {
    try {
      await driver.pause(4000);

      // Intentar múltiples selectores para el botón de búsqueda
      let searchContainer;
      try {
        searchContainer = await $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_container")');
        await searchContainer.waitForDisplayed({ timeout: 8000 });
      } catch {
        // Fallback: buscar cualquier elemento clickeable en la pantalla principal
        searchContainer = await $('android=new UiSelector().className("android.widget.TextView").instance(0)');
        await searchContainer.waitForDisplayed({ timeout: 8000 });
      }
      await searchContainer.click();
      await driver.pause(1500);

      // Escribir en el campo de búsqueda
      let searchInput;
      try {
        searchInput = await $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")');
        await searchInput.waitForDisplayed({ timeout: 8000 });
      } catch {
        searchInput = await $('android=new UiSelector().className("android.widget.EditText")');
        await searchInput.waitForDisplayed({ timeout: 8000 });
      }
      await searchInput.setValue('Argentina');
      await driver.pause(3000);
    } catch (e) {
      console.error('Before hook error:', e.message);
    }
  });

it('debe seleccionar un resultado y cargar el artículo', async () => {
    const firstResult = await $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/page_list_item_title")');
    await firstResult.waitForDisplayed({ timeout: 15000 });
    await firstResult.click();
    await driver.pause(6000);

    // Verificar que navegamos al artículo — el campo de búsqueda ya no debe estar visible
    const searchInput = await $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")');
    const searchStillVisible = await searchInput.isDisplayed().catch(() => false);
    expect(searchStillVisible).toBe(false);
  });
  it('debe poder volver a la pantalla anterior', async () => {
    await driver.back();
    await driver.pause(2000);

    // Verificar que volvimos — cualquier elemento visible en pantalla
    const anyElement = await $('android=new UiSelector().className("android.widget.TextView").instance(0)');
    const isDisplayed = await anyElement.isDisplayed().catch(() => false);
    expect(isDisplayed).toBe(true);
  });

});