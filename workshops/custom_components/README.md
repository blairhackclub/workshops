---
title: 'Custom Components'
thumbnail: 
description: 'An example workshop showcasing custom components.'
author: 'linkai101'
date: '2021-5-26'
---

# Here is a custom component.

<OrpheusInput/>

If you type `orpheus` in the input box above, you should see an image of orpheus!

This is a custom React component that you can code and implement into your workshop yourself! This can be useful if you want the user to engage and play around with your workshop. For example, you can create a custom component to create a short quiz or a working demo of your workshop.

## So how?
You have to have a good understanding of Javascript and React to be able to do this. Feel free to ask someone for help if you don't!

To create a custom component in your workshop, create a file in your workshop folder called `components.js`. In this file, add the following:
```
import OrpheusInput from './OrpheusInput';

export default {
  OrpheusInput,
};

```
(`OrpheusInput` is an example component. Delete this when you are adding your own components.)

This is where all your custom components are imported to the workshops site.

You can add your components straight to this file or create separate component files inside of your workshop folder and import them at the top.

Then, add each of the components to the `export default` object, where all of the components will be imported to the site.

Finally, in the `README.md` file, add the React component anywhere on the page. For example, you can add it like this: `<OrpheusInput/>`. (It has to be on a separate line.)\

## That's it!
It's that easy! Still confused? Check out the source code by clicking "Edit on GitHub" below or get help on our [Discord](https://bhc.page.link/discord).