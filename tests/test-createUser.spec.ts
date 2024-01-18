import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:5173/');
});

test.describe("Test Create User form", () => {
  test("debería crear un usuario", async ({page}) => {

  await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('link', { name: 'Crea una cuenta!' }).click();
  await page.getByPlaceholder('Nombre de Usuario').click();
  await page.getByPlaceholder('Nombre de Usuario').fill('testfront');
  await page.getByPlaceholder('Nombre de Usuario').press('Tab');
  await page.getByPlaceholder('email@email.com').fill('testfront@testfront.com');
  await page.getByPlaceholder('email@email.com').press('Tab');
  await page.getByPlaceholder('********').fill('123456789');
  await page.getByRole('button', { name: 'Crear Cuenta' }).click();
  const p = await page.getByText("Bienvenido! testfront");
  await expect(p).toBeVisible(); 
  })

  test("debería salir mensaje El Correo Electrónico ya esta en uso.", async ({page}) => {
    
  await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('link', { name: 'Crea una cuenta!' }).click();
  await page.getByPlaceholder('Nombre de Usuario').click();
  await page.getByPlaceholder('Nombre de Usuario').fill('testfront');
  await page.getByPlaceholder('Nombre de Usuario').press('Tab');
  await page.getByPlaceholder('email@email.com').fill('testfront@testfront.com');
  await page.getByPlaceholder('email@email.com').press('Tab');
  await page.getByPlaceholder('********').fill('123456789');
  await page.getByRole('button', { name: 'Crear Cuenta' }).click();
  const p = await page.getByText("El Correo Electrónico ya esta en uso.");
  await expect(p).toBeVisible();
  })
})