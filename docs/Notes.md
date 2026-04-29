
This file is for human study only and does not have
pertinent information about the app.

### Notes: Phase 1

* seed project in direct mode 
* `sbx create --name=sandbox claude .`
* `sbx run sandbox`
* in Claude: formulate plan for Scaffolding
    - it could not install sbt due to network
    - but it did generate the code
    - i'm running from host: `./run-app.sh`
    - it could not confirm cloudflare CDN so used `npm` instead
      to get local versions of JS libs
* a few errors but basically works
* on host, `/init` to generate `CLAUDE.md` etc
* in sandbox: generated PR and pushed to GitHub

### Notes: Phase 2 

- next goal: add palidromic in two worktrees 
- first part of Section 9: not yet parallel

- front
- `sbx run math-tidbits-v1 --branch=palindrome-front-end`
    - confirm with `git worktree list`
    - stop sandbox
    - `cd` into worktree folder and run app to verify
    - `gdt` to see changes 
    - `git add`, `git commit`, `git push origin palindrome-front-end`
    - create PR on GitHub and merge

- back
- `sbx run math-tidbits-v1 --branch=palindrome-back-end`
- entirely analogous

### Notes: Phase 2.b: unify in one branch in parallel
