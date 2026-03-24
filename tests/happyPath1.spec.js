describe('Happy Path 1 — Búsqueda en Wikipedia', () => {

  it('debe abrir la app y mostrar la pantalla de búsqueda', async () => {
    await driver.pause(4000);

    // Intentar múltiples selectores
    let searchBtn;
    try {
      searchBtn = await $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_container")');
      await searchBtn.waitForDisplayed({ timeout: 12000 });
    } catch {
      searchBtn = await $('android=new UiSelector().className("android.widget.TextView").instance(0)');
      await searchBtn.waitForDisplayed({ timeout: 12000 });
    }
    expect(await searchBtn.isDisplayed()).toBe(true);
  });

  it('debe buscar un artículo y ver resultados', async () => {
    let searchContainer;
    try {
      searchContainer = await $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_container")');
      await searchContainer.waitForDisplayed({ timeout: 8000 });
    } catch {
      searchContainer = await $('android=new UiSelector().className("android.widget.TextView").instance(0)');
      await searchContainer.waitForDisplayed({ timeout: 8000 });
    }
    await searchContainer.click();
    await driver.pause(1500);

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

    // Verificar resultados
    let firstResult;
    try {
      firstResult = await $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/page_list_item_title")');
      await firstResult.waitForDisplayed({ timeout: 12000 });
    } catch {
      firstResult = await $('android=new UiSelector().className("android.widget.TextView").instance(1)');
      await firstResult.waitForDisplayed({ timeout: 12000 });
    }
    expect(await firstResult.isDisplayed()).toBe(true);
  });

});