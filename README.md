# Ribon App

## Como rodar o projeto

- clone esse repositório: `git clone git@github.com:ribonapp/app.git`
- adicione o arquivo .env a root do projeto (ver com os devs o arquivo)
- rode o comando: `yarn install`
- conecte seu servidor:`yarn start`

Uma pagina deve abrir em http://localhost:3000. O app consome dados da API de staging, não sendo neccessário rodar o backend localmente.

## Como rodar os testes

- rode o comando: `yarn test`

## Ambientes
No desenvolvimento local (quando rodado o projeto no localhost:3000) os dados vem
da api de desenvolvimento (backend hospedado atualmente na AWS).
Existem ainda mais dois ambientes:
- Staging: [link de staging](https://ribon-dapp-staging.web.app/?integration_id=1)
- Produção: [link de produção](https://dapp.ribon.io/?integration_id=1)

O ambiente de staging é uma réplica de produção, porém com banco de dados diferente. Toda vez que um
PR é mergeado na `main` esse ambiente é atualizado com o novo código

O ambiente de produção é o ambiente em que os usuários estão. Todo novo merge
na `main` atualiza esse ambiente

Ambos os ambientes estão hospedados no firebase.
