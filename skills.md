# Relevant Skills for Baseline Project

## Project Stack Summary
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- better-auth
- TanStack Query & Form
- tRPC

---

## Highly Relevant Skills

### 1. nextjs-app-router-patterns
```bash
npx skills add https://github.com/wshobson/agents --skill nextjs-app-router-patterns
```
**Why:** Direct match - project uses Next.js 16 with App Router

### 2. shadcn-ui
```bash
npx skills add https://github.com/giuseppe-trisciuoglio/developer-kit --skill shadcn-ui
```
**Why:** Direct match - project uses shadcn/ui components throughout

### 3. tailwind-design-system
```bash
npx skills add https://github.com/wshobson/agents --skill tailwind-design-system
```
**Why:** Direct match - project uses Tailwind CSS 4 for styling

### 4. react-state-management
```bash
npx skills add https://github.com/wshobson/agents --skill react-state-management
```
**Why:** Project uses React 19 with TanStack Query for state/data management

### 5. create-auth-skill (better-auth)
```bash
npx skills add https://github.com/better-auth/skills --skill create-auth-skill
```
**Why:** Direct match - project uses better-auth for authentication

### 6. react-modernization
```bash
npx skills add https://github.com/wshobson/agents --skill react-modernization
```
**Why:** Project uses React 19 with modern patterns (React Compiler, Server Components)

---

## Moderately Relevant Skills

### 7. frontend-design
```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
```
**Why:** General frontend design patterns applicable to React/Next.js

### 8. visual-design-foundations
```bash
npx skills add https://github.com/wshobson/agents --skill visual-design-foundations
```
**Why:** Helpful for UI/UX consistency

### 9. test-driven-development
```bash
npx skills add https://github.com/obra/superpowers --skill test-driven-development
```
**Why:** Good practice for maintaining code quality

### 10. nodejs-backend-patterns
```bash
npx skills add https://github.com/wshobson/agents --skill nodejs-backend-patterns
```
**Why:** Useful for tRPC API patterns and server-side logic

---

## NOT Relevant (Skip These)

| Skill | Reason |
|-------|--------|
| `vue` (antfu/skills) | Project uses React, not Vue |
| `building-native-ui` (expo/skills) | This is a web app, not React Native |
| `native-data-fetching` (expo/skills) | This is a web app, not React Native |
| `ui-ux-pro-max` | Generic, less focused than other options |
| `seo-audit` | Lower priority for initial development |
| `email-best-practices` | Only relevant if email features are added |
| `web-design-guidelines` (vercel-labs) | Overlaps with other more specific skills |
| `web-design-guidelines` (antfu) | Overlaps with other more specific skills |
| `frontend-design` (claude-code) | Duplicate of anthropics version |

---

## Recommended Installation Order

Run these commands in order of priority:

```bash
# Essential (install first)
npx skills add https://github.com/wshobson/agents --skill nextjs-app-router-patterns
npx skills add https://github.com/giuseppe-trisciuoglio/developer-kit --skill shadcn-ui
npx skills add https://github.com/wshobson/agents --skill tailwind-design-system
npx skills add https://github.com/better-auth/skills --skill create-auth-skill

# Recommended
npx skills add https://github.com/wshobson/agents --skill react-state-management
npx skills add https://github.com/wshobson/agents --skill react-modernization

# Optional
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/wshobson/agents --skill visual-design-foundations
npx skills add https://github.com/obra/superpowers --skill test-driven-development
```
