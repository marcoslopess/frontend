import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AppApi {
  constructor() {}

  static async pesquisarEstados() {
    return await axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`
      )
      .catch(function (error) {
        console.log(error);
      });
  }

  static async pesquisarCidades(uf: any) {
    return await axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .catch(function (error) {
        console.log(error);
      });
  }

  static async pesquisarProfissao(uf: any, cidade: any) {
    return await axios
      .get(
        `http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com/profissao/${uf}/${cidade}?api-key=ddd70c32-fc98-4618-b494-a9698f824353`
      )
      .catch(function (error) {
        console.log(error);
      });
  }

  static async pesquisarEntidade(profissao: any, uf: any, cidade: any) {
    return await axios
      .get(
        `http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com/entidade/${profissao}/${uf}/${cidade}?api-key=4b94dba2-5524-4632-939b-92df1c50a645`
      )
      .catch((error) => {
        console.log(error);
      });
  }

  static async pesquisarPlanos(dados: any) {
    const body = {
      dados,
    };
    return await axios
      .post(
        `http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com/plano?api-key=261fd4d0-fd9f-468a-afa9-f5a89ed3701c`,
        dados
      )
      .catch((error) => {
        console.log(error);
      });
  }
}
