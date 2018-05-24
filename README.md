# cacheblejs

This javascript lib allows to use local persistance storage, with fallback to cookies (since some browser don't have it, or is desactivated local storage).

To use it is very simple, just you need to define a namesapce for your persistance, and the value to stock :

 `setStateValue('myApp','userName', 'jeandarc');`

The value is stored in a json string object. And if it exist, it will override it.

To get the value back, the same, just the namespace and the key name :

`getStateValue('myApp','userName');`
