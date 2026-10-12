# 🗺️ ROADMAP.md — Roteiro de Desenvolvimento do PitchTrainer

Este roadmap define as fases de evolução do **PitchTrainer**, partindo do MVP (Modo Arcade focado em validação rápida) até a experiência completa gamificada com trilha de aprendizado estilo Duolingo.

---

## 📅 Visão Geral dos Marcos (Milestones)

```
[Fase 0: Fundação] ───► [Fase 1: MVP Arcade] ───► [Fase 2: Trilha Duolingo] ───► [Fase 3: Braço do Violão] ───► [Fase 4: Nuvem & Social]
```

---

## 🚀 Fase 0: Setup & Motor de Áudio (Concluída / Em Curso)
> **Objetivo**: Estruturar o projeto com Next.js 15, Tailwind CSS, TypeScript e a engine Web Audio API para tocar samples de violão sem latência.

- [x] Definição de requisitos e alinhamento (*Grill-Me* concluído).
- [x] Criação de documentos mestres (`PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `CLAUDE.md`).
- [ ] Inicialização do template Next.js 15 App Router + Tailwind CSS v4.
- [ ] Implementação da classe `AudioEngine` com decodificação de `AudioBuffer` e fallback de síntese acústica.
- [ ] Catalogação e inclusão dos primeiros samples de violão (Notas naturais e principais acordes em `public/audio/`).

---

## 🎯 Fase 1: MVP — Modo Prática Livre / Arcade (Foco Atual)
> **Objetivo**: Entregar uma ferramenta funcional, viciante e sem atrito para o usuário treinar diariamente no navegador ou celular.

- [ ] **Interface do Quiz (Arcade)**:
  - Botão de áudio central com feedback visual de ondas sonoras.
  - Grade de 4 opções de múltipla escolha com efeito 3D Duolingo (`ChoiceCard`).
  - Banner inferior animado com feedback imediato de acerto/erro.
- [ ] **Duas Trilhas Independentes**:
  - Aba de **Notas**: Filtros para Notas Naturais e Sustenidos/Bemóis.
  - Aba de **Acordes**: Filtros para Tríades Maiores, Menores e Tétrades (7ªs).
- [ ] **HUD & Gamificação Leve**:
  - Contador de *Streak* (chama animada que se intensifica).
  - Recorde pessoal da sessão.
  - Medidor de taxa de acerto (%) e total de perguntas respondidas.
- [ ] **Atalhos de Teclado**:
  - Teclas `1`, `2`, `3`, `4` para responder e `Espaço` para reouvir.
- [ ] **Persistência Local**:
  - Salvar progresso, preferências e recordes no `localStorage` via Zustand.
- [ ] **Deploy Vercel**:
  - Configuração de build e publicação online pronta para uso.

---

## 🌟 Fase 2: Expansão — Trilha Gamificada Duolingo (V1)
> **Objetivo**: Adicionar a jornada pedagógica linear com progressão estruturada, coroas e senso de conquista.

- [ ] **Mapa de Aprendizado (The Path)**:
  - Árvore vertical de lições conectadas por nós interativos.
  - Nós bloqueados que se abrem ao atingir 80%+ de precisão na fase anterior.
  - Unidade 1: "As Cordas Soltas do Violão (Mi, Lá, Ré, Sol, Si, Mi)".
  - Unidade 2: "Primeiras Tríades: Dó Maior vs Lá Menor".
  - Unidade 3: "Acordes Maiores vs Menores Abertos".
  - Unidade 4: "O Som da Sétima (Tensão e Resolução)".
- [ ] **Sistema de Vidas (Corações)**:
  - 5 corações diários; errar consome 1 coração (com modo de prática para recuperar vidas).
- [ ] **Ofensiva Diária (Daily Streak)**:
  - Notificação local ou marcação de calendário de dias consecutivos praticando.
- [ ] **Estrelas e Níveis de Maestria**:
  - Cada lição pode ser completada em até 3 estrelas (Bronze, Prata, Ouro).

---

## 🎸 Fase 3: Visualizador do Braço do Violão (Fretboard)
> **Objetivo**: Conectar a percepção auditiva à memória visual do instrumento.

- [ ] **Componente Interativo do Braço da Guitarra (Fretboard)**:
  - Visualização de casas e cordas (nylon e aço).
  - Modo opcional onde a resposta pode ser dada clicando na casa e corda correspondente.
- [ ] **Diagrama de Acordes (Cifras & Shapes)**:
  - Ao acertar ou errar um acorde, exibir o shape/diagrama de dedos no braço do violão.
- [ ] **Variações de Reprodução**:
  - Botão para alternar entre "Acorde Batido" (todas as cordas de uma vez) e "Acorde Dedilhado" (arpejo corda a corda).

---

## ☁️ Fase 4: Nuvem, Social & Áudio Avançado (V2)
> **Objetivo**: Sincronização multidispositivo, competição amigável e timbres personalizados.

- [ ] **Autenticação e Nuvem**:
  - Login social (Google / GitHub) com Supabase para sincronizar progresso entre celular e computador.
- [ ] **Ligas Semanais e Leaderboard**:
  - Competição de XP semanal com outros músicos.
- [ ] **Seletor de Instrumentos**:
  - Pacote de Timbre 1: Violão de Nylon Clássico.
  - Pacote de Timbre 2: Violão Folk de Aço.
  - Pacote de Timbre 3: Guitarra Elétrica Clean (Stratocaster/Les Paul).
- [ ] **Detector de Pitch via Microfone**:
  - O app toca a nota e o usuário responde tocando em seu próprio violão real.
