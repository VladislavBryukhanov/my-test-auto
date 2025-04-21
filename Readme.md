# Auto Package Version Committer

Automatically updates the specified package version in a GitHub repository’s `package.json` and commits the change via GitHub API.

## Usage

Run the app with:

```bash
npm start -- \
  --packageName=dotenv \
  --packageVersion=16.4.0 \
  --repoName=my-test-auto \
  --repoOwner=client-repo \
  --targetBranch=master
```

## Arguments

- `--packageName` – The name of the package you want to update
- `--packageVersion` – The new version of the package
- `--repoName` – The name of client\'s GitHub repository
- `--repoOwner` – The GitHub username or organization that owns the repo
- `--targetBranch` – (Optional) Target branch for the update. Defaults to main if not provided.


## Environment Variables

Create `.env` with the following variables:

```
COMPANY_NAME=my-company-name
FEATURE_BRANCH_PREFIX=audit-version/upgrade
```

Sample: `.env.sample`

## Linting

ESLint is used with pre-commit hooks. Run manually with:

```bash
npm run lint
```

## Demo Video Available
> A demo video is available in the `docs/` folder.
> [▶ Watch Demo](docs/demo.mp4)
