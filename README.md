# Digital Innovation One - _Like a Pro_

Então você está fazendo cursos na Digital Innovation One e está montando seu portifólio profissional aqui no Github?  
E pra evitar aquela bagunça de 1 milhão de repositórios sem qualquer padronização, você está buscando uma forma eficiente de se organizar?

- E se este método puder registrar todo seu aprendizado direto no Github?
- E se você puder dominar o fluxo do Github enquanto estuda?
- E se este repositório se torne sua caixa de ferramentas para novos projetos?
- E se os recrutadores já te selecionarem só de ver o seu perfil?

`A boa notícia:` **VOCÊ ACHOU**!😁  
`A ótima nóticia:` **OS PREGUIÇOSOS NÃO PASSAM DAQUI, ASSIM SOBRA VAGA PRA QUEM MERECE**😂

## O que você ganha usando este repositório?

- Você será um MESTRE e dominará a artes de:
  - clonar repositórios
  - gerenciar suas aulas por branchs
  - gerenciar seus cursos por Issues
  - organizar seu cursos com Labels e Milestones para níveis, bootcamps e formações
  - fazer commits eficientes
  - fazer push e pull para se manter atualizado local e remotamente
- Seu repositório será atualizado conforme você conclui os cursos
- Sua formação será terá o percentual atualizado, de acordo com o seu progresso
- Experiência PRÁTICA no Github, estará apto para trabalhar como um PROFISSIONAL
- Armazenamento, Estatísticas de progresso e Controle de Versão na nuvem

Tá certo, mas antes de dar tudo isso de mão beijada eu preciso saber: 👋

![decisao](./assets/sua-decisao.png)

🔴Tá brincando? Conta logo tudo homi!🤣

## Índice

- [Estrutura da Digital Innovation One (DIO)](#estrutura-da-digital-innovation-one-dio)
- [Estrutura do Github](#estrutura-do-github)
- [E como será o fluxo DIO e Github?](#e-como-será-o-fluxo-dio-e-github)
- [Instalação](#instalação)
- [Conclusão](#conclusão)


## Estrutura da Digital Innovation One (DIO)
![dio-estrutura-](./assets/dio-estrutura-cursos.png)
- `Formação` (ou Trilha de aprendizado)  
  É um conjunto de cursos da uma mesma categoria que quando concluídos vão te capacitar plenamente no assunto
- `Curso`
  É um conjunto de vídeo aulas, excercícios e avaliações.  
  Os cursos possuem os níveis `Básico`, `Intermediário` e `Avançado` e podem fazer parte de `Bootcamps`, `Acelerações` e outros recursos da DIO.

## Estrutura do Github
- `Repositório` é o local de armazenamento de tudo que iremos fazer ou utilizar do github. Nós usaremos alguns recursos como `branch, commit, issue, labels, milestones e pull request`
- `Milestone` Representa uma Formação na DIO
- `Issue` Representa um Curso
- `Label` (Opcional) Para anotar Nível do curso, Bootcamps que o curso faz parte, etc...
- `Branch` (na IDE) para cada curso iniciado, crie também um branch com o nome do curso
- `Commit` Será realizado ao término de cada aula, para registrar os momentos.
- `Pull Request` É o pedido para unir (merge) todo o trabalho feito no `seu branch` junto ao `main`

TODO: Adicionar imagem

## E como será o fluxo DIO e Github?
Vamos pensar no seguinte:

| DIO | <-> | Github |
| :---: | :---: | :---:|
| Formação | <-> | Milestone |
| Cursos | <-> | Issues |

1- **No Github**
- Para cada `Formação` no DIO, criaremos um `Milestone` aqui no Github
- Para cada `Curso`, criaremos um `Issue`, relacionando o `Milestone` correspondente  
  (Opcional) utilizar `Labels` para colocar outras informações do curso como `Nível` e `Bootcamps`.

2- **Na IDE**
- Quando iniciarmos um `Curso`, criaremos um `Branch` com o nome do curso
- Cada aula concluída, faremos um `commit` e `push` com o conteúdo aprendido na aula

3- **No Github**
- Quando concluímos um curso, e tivermos realizado todos os `commits` e `pushs` no `repositório`, vamos criar um `pull request`
- Com o `Pull request` criado, vamos relacionar ele ao `Issue` correspondente e finalmente fazer o `merge` com o repositório principal `main`.

![commits](./assets/git-commits.png)
TODO: Trocar esta imagem por uma que tenha o fluxo atual descrito acima

<!-- 
[![EdMaxi stats](https://github-readme-stats-edmaxi.vercel.app/api?username=edMaxi&hide=contribs&count_private=true&show_icons=true&title_color=0af&icon_color=fa0&text_color=ddd&bg_color=1a202c&hide_border=true&locale=pt-br&custom_title=Minhas%20Estatísticas%20no%20Github)](https://github.com/edmaxi/github-readme-stats)
[![Top Langs](https://github-readme-stats-edmaxi.vercel.app/api/top-langs/?username=edmaxi)](https://github.com/edmaxi/github-readme-stats)
-->


## Instalação

1. Faça um _`Fork`_ deste repositório, configure-o com as opções abaixo:
* Em **Settings > Options**, marque estas opções:
  - `Features`
    - [x] Issues
  - `Merge Button`
    - [x] Allow auto-merge
    - [x] Automatically delete head branches


### Clonando o repositório

1. Clone este repositório:
   ```bash
   git clone https://github.com/<SEU USERNAME>/dio-cursos.git
   ```
### Usando o branch inicial
2. Faça o checkout do branch inicial para começar do zero, e a partir daí ir fazendo seus próprios commits
   para registrar sua evolução na DIO
```bash
  git checkout v1.0
```

## BÔNUS

Criação de toda a estrutura inicial de 83 cursos e 19 Formações do DIO automaticamente através da [api de criação de issues](./criar_issues_via_api/README.md)

## Conclusão

O status da sua formação (milestone) será atualizado a cada vez que você concluir um curso (issue).
E sua missão é completar todos os cursos para completar os seus estudos.

- Seu `Pull Request` será fechado automaticamente (merge automático)
- Seu `branch` do curso será integrado ao `main` e então excluído
- Seu `issue` é fechado por conta da conclusão do `PR` linkado à ele
- Seu `milestone` é atualizado com o status desse `issue` concluído

> `Dica` Documente sua evolução, preencha o README de cada aula com o que fez mais sentido pra você

![parabéns](https://media.giphy.com/media/xT0xezQGU5xCDJuCPe/giphy.gif)
