# Git-Me-Template

![image](https://user-images.githubusercontent.com/31360789/110181248-3b7a5d80-7dc0-11eb-9bcc-903292f53a1a.png)

## Table of Contents

- [About](#about)
- [Refs](#refs)

## About <a name = "about"></a>

There is no template for making a PR on the GitHub. So I want to make a crome extension to handle this then make my life easier.

- Copy / Paste the jira link then it will handle for you.
- Click `copy`, then you can paste the template to your PR.
- Click `clear` to clean the inputs.
- No need to worry about the data lost, as it's all saved in `localStorage`.

### Installing

- pull the repo
- `npm install`
- `npm start` will generate a `dev` folder.
- Install the extension to your chrome browser.
  Following this [link](https://developer.chrome.com/docs/extensions/mv3/getstarted/#manifest)

> Select the `dev` folder.

![image](https://user-images.githubusercontent.com/31360789/110181495-cc513900-7dc0-11eb-9dd1-2b3ae7549a20.png)

## Refs <a name = "refs"></a>

- PR Template

```
**Resolves:**

<Bullet list of what this PR resolves>

**Changes:**

<Bullet list of changes made>

**References:**

<Bullet list of related tickets>
```

- UI

1. [material-ui-chip-input](https://github.com/TeamWertarbyte/material-ui-chip-input)

- Main Library

1. [create-react-extension](https://github.com/VasilyShelkov/create-react-extension)
