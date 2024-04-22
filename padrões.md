# Notação de nomes de componentes single-file

MeuComponente.vue

# Nome de componentes base

BaseButton (ButtonSubmit, ButtonDelete consome BaseButton)

Eles somente devem conter:

- Elementos HTML
- Outros componentes base
- Elementos UI de terceiros.

# Nomes de componentes de instância única

TheHeader, TheFooter

Componentes que devem ter somente uma única instância ativa devem começar com o prefixo The, para determinar que eles podem ser somente um.

# Nomes de componentes fortemente acoplados

TodoList | SearchSidebar
TodoListItem | SearchSidebarNavigation

Componentes filho que são fortemente acoplados com o componente pai devem incluir, como prefixo, o nome do componente pai.

# Ordem das palavras nos nomes de componentes

SearchButtonClear, SearchInputQuery, SearchButtonRun

Nomes de componentes devem começar com a palavra de mais alto nível (muitas vezes a mais geral) e terminar com palavras de modificações descritivas.

# Componentes com autofechamento

Componentes sem conteúdo devem ser autofechados
< MyComponent/>

# Componentes com nomes completos

StudentDashboardSettings (em vez de: SdSettings)

Nomes de componentes devem ter palavras completas, ao invés de abreviações.

# Propriedades computadas simples

Propriedades computadas complexas devem ser quebradas em várias propriedades mais simples, sempre que possível
