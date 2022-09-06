# Front-end Phase 3 -  Emoji Inventory

A simple typescript and React web application. This web app has follows the Next.js framwork, containing its own database of emojis and api functions. You can type in a key word and the web app will retrieve a list of emojis related to the word. Add or delete from your favourite list of emojis. 

Try `face`, `car` or `left` or just type one letter and it will return all emojis with name containing that letter. 

## Advanced Features List
- [x] UI Scalability with window size 
- [x] Mobile first development (using media query breakpoints, etc)
- [ ] Storybook w/ both actions and interactions (play)
- [x] Progressive Web App (PWA) functionality w/ clear use of the service worker
- [x] API connection to your own API that is cloud hosted
- [ ] Comprehensive unit testing
- [ ] OAuth2 with PKCE login w/ at least ONE third party provider
- [ ] Clear usage of Websockets
- [x] At least one fluid animation
- [ ] Redux state management
- [ ] Demonstration of complex FE logic

## UI Scalability with window size 
The layout of the web app changes as window size changes, from having a single column and collapsable section in mobile view to having side by side sections in desktop and tablet view. As well as a few details in margin and padding.

## Mobile first development (using media query breakpoints, etc)
Components are styled for mobile first and uses breakpoints to adjust style when the window size is bigger or equal to a tablet screen.

## Progressive Web App (PWA) functionality w/ clear use of the service worker
The web app uses a service worker, passes the lighthouse report with all aspect of a PWA.

## API connection to your own API that is cloud hosted
The web app uses the Next.js framework and is deployed to Vercel https://msafrontendfinal.vercel.app/. The `favouriteAPI` contains endpoints to the `favouriteEmojis` database which records a users favourite emojis. The `emojiAPI` contains endpoints to the `emojis` database which are all the emojis an user can search for. 

## At least one fluid animation
Fluid animation is achived in the favourite emojis section using `Slide` component from React, the emoji cards slide up when they are added to the favourite list and when user click the `Show` switch in mobile view. 
