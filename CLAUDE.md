# 🤖 CLAUDE.md — Diretrizes para Claude Code e Agentes de IA

Este arquivo contém as instruções operacionais, convenções de código, restrições e padrões de arquitetura para qualquer agente de IA (Claude Code, Cursor, Codex) desenvolvendo no repositório **PitchTrainer**.

---

## 📌 Contexto Rápido do Projeto

- **Nome**: PitchTrainer
- **Objetivo**: Web app de treino de ouvido gamificado (estilo Duolingo) para violão e guitarra.
- **Modo Atual (MVP)**: Modo Prática Livre / Arcade com duas trilhas separadas (Notas e Acordes), filtros customizados, streak e áudio real de violão via Web Audio API.
- **Stack**: Next.js 15+ (App Router), TypeScript 5+, Tailwind CSS v4, Framer Motion, Zustand (`persist`), Lucide React.
- **Hospedagem**: Vercel (100% Client-Side no MVP, zero banco externo necessário).

---

## 🛠️ Comandos de Execução

```bash
# Instalação das dependências
pnpm install

# Iniciar servidor local com Turbopack
pnpm dev

# Build de produção (validação de tipos e bundling)
pnpm build

# Linting e formatação
pnpm lint
```

---

## 📐 Padrões de Código e Convenções

### 1. Next.js App Router & Client Components
- Componentes que manipulam áudio (`AudioContext`), teclado (`window.addEventListener`) ou interações do usuário **DEVEM** conter a diretiva `'use client';` no topo do arquivo.
- Para evitar erros de hidratação (*SSR Hydration Mismatch*) causados pelo `localStorage` da Zustand store:
  - Utilize um hook de hidratação segura (`useHydration`) ou monte os elementos dependentes de persistência apenas após o primeiro `useEffect`.

### 2. Engenharia de Áudio (Web Audio API)
- **Nunca use a tag `<audio src="...">`** para a mecânica central do jogo! Ela gera atraso perceptível de 200ms+ e problemas de sobreposição no iOS.
- Encapsule todo o áudio na classe singleton `AudioEngine` (`src/lib/audio/AudioEngine.ts`):
  - Deve conter método de pré-carregamento de buffers (`decodeAudioData`).
  - Deve conter método `unlock()` disparado na primeira interação do usuário para atender às restrições do Safari/Chrome.
  - Deve conter gerador de som procedural (Karplus-Strong) como fallback imediato caso a requisição de rede do sample falhe.

### 3. Estilização & Design Tokens
- Siga rigorosamente as especificações do [DESIGN.md](file:///d:/Projetos%20IA/PitchTrainer/DESIGN.md).
- Todos os botões interativos de resposta devem ter o estilo tátil 3D (`border-b-4` que afunda em `active:translate-y-1 active:border-b-0`).
- Use classes do Tailwind CSS e a paleta definida (`#0B0F19`, `#10B981`, `#F59E0B`, etc.).

### 4. Gerenciamento de Estado (Zustand)
- Centralize a lógica de transição de perguntas e cálculo de streak na store `useQuizStore.ts`.
- Mantenha funções puras para sorteio de perguntas (`src/lib/music/quizGenerator.ts`):
  - Garanta que as 3 alternativas incorretas (distratores) sejam plausíveis e nunca incluam a opção correta duplicada.

---

## ⛔ Regras Críticas: O que NÃO fazer (Don'ts)

1. ❌ **NÃO adicione dependências de backend pesado no MVP** (ex: Prisma, Docker, Express). O MVP roda 100% no navegador e hospeda estático na Vercel.
2. ❌ **NÃO bloqueie a interface esperando o áudio terminar**. A interface deve responder instantaneamente ao clique do usuário.
3. ❌ **NÃO utilize áudios de piano ou sintetizadores estridentes**. O produto tem como proposta de valor fundamental o som de **violão acústico**.
4. ❌ **NÃO crie barreiras de autenticação/login obrigatório no primeiro acesso**. O usuário deve abrir o site e conseguir treinar em menos de 3 segundos.
5. ❌ **NÃO remova os atalhos de teclado (1, 2, 3, 4 e Espaço)**; músicos utilizam muito o teclado enquanto ouvem com fones.

---

## ✅ Regras de Boas Práticas: O que SEMPRE fazer (Do's)

1. ✔️ **Trate o estado de carregamento do áudio** exibindo um indicador sutil (*loading wave*) sem travar o app.
2. ✔️ **Garanta acessibilidade (A11y)**: adicione atributos `aria-label` descritivos nos botões de som e foque o botão de prosseguir com a tecla `Enter`.
3. ✔️ **Escreva testes de lógica musical unitários** para verificar se os intervalos e nomes de acordes estão corretos (ex: C Maior é composto por C, E, G; Am por A, C, E).
4. ✔️ **Mantenha o código limpo, modular e tipado rigorosamente com TypeScript**.
