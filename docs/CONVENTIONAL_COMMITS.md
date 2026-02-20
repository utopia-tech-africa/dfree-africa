# Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to keep commit history consistent and enable automated changelogs.

## Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

- **type** (required): What kind of change
- **scope** (optional): Affected area (e.g. `web`, `hero`, `api`)
- **subject** (required): Short description (max 100 chars, lowercase, no period at end)

## Allowed Types

| Type       | Use for                                     |
| ---------- | ------------------------------------------- |
| `feat`     | New feature                                 |
| `fix`      | Bug fix                                     |
| `docs`     | Documentation only                          |
| `style`    | Formatting, whitespace (no code change)     |
| `refactor` | Code change that doesn't fix or add feature |
| `perf`     | Performance improvement                     |
| `test`     | Adding or updating tests                    |
| `build`    | Build system or dependencies                |
| `ci`       | CI config changes                           |
| `chore`    | Other maintenance tasks                     |
| `revert`   | Reverting a previous commit                 |

## Examples

```
feat: add hero section

feat(web): add mobile hero image

fix: resolve button asChild error

fix(hero): correct image sizing on mobile

docs: update README setup instructions

refactor: simplify hero layout

chore: update dependencies
```

## Rules

- Use lowercase for subject
- No period at the end of the subject
- Keep subject under 100 characters
- Use imperative mood ("add" not "added", "fix" not "fixed")
