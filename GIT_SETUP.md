# Git Repository Setup - SchemeSeeker

## ✅ Git Configuration Complete

Your local SchemeSeeker project is now connected to the GitHub repository.

### Repository Details

**Repository URL**: `git@github.com:itzmeahammed/scheme-seeker-v2.git`  
**Branch**: `main`  
**Initial Commit**: `1c229db` - SchemeSeeker v1.0.0 - Government Schemes Discovery Platform

## 📋 Git Setup Summary

### What Was Done

1. ✅ **Git Repository Initialized**
   - Initialized empty Git repository in `.git/` directory
   - Configured for SSH authentication

2. ✅ **Remote Repository Added**
   - Remote name: `origin`
   - Remote URL: `git@github.com:itzmeahammed/scheme-seeker-v2.git`
   - Fetch and Push configured

3. ✅ **Main Branch Created**
   - Renamed default branch to `main`
   - All commits will be on the `main` branch

4. ✅ **Git Configuration**
   - User email: `dev@schemeseeker.com`
   - User name: `SchemeSeeker Dev`

5. ✅ **Initial Commit**
   - 72 files committed
   - Includes all source code, configuration, and documentation
   - Commit message: "Initial commit: SchemeSeeker v1.0.0 - Government Schemes Discovery Platform"

## 🔧 Common Git Commands

### Checking Status
```bash
# Check current status
git status

# View commit history
git log --oneline

# View remote configuration
git remote -v

# View current branch
git branch -a
```

### Making Changes
```bash
# Stage all changes
git add .

# Stage specific file
git add src/App.tsx

# Commit changes
git commit -m "Your commit message"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main
```

### Creating Branches
```bash
# Create new branch
git checkout -b feature/your-feature-name

# Switch to branch
git checkout main

# Delete branch
git branch -d feature/your-feature-name

# Push branch to remote
git push origin feature/your-feature-name
```

### Undoing Changes
```bash
# Discard changes in working directory
git checkout -- src/App.tsx

# Unstage changes
git reset HEAD src/App.tsx

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

## 📝 Commit Message Guidelines

Follow conventional commits format:

```
type(scope): subject

body

footer
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, etc.

### Examples
```bash
# Feature commit
git commit -m "feat(landing): add orange-green color scheme"

# Bug fix commit
git commit -m "fix(routes): correct dashboard route navigation"

# Documentation commit
git commit -m "docs(readme): update installation instructions"

# Refactor commit
git commit -m "refactor(auth): simplify login component logic"
```

## 🔐 SSH Authentication Setup

### If SSH Keys Are Not Set Up

1. **Generate SSH Key** (if you don't have one)
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

2. **Add SSH Key to SSH Agent**
```bash
# Windows (Git Bash)
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_ed25519

# Or use Windows SSH agent
ssh-add C:\Users\YourUsername\.ssh\id_ed25519
```

3. **Add Public Key to GitHub**
   - Copy public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to GitHub Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste the public key

4. **Test Connection**
```bash
ssh -T git@github.com
```

## 📦 Workflow

### Daily Development Workflow

1. **Start your day**
```bash
git pull origin main
```

2. **Create feature branch**
```bash
git checkout -b feature/your-feature
```

3. **Make changes and commit**
```bash
git add .
git commit -m "feat(component): add new feature"
```

4. **Push to remote**
```bash
git push origin feature/your-feature
```

5. **Create Pull Request on GitHub**
   - Go to repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Add description and submit

6. **After PR is merged**
```bash
git checkout main
git pull origin main
git branch -d feature/your-feature
```

## 🔄 Syncing with Remote

### Pull Latest Changes
```bash
git pull origin main
```

### Push Your Changes
```bash
git push origin main
```

### Fetch Without Merging
```bash
git fetch origin
```

### Rebase Instead of Merge
```bash
git pull --rebase origin main
```

## 🐛 Troubleshooting

### SSH Connection Issues
```bash
# Test SSH connection
ssh -T git@github.com

# Verbose output for debugging
ssh -vT git@github.com
```

### Authentication Failed
```bash
# Clear cached credentials
git credential reject git@github.com

# Re-authenticate
git push origin main
```

### Merge Conflicts
```bash
# View conflicted files
git status

# Edit files to resolve conflicts
# Then stage and commit
git add .
git commit -m "fix: resolve merge conflicts"
```

### Undo Last Push
```bash
# Only if not pushed yet
git reset --soft HEAD~1

# If already pushed (creates new commit)
git revert HEAD
git push origin main
```

## 📊 Repository Statistics

- **Total Commits**: 1
- **Total Files**: 72
- **Main Branch**: Active
- **Remote**: Connected to GitHub
- **Authentication**: SSH

## 🔗 Useful Links

- [GitHub Repository](https://github.com/itzmeahammed/scheme-seeker-v2)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [Conventional Commits](https://www.conventionalcommits.org)

## 📝 Next Steps

1. **Push to GitHub** (when ready)
```bash
git push -u origin main
```

2. **Set up GitHub Actions** (optional)
   - Create `.github/workflows/` directory
   - Add CI/CD workflows

3. **Create Branch Protection Rules** (optional)
   - Require pull request reviews
   - Require status checks to pass

4. **Add Collaborators** (if needed)
   - Go to Settings → Collaborators
   - Add team members

## 🎯 Best Practices

✅ **Do**
- Commit frequently with meaningful messages
- Pull before pushing
- Create feature branches for new work
- Write descriptive commit messages
- Review changes before committing

❌ **Don't**
- Commit directly to main
- Use vague commit messages like "fix" or "update"
- Force push to shared branches
- Commit sensitive information (API keys, passwords)
- Ignore merge conflicts

## 📞 Support

For issues with Git setup, refer to:
- [Git Official Documentation](https://git-scm.com)
- [GitHub Help](https://help.github.com)
- [Stack Overflow Git Tag](https://stackoverflow.com/questions/tagged/git)

---

**Setup Date**: November 2024  
**Repository**: scheme-seeker-v2  
**Status**: ✅ Ready for Development
