import { test, expect } from '@playwright/test';
import { obterCodigo2FA } from '../support/db';
import { LoginPage } from '../pages/LoginPage';
import { log } from 'console';
import { DashPage } from '../pages/DashPage';
import { cleanJobs, getJob } from '../support/redis';
test('test', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const dashPage = new DashPage(page)


  const usuario = {
    cpf: '00000014141',
    senha:'147258'
  }

  await cleanJobs() // limpa tudo

 await loginPage.acessarPagina()
 await loginPage.informaCpf(usuario.cpf)
 await loginPage.preencheSenha(usuario.senha)
  

await page.getByRole('heading', {name:'Verificação em duas etapas'}).waitFor({timeout:2000}) //vai ter até 3 segundo para ir pro proximo passo

const codigo = await getJob()

//const code = await obterCodigo2FA(usuario.cpf)// banco de dados

await loginPage.informar2FA(codigo)

await expect(dashPage.obterSaldo()).toHaveText('R$ 5.000,00');
 
});

test('Não deve logar quando código estiver errado', async ({ page }) => {
  const usuario = {
    cpf: '00000014141',
    senha:'147258'
  }

  const loginPage = new LoginPage(page)
  await loginPage.acessarPagina()
  await loginPage.informaCpf(usuario.cpf)
  await loginPage.preencheSenha(usuario.senha)

  await page.getByRole('textbox', { name: '000000' }).fill("123434");
  await page.getByRole('button', { name: 'Verificar' }).click();
  
 await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});