# 📇 ListContacts App - Angular 21
![site](https://github.com/katianne23/list-contact-angular/blob/main/public/preview.png)

> 💻 Uma aplicação moderna de lista de contatos construída com as últimas features do **Angular**, demonstrando boas práticas e padrões atuais de desenvolvimento.

Este projeto tem caráter educacional e faz parte do meu aprendizado em Angular.

[Clique aqui para acessar](list-contact-angular.vercel.app)


## 🎯 Objetivo do Projeto

Demonstrar proficiência em desenvolvimento Angular moderno, implementando:
- Standalone components (sem NgModules)
- Zoneless change detection
- Estratégias de cache e otimização
- Formulários reativos complexos
- Design system próprio

## 🚀 Features Implementadas
```
### 1. **Sistema de Cache Inteligente**
// Cache no localStorage com expiração de 5 minutos
// Atualização em background sem bloquear UX

 2. Formulários com UX Avançada
Validação em tempo real
Feedback visual imediato
Radio buttons customizados para categorias

3. Busca Otimizada
Filtro por múltiplos campos
Debounce implícito
Performance com track by id

4. Design System Próprio
Cards com animações progressivas
Avatares com iniciais
Tags coloridas por categoria
```
🔧 Configuração e Execução
bash
#### Instalar dependências
npm install

#### Rodar desenvolvimento
ng serve

#### Build de produção
ng build

📊 Decisões Técnicas
- Standalone Components: 	Menos boilerplate, melhor tree-shaking
- Zoneless Change: Detection	Preparação para futuro, performance
- Cache no localStorage: Experiência offline-first
- Reactive Forms:	Mais controle e testabilidade
- Control Flow Syntax:	Sintaxe mais limpa, melhor performance

🎨 UI/UX Design
Princípios Aplicados
- Feedback Imediato: Spinners, validações em tempo real
- Consistência: Design system uniforme
- Eficiência: Cache e otimizações
- Acessibilidade: Semântica HTML, contraste adequado

Componentes UI
- Cards com animações em cascade
- Sistema de tags por categoria
- Botões de ação com ícones
- Formulários com validação visual

📚 Aprendizados
Este projeto foi desenvolvido para explorar:
- Angular sem Zone.js
- Estratégias de cache real-world
- Padrões de formulários complexos
- Nova sintaxe de templates
- Performance optimization

## :memo: Licença

Esse projeto está sob a licença MIT.

Katianne Araújo

---
