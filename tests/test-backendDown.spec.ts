import { test, expect } from '@playwright/test';
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/');
});

test.describe("Test Backend caido", () => {
    test("debería mostrar mensaje de error intentalo más tarde", async ({page}) => {
        await page.getByRole('link', { name: 'Iniciar Sesión' }).click();

        await page.getByPlaceholder('email@email.com').click();
        await page.getByPlaceholder('email@email.com').fill('sebastian.h.neira@outlook.com');
        await page.getByPlaceholder('email@email.com').press('Tab');
        await page.getByPlaceholder('********').fill('123456789');
        await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
        const p = await page.getByText("Error al realizar el login. Por favor, verifica tus credenciales o inténtalo más tarde.");
        await expect(p).toBeVisible(); 
    })

    test("debería mostar No se pudo obtener los datos! en incio de la aplicacion", async ({page}) => {
        const p = await page.getByText("No se pudo obtener los datos!");
        await expect(p).toBeVisible(); 
    })
})