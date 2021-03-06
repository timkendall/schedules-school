schedules-school
================

This is the school facing web app for [Schedules](https://github.com/timkendall/schedules). Schools will use this web app to manage their database of courses


## Progress
- [ ] initial design *in progress*
- [ ] student to advisor chat *planned*


## Required tools
* NPM - Node.js package manager; should be installed when you install node.js.
* Bower - Web package manager. Installing [Bower](http://bower.io/) is simple when you have `npm`:

```
$ npm install -g bower
```

* Bourbon - Sass framework (should be included as a bower package but have to do this for now)

```
$ gem install bourbon -v 3.1.8
$ bourbon install
```

* Gulp - Download and Install [Gulp](http://gulpjs.com/).

```
$ npm install -g gulp
```
* SASS - [SASS](http://sass-lang.com) is a CSS extension language used for styling Schedules frontend. You'll need the latest version of the SASS Ruby gem in order to build the stylesheets.

```
$ sudo gem install sass
```


## Getting started
To build and run the app locally run the following commands:

1. Install development dependencies with `npm install`
2. Install app dependencies with `bower install`
3. Install bourbon (follow instruction above)
4. Run with `gulp serve`

You can then view the app at `http://localhost:3000/`

## Contributing
1. Fork the repo
2. Create a new branch with either a feat/ or fix/ prefix
3. Commit and push changes to your repo
4. Create a new Pull Request

We will accept pulls that:
* Don't break anything
* Are well documented and commented
* Are written in pure JavaScript (sorry no Coffeescript)
* Don't add unnecessary dependencies (no jQuery or Bootstrap please) - make use of Angular.js, Lodash, Concise.css, and Bourbon for the frontend

## Contributors
Timothy Kendall, Ian Jackson, James Steininger, Ross Clare

## License
[The AGPL v3 License](http://www.gnu.org/licenses/agpl-3.0.html)

