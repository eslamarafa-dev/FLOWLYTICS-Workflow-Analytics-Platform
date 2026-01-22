# 🤝 Contributing to FLOWLYTICS

First off, thank you for considering contributing to FLOWLYTICS! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by respect, professionalism, and collaboration.

### Our Standards

- ✅ Using welcoming and inclusive language
- ✅ Being respectful of differing viewpoints
- ✅ Gracefully accepting constructive criticism
- ✅ Focusing on what is best for the community

---

## 🚀 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Browser/OS** information

**Example:**
```markdown
## Bug: Dark mode toggle not persisting

**Steps to reproduce:**
1. Open the app
2. Toggle to dark mode
3. Refresh the page

**Expected:** Dark mode should persist
**Actual:** Reverts to light mode

**Browser:** Chrome 120.0.0
**OS:** Windows 11
```

### 💡 Suggesting Features

Feature suggestions are welcome! Please include:

- **Use case** - Why is this feature needed?
- **Proposed solution** - How should it work?
- **Alternatives** - Other ways to solve this
- **Impact** - Who benefits from this?

---

## 🛠️ Development Setup

### Prerequisites

- Modern browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)
- Git

### Getting Started

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/flowlytics.git
cd flowlytics

# 3. Create a branch for your feature
git checkout -b feature/amazing-feature

# 4. Start development server
npx serve
# Or
python -m http.server 3000

# 5. Open http://localhost:3000
```

### Project Structure

```
flowlytics/
├── index.html           # Entry point
├── src/
│   ├── styles.css       # All styles & animations
│   ├── runtime.js       # Vanilla JS enhancements
│   └── react-app.jsx    # React application
├── README.md
├── DEPLOYMENT.md
└── CONTRIBUTING.md
```

---

## 📝 Coding Standards

### React Components

✅ **DO:**
```javascript
// Use functional components
const TaskItem = memo(({ task, onEdit, onDelete }) => {
  // Component logic
});

// Use descriptive names
const AnimatedProgressRing = ({ progress, size }) => { ... };

// Memoize expensive computations
const filteredTasks = useMemo(() => 
  tasks.filter(task => ...),
  [tasks, filters]
);
```

❌ **DON'T:**
```javascript
// Don't use class components
class TaskItem extends React.Component { ... }

// Don't use vague names
const Component1 = () => { ... };

// Don't recalculate on every render
const filteredTasks = tasks.filter(task => ...);
```

### CSS/Tailwind

✅ **DO:**
```html
<!-- Use Tailwind utility classes -->
<div class="px-6 py-4 rounded-xl bg-slate-800/50 backdrop-blur-xl">

<!-- Use custom CSS for complex animations -->
.animate-float {
  animation: float 4s ease-in-out infinite;
}
```

❌ **DON'T:**
```html
<!-- Don't inline complex styles -->
<div style="padding: 24px; background: rgba(30, 41, 59, 0.5);">

<!-- Don't create unnecessary custom classes -->
.my-custom-padding { padding: 24px; }
```

### JavaScript

✅ **DO:**
```javascript
// Use const/let (not var)
const API_URL = 'https://api.example.com';
let counter = 0;

// Use arrow functions
const handleClick = () => { ... };

// Use destructuring
const { isDark, toggle } = useTheme();

// Use template literals
const message = `Welcome, ${user.name}!`;
```

❌ **DON'T:**
```javascript
// Don't use var
var API_URL = 'https://api.example.com';

// Don't use function keyword unnecessarily
function handleClick() { ... }

// Don't concatenate strings
const message = 'Welcome, ' + user.name + '!';
```

---

## 📦 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(dashboard): add weekly performance chart

- Implemented animated bar chart
- Added hover effects
- Integrated with existing data flow

Closes #123

---

fix(tasks): resolve filter not working with Arabic text

The search filter was not properly handling Arabic characters
due to case-insensitive comparison issue.

Fixes #456

---

docs(readme): update installation instructions

Added npm serve alternative and troubleshooting section
```

### Emoji Guide (Optional but fun! 🎉)

- 🎉 `:tada:` - Initial commit
- ✨ `:sparkles:` - New feature
- 🐛 `:bug:` - Bug fix
- 📝 `:memo:` - Documentation
- 🎨 `:art:` - UI/UX improvements
- ⚡ `:zap:` - Performance
- ♻️ `:recycle:` - Refactoring
- 🔥 `:fire:` - Remove code/files
- 🚀 `:rocket:` - Deployment
- 🌐 `:globe_with_meridians:` - i18n/l10n

---

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows project coding standards
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] No console errors
- [ ] Tested on multiple browsers
- [ ] Responsive design verified
- [ ] Dark/Light mode both tested
- [ ] i18n works (EN/AR)

### PR Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Screenshots (if applicable)
![Before](url)
![After](url)

## Testing
How has this been tested?

- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Mobile
- [ ] Dark mode tested
- [ ] RTL tested

## Checklist
- [ ] My code follows the project style
- [ ] I have commented complex code
- [ ] No new warnings
- [ ] I have updated documentation
```

### Review Process

1. **Submit PR** with clear description
2. **Automated checks** will run (if configured)
3. **Code review** by maintainers
4. **Address feedback** if requested
5. **Merge** once approved ✅

---

## 🎯 Areas We Need Help

### High Priority

- [ ] Add unit tests (Jest + React Testing Library)
- [ ] Improve accessibility (ARIA labels, keyboard navigation)
- [ ] Add more chart types (Line, Pie, Doughnut)
- [ ] Implement data export (CSV, PDF)

### Medium Priority

- [ ] Add user authentication flow (mock)
- [ ] Implement real-time updates simulation
- [ ] Add more themes (Solarized, Nord, etc.)
- [ ] Enhance mobile experience

### Low Priority

- [ ] Add more languages (French, German, Spanish)
- [ ] Create Storybook for components
- [ ] Add E2E tests (Playwright/Cypress)

---

## 💬 Questions?

Feel free to:
- Open an [issue](https://github.com/YOUR-USERNAME/flowlytics/issues)
- Start a [discussion](https://github.com/YOUR-USERNAME/flowlytics/discussions)
- Contact me via [email](mailto:your.email@example.com)

---

## 🙏 Thank You!

Every contribution, no matter how small, makes a difference.

**Happy coding! 💻✨**
