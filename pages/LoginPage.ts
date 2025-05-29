import { Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page  // ✅ Declara que a classe tem a propriedade 'page'

  constructor(page: Page) {
    this.page = page  // Agora isso funciona
  }

  async acessarPagina(){
    await this.page.goto('http://paybank-mf-auth:3000/');
  }

  async informaCpf(cpf){
    await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
    await this.page.getByRole('button', { name: 'Continuar' }).click();
  
  }

  async preencheSenha(senha){

  for(const digito of senha){
    
    await this.page.getByRole('button', { name: digito }).click();
  }
 
  await this.page.getByRole('button', { name: 'Continuar' }).click();
 
  }

  async informar2FA(code: string){
    await this.page.getByRole('textbox', { name: '000000' }).fill(code);
    await this.page.getByRole('button', { name: 'Verificar' }).click();
  }

  
}
