# 🩺 PJ Cuidador

Protótipo de aplicativo para **cuidadores** gerenciarem a medicação e os sinais vitais de seus pacientes.

App de página única (single-file), em React via CDN — **roda apenas abrindo `index.html` no navegador**, sem build nem instalação.

## Funcionalidades (protótipo)

- **Onboarding + Login/Cadastro**
- **Dashboard** — progresso do dia, próximos medicamentos, alertas de sinais vitais
- **Cadastro de pacientes** — múltiplos pacientes, condições e alergias
- **Captura de receita (OCR/IA simulado)** — detecta medicamentos e cria o cronograma
- **Lista de medicações** — marcar como administrado, adicionar/editar/excluir, filtros
- **Detalhes da medicação** — passo a passo de administração
- **Registro de sinais vitais** — análise automática com **alerta** quando fora do padrão
- **Histórico de sinais vitais** — gráfico de evolução + tabela
- **Cronograma para impressão** — exportável em PDF (via impressão do navegador)
- **Loja de farmácia** — catálogo, carrinho e checkout

> Todos os dados são **mockados** (em memória). Telas administrativas, pagamento real e notificações
> estão fora do escopo do protótipo.

## Como rodar

Abra o arquivo [`index.html`](index.html) em qualquer navegador moderno.

## Tecnologia

- React 18 + Babel Standalone (via CDN)
- HTML/CSS puro, sem dependências locais
