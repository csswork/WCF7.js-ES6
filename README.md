# WPCF.js
Use ES6 to implement the Ajax feature of Wordpress Contact form 7.


### Using package managers

Install `wpcf.js` package:
* `npm install wpcf.js`

Import script wpcf.js:
```js
import Form from 'wpcf.js';

// The parameter "url" is the address of your website, which you can get this one for using the wordpress method "<?= home_url() ?>".
let forms = document.querySelectorAll('.wpcf7');
forms.forEach(e => {
    var wpcf = new Form(e, url);
    wpcf.init();
});
```

