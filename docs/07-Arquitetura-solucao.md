# Arquitetura da solução

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da solução](images/exemplo-arquitetura.png)

## Funcionalidades

Esta seção apresenta as funcionalidades da solução.

##### Funcionalidade 1 - Cadastro de Tarefas

Permite a entrada, retirada e edição de tarefas do usuário

* **Estrutura de dados:** [Tarefas](#estrutura-de-dados---tarefas)
* **Instruções de acesso:**
  * Abra o site e efetue o login;
  * Acesse a aba de Metas e vá em Inserir Tarefas;
  * Faça cadastro das tarefas a serem feitas.
* **Tela da funcionalidade**:

![Tela de funcionalidade](images/Captura%20de%20tela%20de%202025-05-11%2018-46-57.png)

### Estruturas de dados

Para a solução de um site de lista de tarefas gamificado como o ACTION MODE, a estrutura de dados centralizada no db.json precisa ser capaz de armazenar as tarefas diárias e seus atributos, incluindo o estado de conclusão.

A estrutura de dados principal é uma coleção de "dias", onde cada dia contém uma lista de "itens" (tarefas).

##### Estrutura de dados - Tarefas

```json
{
  "dados": [
    {
      "id": "3d65",
      "DataListada": "2025-05-22",
      "itens": [
        {
          "TarefasListada": "assasll",
          "nivelImportancia": "Alta",
          "concluida": false
        }
      ]
    }
  ]
}
  
```

##### Estrutura de dados - Tarefas cadastradas

Estrutura que armazena a quantidade de pontos e semanas concluídas do usuário, além da quantidade e detalhes das tarefas pendentes ou concluídas.

```json
  const informacoes = [
    {
        pontos: 500,
        semanas: 3,
        tarefas: [
            {
                id: 20,
                tipo:'concluídas',
                itens: [
                    {"id": 1, "tarefa": "Arrumar o carro"},
                    {"id": 2, "tarefa": "Lavar vasilhas"},
                    {"id": 3, "tarefa": "Estudar DIW"},
                    {"id": 4, "tarefa": "Consertar geladeira"},
                    {"id": 5, "tarefa": "Ir para a academia"}
                ]
            },
            {
                id: 30,
                tipo:'pendentes',
                itens: [
                    {"id": 6, "tarefa": "Lavar o banheiro"},
                    {"id": 7, "tarefa": "Enviar relatório mensal"},
                    {"id": 8, "tarefa": "Comprar ingredientes"},
                    {"id": 9, "tarefa": "Organizar gavetas"},
                    {"id": 10, "tarefa": "Remarcar consulta"}           

                ]
            }
        ]
    }
]
```

> ⚠️ **APAGUE ESTA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente as estruturas de dados utilizadas na solução tanto para dados utilizados na essência da aplicação, quanto outras estruturas que foram criadas para algum tipo de configuração.
>
> Nomeie a estrutura, coloque uma descrição sucinta e apresente um exemplo em formato JSON.
>
> **Orientações:**
>
> * [JSON Introduction](https://www.w3schools.com/js/js_json_intro.asp)
> * [Trabalhando com JSON - Aprendendo desenvolvimento web | MDN](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Objects/JSON)

### Módulos e APIs

Esta seção apresenta os módulos e APIs utilizados na solução.

**Images**:

* Unsplash - [https://unsplash.com/](https://unsplash.com/) ⚠️ EXEMPLO ⚠️

**Fonts:**

* Icons Font Face - [https://fontawesome.com/](https://fontawesome.com/) ⚠️ EXEMPLO ⚠️

**Scripts:**

* jQuery - [http://www.jquery.com/](http://www.jquery.com/) ⚠️ EXEMPLO ⚠️
* Bootstrap 4 - [http://getbootstrap.com/](http://getbootstrap.com/) ⚠️ EXEMPLO ⚠️

> ⚠️ **APAGUE ESTA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente os módulos e APIs utilizados no desenvolvimento da solução. Inclua itens como: (1) frameworks, bibliotecas, módulos, etc. utilizados no desenvolvimento da solução; (2) APIs utilizadas para acesso a dados, serviços, etc.


## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foram realizados.

> **Links úteis**:
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando seu site no Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)
