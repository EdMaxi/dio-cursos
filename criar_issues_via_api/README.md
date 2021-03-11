# Criando issues via API 

Para facilitar a criação massiva dos cursos da DIO neste repositório, temos um comando especial que vai poupar o seu tempo!
Através do comando abaixo, criaremos todos os `Issues` automaticamente no repositório, inclusive com `Labels` e `Milestones`.

Atualmente a DIO possui 83 Cursos disponíveis e 19 Formações.
Criar toda a estrutura no repositório dá um bom trabalho, e por isso este script vai te ajudar demais!

## Vamos lá!

1. Crie um Token do Github
1. Atualize o o arquivo .env com seu token no formato: `TOKEN=SEUTOKENAQUI`
1. Instale as dependências e execute a criação de Issues automatizada:
    ```
    cd criar_issues_via_api
    npm install
    npm run deploy
    ```
