---
"gitignoreio-sdk": minor
---

Enforce type of generate function

Now it does not accept an empty array as input, which would lead to an invalid request to the API.
Moreover, the input array values are now strictly typed to match the available templates.