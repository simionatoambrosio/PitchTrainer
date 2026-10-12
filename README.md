# 🎸 PitchTrainer — Guitar Ear Training App

> Treinador de ouvido musical gamificado com foco em violão e guitarra. Aprenda a reconhecer notas e acordes de ouvido com feedback instantâneo, métricas de precisão e estética estilo Duolingo.

---

## 📋 Visão Geral

O **PitchTrainer** é uma aplicação web moderna projetada especialmente para músicos de cordas (violão e guitarra) que desejam treinar a percepção musical. Diferente dos treinadores convencionais que utilizam timbres de piano ou sintetizadores genéricos, o PitchTrainer usa **amostras reais de violão acústico e guitarra**, respeitando as ressonâncias harmônicas e as fôrmas reais que o instrumentista ouve no dia a dia.

### 🌟 Destaques do Projeto

- 🎧 **Samples Reais de Violão**: Identifique notas e acordes com o timbre autêntico de cordas de aço/nylon.
- 🎯 **Duas Trilhas Independentes**:
  - **Trilha de Notas**: Treinamento de notas naturais e acidentes (sustenidos/bemóis).
  - **Trilha de Acordes**: Identificação de tríades (Maior, Menor) e tétrades (7M, m7, Dominante 7).
- 🕹️ **Modo Prática Livre / Arcade (MVP)**: Sessões rápidas de treino com filtros customizados, timer, sequência de acertos (*streak*) e taxa de precisão em tempo real.
- 🚀 **100% Client-Side & Zero-Config**: Estado salvo no `localStorage`/`IndexedDB`. Não requer banco de dados para rodar.
- ⚡ **Deploy em 1 Clique na Vercel**: Construído em Next.js 15 com App Router e Web Audio API nativo.
- 🗺️ **Pronto para a Trilha Duolingo (Fase 2)**: Arquitetura preparada para árvores de níveis com nós bloqueados, corações/vidas e ofensivas diárias.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Motivação |
| :--- | :--- | :--- |
| **Framework** | [Next.js 15+](https://nextjs.org/) (App Router) | Renderização otimizada, bundling moderno e deploy nativo na Vercel |
| **Linguagem** | [TypeScript 5+](https://www.typescriptlang.org/) | Tipagem estrita para lógica musical (pitches, frequências, acordes) |
| **Estilização** | [Tailwind CSS v4](https://tailwindcss.com/) | Design tokens consistentes, modo escuro nativo e agilidade |
| **Animações** | [Framer Motion](https://www.framer.com/motion/) | Transições suaves estilo Duolingo (botões 3D, feedback e badges) |
| **Ícones** | [Lucide React](https://lucide.dev/) | Ícones modernos, limpos e acessíveis |
| **Áudio Engine** | Web Audio API + Soundfont / AudioBuffers | Baixíssima latência (<20ms) e playback simultâneo sem travamentos |
| **Gerenciamento de Estado** | [Zustand](https://zustand-demo.pmnd.rs/) (`persist`) | Estado reativo leve com sincronização automática no `localStorage` |

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 20.x ou superior
- Gerenciador de pacotes: `pnpm` (recomendado), `npm` ou `yarn`

### Passo a Passo

1. **Clone o repositório ou navegue até o diretório**:
   ```bash
   cd "d:/Projetos IA/PitchTrainer"
   ```

2. **Instale as dependências**:
   ```bash
   pnpm install
   # ou npm install
   ```

3. **Configure as variáveis de ambiente (opcional no MVP)**:
   ```bash
   cp .env.example .env.local
   ```

4. **Inicie o servidor de desenvolvimento**:
   ```bash
   pnpm dev
   # ou npm run dev
   ```

5. **Acesse no navegador**:
   Abra `http://localhost:3000`

---

## 📁 Estrutura de Diretórios

```
PitchTrainer/
├── public/
│   ├── audio/
│   │   ├── notes/        # Samples individuais de violão (E2 a E5)
│   │   ├── chords/       # Samples de acordes cheios (C, Am, G, D7...)
│   │   └── sfx/          # Efeitos sonoros (sucesso, erro, streak)
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Layout raiz com fontes e tema dark
│   │   ├── page.tsx      # Landing / Hub principal
│   │   └── arcade/       # Tela do Modo Prática Livre (Arcade)
│   ├── components/
│   │   ├── audio/        # Botão de Play/Replay e indicador de áudio
│   │   ├── quiz/         # Cards de múltipla escolha e banner de feedback
│   │   ├── hud/          # Streak flame, contador de pontos, precisão (%)
│   │   └── modal/        # Filtros de seleção de notas e acordes
│   ├── lib/
│   │   ├── audio/        # AudioEngine (Web Audio API buffer loader)
│   │   ├── music/        # Teoria musical (cálculo de notas, intervalos, acordes)
│   │   └── constants.ts  # Dicionário de acordes e frequências
│   ├── store/
│   │   └── useQuizStore.ts # Estado global do jogo com persistência local
│   └── types/
│       ├── music.ts      # Interfaces de Note, Chord, Voicing
│       └── quiz.ts       # Interfaces de QuizSession, Question, Stats
├── ARCHITECTURE.md       # Arquitetura detalhada e fluxo de áudio
├── CLAUDE.md             # Regras e comandos para Claude Code / Codex
├── DESIGN.md             # Design System conforme Google Labs Stitch spec
├── PRD.md                # Product Requirements Document detalhado
├── ROADMAP.md            # Fases de entrega (MVP até V2)
└── package.json
```

---

## ☁️ Deploy na Vercel

Por ser uma aplicação baseada em Next.js sem dependência obrigatória de servidores com banco no MVP:

1. Suba o código para o GitHub / GitLab.
2. Acesse [vercel.com](https://vercel.com) e importe o repositório.
3. Clique em **Deploy**. A Vercel detectará o Next.js automaticamente.
4. O app estará imediatamente online com suporte a HTTPS e CDN global de áudio.

---

## 📄 Licença

Distribuído sob licença MIT. Sinta-se livre para customizar e expandir!
