# SeenIt
A simple, blog style website with basic functionality using Google firestore as a database.
Available to test [HERE](https://seenit-9e81d.web.app "SeenIt Home")

## Overview
---
SeenIt is a small website built as a portfolio project and for personal development. Below I have outlined just a few of the many key learning points I encountered throughout the project. The primary objectives during its development have been to tackle working with TypeScript and including firebase functionality for persistent user experience.

In addition to these overarching objectives, after looking at similar sites that have a blog like basis such as Medium and Reddit, the implementation of modern website techniques like infinite scroll, became an additional target. A huge amount of research went into this side of the site, and some design choices have specifically been made with these outcomes in mind. 

One example of this is the method for retrieving comments associated with a post. The comment IDs associated with a post are stored within a comment array on the post document, and this array would then loop through and retrieve all the comments based on a query for the ID and display them. To practice the inclusion of an infinite scroll, I adapted this to query the comment database in order of timestamp to match comments where postID is equal to comment.postID.

Another major evolution within my knowledge of React was in the understanding and use of custom hooks. I targeted creating multiple hooks which would allow my code to have clear compartmentalization and support future maintainability. Ultimately I believe I have achieved this to some degree, however strictly speaking some of these hooks:

- useComments
- usePosts
- useUsers

do not keep track of states and as such may not strictly be seen as hooks at all. I did however feel it best to compartmentalize these modules in the same way to separate significant portions of the firebase functionality.
***
## Technology
This website has been built primarily using the following technology to support the functionality of the website and the structure of the code base:
- React
- Typescript
- SCSS
- Firebase Firestore
- Firebase Storage
- ESLint/Prettier
***
### License

MIT License

Copyright (c) 2023 MBright90

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
