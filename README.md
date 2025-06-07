# Inechat Customer Platform

## Descrição

Sistema de backoffice do cliente. Responsável por gerenciar os funcionários, conexão do whatsapp, agendamentos e etc.

## Arquitetura do Projeto

```
root/
├── src/
│   ├── application/        # Casos de uso (Use Cases)
│   │   ├── factories/      # Agregador dos usercases
│   │   ├── interfaces/     # Interfaces de entrada e saída
│   │   └── usecases/       # Lógica de negócio específica
│   ├── domain/             # Entidades e contratos
│   │   ├── entities/       # Entidades do domínio
│   │   └── repositories/   # Interfaces de repositórios
│   ├── infrastructure/     # Implementação de infraestrutura
│   │   ├── configs/        # Arquivos de configuração( Logger, envs, error, path, etc.) 
│   │   ├── database/       # Conexão e implementações de repositórios
│   │   ├── express/        # Configuração do express
│   │   ├── middleware/     # middlewares(autenticação de token)
│   │   └── services/       # Serviços externos (integracao com APIs externas)
│   ├── presentation/       # Rota e camada de interface (controllers)
│   │   ├── controllers/    # Controladores
│   │   └── routes/         # Definição de rotas
│   └── shared/             # Código compartilhado (ex.: erros, helpers)
├── .env                    # Configurações de ambiente
├── .eslintrc.json          # Configurações do ESLint
├── .gitignore              # Ignorar arquivos no Git
├── package.json            # Dependências do projeto
├── tsconfig.json           # Configurações do TypeScript
└── README.md               # Documentação do projeto
```
# Inechat Customer Platform

## Descrição

Sistema de backoffice do cliente. Responsável por gerenciar os funcionários, conexão do whatsapp, agendamentos e etc.

## Arquitetura do Projeto

```
root/
├── src/
│   ├── application/        # Casos de uso (Use Cases)
│   │   ├── factories/      # Agregador dos usercases
│   │   ├── interfaces/     # Interfaces de entrada e saída
│   │   └── usecases/       # Lógica de negócio específica
│   ├── domain/             # Entidades e contratos
│   │   ├── entities/       # Entidades do domínio
│   │   └── repositories/   # Interfaces de repositórios
│   ├── infrastructure/     # Implementação de infraestrutura
│   │   ├── configs/        # Arquivos de configuração( Logger, envs, error, path, etc.) 
│   │   ├── database/       # Conexão e implementações de repositórios
│   │   ├── express/        # Configuração do express
│   │   ├── middleware/     # middlewares(autenticação de token)
│   │   └── services/       # Serviços externos (integracao com APIs externas)
│   ├── presentation/       # Rota e camada de interface (controllers)
│   │   ├── controllers/    # Controladores
│   │   └── routes/         # Definição de rotas
│   └── shared/             # Código compartilhado (ex.: erros, helpers)
├── .env                    # Configurações de ambiente
├── .eslintrc.json          # Configurações do ESLint
├── .gitignore              # Ignorar arquivos no Git
├── package.json            # Dependências do projeto
├── tsconfig.json           # Configurações do TypeScript
└── README.md               # Documentação do projeto
```
