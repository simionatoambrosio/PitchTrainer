---
design_system:
  name: "PitchTrainer Duolingo-Acoustic Design System"
  version: "1.0.0"
  description: "Sistema de design gamificado inspirado no Duolingo com identidade acústica para músicos de violão e guitarra."
  tokens:
    colors:
      background:
        default: "#0B0F19"
        elevated: "#111827"
        subtle: "#1F2937"
      surface:
        card: "#182234"
        card_hover: "#223049"
        border: "#2E3F5B"
      primary:
        main: "#10B981"
        hover: "#059669"
        active: "#047857"
        border: "#065F46"
        contrast: "#FFFFFF"
      secondary:
        main: "#6366F1"
        hover: "#4F46E5"
        border: "#3730A3"
        contrast: "#FFFFFF"
      accent_streak:
        main: "#F59E0B"
        glow: "#FBBF24"
        dark: "#B45309"
      feedback:
        success_bg: "#064E3B"
        success_text: "#34D399"
        success_border: "#059669"
        error_bg: "#7F1D1D"
        error_text: "#F87171"
        error_border: "#DC2626"
      text:
        primary: "#F9FAFB"
        secondary: "#9CA3AF"
        muted: "#6B7280"
        inverse: "#0B0F19"
    typography:
      fonts:
        display: "Outfit, 'SF Pro Display', sans-serif"
        body: "Inter, 'SF Pro Text', sans-serif"
        mono: "JetBrains Mono, monospace"
      sizes:
        xs: "0.75rem"
        sm: "0.875rem"
        base: "1rem"
        lg: "1.125rem"
        xl: "1.25rem"
        "2xl": "1.5rem"
        "3xl": "1.875rem"
        "4xl": "2.25rem"
      weights:
        regular: 400
        medium: 500
        semibold: 600
        bold: 700
        extrabold: 800
    radii:
      sm: "8px"
      md: "12px"
      lg: "16px"
      xl: "20px"
      pill: "9999px"
    shadows:
      card: "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)"
      card_3d: "0 4px 0 #1B2940"
      card_3d_pressed: "0 0 0 transparent"
      btn_primary_3d: "0 4px 0 #047857"
      btn_primary_pressed: "0 0 0 transparent"
      streak_glow: "0 0 16px rgba(245, 158, 11, 0.4)"
    motion:
      duration_fast: "150ms"
      duration_normal: "250ms"
      duration_bouncy: "400ms"
      easing_spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"
      easing_default: "cubic-bezier(0.4, 0, 0.2, 1)"
---

# 🎨 DESIGN.md — Especificação Visual do PitchTrainer

Este documento segue as especificações do padrão **Stitch Design System (Google Labs)**. Ele atua como o contrato de design para desenvolvedores humanos e agentes de IA (Claude Code, Cursor).

---

## 1. Filosofia Visual & Conceito

O visual do PitchTrainer combina duas atmosferas:
1. **O Lúdico & Tátil do Duolingo**: Botões com efeito tridimensional de clique (estilo tecla mecânica/chiclete), contadores de ofensiva (*streak flame*), feedbacks sonoros e visuais imediatos.
2. **A Elegância de um Estúdio Musical**: Tema escuro profundo (*Deep Slate* `#0B0F19`), detalhes com texturas de cordas e vibração sonora, evitando cores genéricas e infantis.

---

## 2. Componentes Centrais do Projeto

### 2.1 Botão de Escolha Tátil (`ChoiceCard`)
O elemento primário de interação do quiz. Possui aspecto 3D que "afunda" ao ser clicado, exatamente como os botões do Duolingo.

#### Anatomia:
- Borda grossa inferior simulando profundidade 3D (`border-b-4`).
- Label grande e legível da nota/cifra (ex: **Am**, **C**, **G7**).
- Tecla de atalho discreta no canto superior direito (`[1]`, `[2]`, `[3]`, `[4]`).

#### Estados:
| Estado | Cores de Fundo / Texto | Borda Inferior / Elevação |
| :--- | :--- | :--- |
| **Default** | `bg-[#182234]` / `text-white` | `border-b-4 border-[#2E3F5B]` |
| **Hover** | `bg-[#223049]` / `text-white` | Leve elevação sem afundar |
| **Pressed / Active** | `translate-y-1` | `border-b-0` (efeito de tecla pressionada) |
| **Correto (Sucesso)** | `bg-[#064E3B]` / `text-[#34D399]` | `border-b-4 border-[#059669]` + escala elástica |
| **Incorreto (Erro)** | `bg-[#7F1D1D]` / `text-[#F87171]` | `border-b-4 border-[#DC2626]` + animação de shake |
| **Desabilitado** | `opacity-50 pointer-events-none` | Borda plana |

---

### 2.2 Botão Central de Áudio (`SoundTriggerHero`)
O elemento que toca o som de violão do desafio atual.

#### Anatomia:
- Círculo de grande dimensão (96px a 112px de diâmetro).
- Ícone de alto-falante ou corda vibrando em rotação/pulso.
- Anéis concêntricos animados (`ping` sutil) quando o áudio está tocando.
- Botão secundário de apoio: *"Ouvir Novamente (Espaço)"*.

---

### 2.3 Medidor de Ofensiva & HUD (`StreakFlameBadge`)
Mostra a sequência atual de acertos e a taxa de precisão.

#### Anatomia:
- Badge com fundo pill (`rounded-full`).
- Ícone de fogo (`Flame` do Lucide) animado em tons de âmbar dourado (`#F59E0B`).
- Quando `streak >= 5`: ativação de efeito de brilho externo (`shadow-streak_glow`) e partículas de fogo.
- Contador de precisão: `85% Precisão (17/20)`.

---

### 2.4 Banner de Feedback Inferior (`FeedbackBanner`)
Aparece deslizando da borda inferior da tela após a resposta, idêntico à experiência mobile do Duolingo.

#### Variação de Sucesso:
- Fundo: `bg-[#064E3B]` com borda superior `border-[#059669]`.
- Ícone de check circular verde com micro-animação de mola.
- Texto: *"Na mosca! Essa foi a nota Sol (G)."*
- Botão "Continuar" em verde brilhante com foco automático (tecla Enter).

#### Variação de Erro:
- Fundo: `bg-[#450A0A]` com borda superior `border-[#991B1B]`.
- Ícone de X circular vermelho.
- Texto: *"Quase lá! A resposta correta era Lá Menor (Am)."*
- Botão "Entendi" com foco para a próxima pergunta.

---

## 3. Diretrizes de UX Writing & Microcopy

1. **Voz Encorajadora e Musical**: Nunca faça o usuário se sentir punido por errar um tom. Ouvido musical é músculo, leva repetição.
   - *Evite*: "Você errou. Tente novamente."
   - *Use*: "Não foi dessa vez! Escute a ressonância da terça menor."
2. **Clareza de Notação**:
   - Forneça sempre o par visual quando relevante: `Dó (C)` ou opção de configurar no menu.
3. **Labels de Ação Sucintas**:
   - Botões sempre no imperativo claro: *"Ouvir Novamente"*, *"Continuar"*, *"Começar Treino"*.

---

## 4. Regras de Design: Do's and Don'ts

### ✅ Do's
- **Faça**: Use sempre animações de mola com física realista (`cubic-bezier(0.34, 1.56, 0.64, 1)`) nas respostas corretas.
- **Faça**: Deixe as áreas de toque (tap targets) com no mínimo **52px de altura** para uso confortável em smartphones.
- **Faça**: Mostre atalhos de teclado numéricos (1, 2, 3, 4) para quem está no computador com fone de ouvido.
- **Faça**: Mantenha o contraste de cores acessível segundo WCAG AA mesmo no tema escuro.

### 🚫 Don'ts
- **Não faça**: Nunca use botões planos sem estado de clique (eles parecem estáticos e quebram a sensação de jogo).
- **Não faça**: Não use sons de sintetizador estéricos sem aviso; o violão acústico é a promessa central do app.
- **Não faça**: Não crie modais de login obrigatórios que impeçam o usuário de praticar no primeiro segundo de acesso.
- **Não faça**: Não esconda o botão de reouvir o áudio; no treino de percepção, a repetição atenta é essencial.
