import { Page } from '@playwright/test'
export class DashPage{

    readonly page: Page  // ✅ Declara que a classe tem a propriedade 'page'

  constructor(page: Page) {
    this.page = page  // Agora isso funciona
  }

  obterSaldo() {
    return this.page.locator('#account-balance');
  }
}