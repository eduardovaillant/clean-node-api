# Criar enquete

> ## Caso de sucesso

1. [X] Recebe uma requisição do tipo **POST** na rota **/api/surveys**
2. [X] Valida se a requisição foi feita por um **admin**
3. [X] Valida dados obrigatórios **question** e **answers**
4. [X] **Cria** uma enquete com os dados fornecidos
5. [X] Retorna **204**, sem dados

> ## Exceções

1. [X] Retorna erro **404** se a API não existir
2. [X] Retorna erro **403** se o usuário não for admin
3. [X] Retorna erro **400** se question ou answers não forem fornecidos pelo client
4. [X] Retorna erro **500** se der erro ao tentar criar a enquete