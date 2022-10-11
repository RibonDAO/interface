# O que vem aqui?

Componentes a serem compartilhados por **TODA A APLICAÇÃO**.
Usou em mais de uma página? É Componente!!!

Componentes dessa pasta devem ter apenas props e estados (sem lógicas de chamada de API, redux, etc).
Um componente com lógica deve estar na pasta `pages`.

A ideia aqui é termos componentes reutilizáveis entre projetos, que sejam independentes e usados apenas pra interface.

Cada componente tem seu storybook relacionado (index.stories.tsx). Nele podemos verificar se o componente está
funcionando da forma como deveria, modificar props para ver como ele se comporta, etc.
Se o story do seu componente estiver quebrado, pode ser um sinal de que ele tem lógica, e não apenas props e estados.

_Exemplos_: botões, formulários, cards, ...

# E se eu precisar de um componente que só vai ser usado em uma página/tela?

Vamos supor que temos um componente ForgotPasswordModal que deve ser usado apenas na página de Authentication.
Nesse caso esse componente vai estar no folder de pages e vamos estruturar assim

```
pages
│
│
└───Authentication
    │   index.ts
    │   style.ts
    │
    └───ForgotPasswordModal
            index.ts
            style.ts

```

# Como testar componentes dessa pasta

- Testar se as props estão sendo renderizadas como deveriam.

Ex: Um botão recebe como prop o texto dele. Ver se na tela é mostrado esse texto.

Ex: Um botão recebe como prop uma função para ser chamada ao clicar nele. Testar se essa função é de fato chamada
ao clicar no botão

Ex: Um slider de imagens recebe um array de imagens pra renderizar. Testar se as imagens aparecem conforme mudamos a imagem atual do slider.

Ex: Um modal tem a prop visible, que indica se ele aparece ou não. Testar se quando ela está verdadeira, o modal aparece, e não caso contrário.
