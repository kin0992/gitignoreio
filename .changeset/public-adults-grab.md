---
"gitignoreio-sdk": minor
---

Change the `generate` return type to a Promise.
With this change the user of the SDK do not have to know or use `neverthrow`.
It is enough to properly handle the Promise instead.

> [!NOTE]
> Even though this would be a major update since the contract has changed,
> I decided to bump a minor instead, following the [SemVer specification](https://semver.org)
> which allows to change the contract when the major is under `1`.