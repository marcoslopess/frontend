import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AppApi } from './app.api';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector:'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDarkTheme!: Observable<boolean>;
  loading: boolean = true;
  estados: any[] = [];
  estadoEscolhido: string = '';
  cidades: any[] = [];
  cidadeEscolhida: string = '';
  profissoes: any[] = [];
  profissaoEscolhida: string = '';
  entidades: any[] = [];
  entidadeEscolhida: string = '';
  planos: any[] = [];
  planoEscolhido: string = '';
  endRequest: boolean = false;
  dataNascimento: string = '';

  constructor(
    private themeService: ThemeService,
    private _snackBar: MatSnackBar
    ) { }

    async ngOnInit() {
      await AppApi.pesquisarEstados()
        .then(async (res: any) => {
          this.loading = false;
          this.estados = res.data;
        })
        .catch((err) => {
          this.loading = false;
        });
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  async getCidades() {
    this.loading = true;
    await AppApi.pesquisarCidades(this.estadoEscolhido)
      .then(async (res: any) => {
        this.loading = false;
        this.cidades = await res.data;
      })
      .catch((err) => {
        this.loading = false;
      });
  }

  async getProfissao() {
    this.loading = true;
    await AppApi.pesquisarProfissao(this.estadoEscolhido, this.cidadeEscolhida)
      .then(async (res: any) => {
        this.loading = false;
        this.profissoes = res.data;
      })
      .catch((err) => {
        this.loading = false;
      });
  }

  async getEntidade() {
    this.loading = true;
    await AppApi.pesquisarEntidade(
      this.profissaoEscolhida,
      this.estadoEscolhido,
      this.cidadeEscolhida
    )
      .then(async (res: any) => {
        this.loading = false;
        this.entidades = res.data;
      })
      .catch((err) => {
        this.openSnackBarError('Entidades não localizadas!', '');
        this.loading = false;
        this.entidades = [];
      });
  }

  getPlanos() {
    this.endRequest = true;
  }

  async postPlanos() {
    this.loading = true;
    let data = new Date(this.dataNascimento).toLocaleDateString().split('/');
    let dataFormatada: any = `${data[2]}-${data[1]}-${data[0]}`;
    let dados = {
      entidade: this.entidadeEscolhida,
      uf: this.estadoEscolhido,
      cidade: this.cidadeEscolhida,
      datanascimento: [dataFormatada],
    };
    await AppApi.pesquisarPlanos(dados)
      .then(async (res: any) => {
        this.loading = false;
        console.log(res.data);
      })
      .catch((err) => {
        this.loading = false;
      });
  }

  openSnackBarError(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 5 * 1000;
    config.panelClass = ['bg-red', 'text-white'];
    this._snackBar.open(message, action, config);
  }

}

