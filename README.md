# Projeto de Testes Automatizados - Automation Exercise Web

## Badges de Tecnologias
[![WebdriverIO](https://img.shields.io/badge/WebdriverIO-ea5906?style=for-the-badge&logo=webdriverio&logoColor=white)](https://webdriver.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=mocha&logoColor=white)](https://mochajs.org/)
[![Chai](https://img.shields.io/badge/Chai-A30701?style=for-the-badge&logo=chai&logoColor=white)](https://www.chaijs.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Chrome](https://img.shields.io/badge/Chrome-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.google.com/chrome/)

## Descrição
Suíte de testes web automatizados para o site Automation Exercise, focando em testar funcionalidades abrangentes de um e-commerce.

## Tecnologias e Dependências
- **Framework de Testes**: WebdriverIO
- **Linguagem**: JavaScript (ES6+)
- **Executor de Testes**: Mocha
- **Biblioteca de Assertivas**: Chai
- **Relatórios**: Allure Reporter
- **Automação de Browser**: ChromeDriver

### Dependências Principais
- `@wdio/cli`: CLI do WebdriverIO
- `@wdio/mocha-framework`: Integração com Mocha
- `@wdio/allure-reporter`: Relatórios Allure
- `chromedriver`: Automação de navegador
- `chai`: Biblioteca de assertivas

## Estrutura do Projeto
```
qa.automationexercise-web.webdriverio/
│
├── test/
│   ├── specs/                 # Especificações de testes
│   │   ├── register-user.spec.js
│   │   ├── search.spec.js
│   │   ├── add-to-cart.spec.js
│   │   ├── remove-from-cart.spec.js
│   │   └── cart-quantity.spec.js
│   │
│   ├── pageobjects/           # Modelo de Objetos de Página
│   │   ├── home.page.js
│   │   ├── signup.page.js
│   │   └── account-created.page.js
│   │
│   └── utils/                 # Funções utilitárias
│       └── data-generator.js
│
├── wdio.conf.js               # Configuração do WebdriverIO
├── package.json               # Metadados e scripts do projeto
└── README.md                  # Documentação do projeto
```

## Configuração e Instalação
1. Clone o repositório
```bash
git clone https://github.com/enokjanuario/qa.automationexercise-web.webdriverio.git
```

2. Instale as dependências
```bash
npm install
```

## Executando Testes
### Executar Todos os Testes
```bash
npm test
```

### Executar Suítes de Testes Específicas
- Registrar Usuário: `npm run test:register`
- Buscar Produto: `npm run test:search`
- Adicionar ao Carrinho: `npm run test:add-to-cart`
- Remover do Carrinho: `npm run test:remove-from-cart`
- Quantidade no Carrinho: `npm run test:cart-quantity`

## Gerando Relatórios
```bash
npm run report
```

## Padrões de Projeto
- **Modelo de Objetos de Página (POM)**: Encapsula elementos e ações específicos da página
- **Separação de Responsabilidades**: Camadas distintas para objetos de página, especificações de teste e utilitários
- **Testes Orientados por Dados**: Utiliza gerador de dados para cenários de teste

## Cobertura de Testes
- Registro de Usuário
- Busca de Produto
- Gerenciamento de Carrinho
- Verificação de Quantidade de Produtos

## Ambientes Suportados
- Chrome (Última Versão)
- Suporte a Modo Headless

## CI/CD
Workflow do GitHub Actions configurado para testes automatizados em push e pull requests.


