import * as Handlebars from "handlebars";

const scriptHandlebars = document.createElement('script');
scriptHandlebars.src = 'https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.runtime.js';
document.head.insertAdjacentElement('afterbegin',scriptHandlebars);

// Wait for Handlebars to be loaded
scriptHandlebars.onload = function () {
  // Load the precompiled template
  const scriptPrecompiled = document.createElement('script');
  scriptPrecompiled.src = chrome.runtime.getURL('example.precompiled.js');
  document.head.appendChild(scriptPrecompiled);

  // Wait for the precompiled template to be loaded
  scriptPrecompiled.onload = function () {
    // Now you can use Handlebars and the precompiled template
    const template = Handlebars.templates.example;
    document.body.insertAdjacentHTML('afterbegin','<div id="handlebars-demo"><div>')
    document.getElementById('handlebars-demo')!.innerHTML = template({ doesWhat: 'rocks!' });
  };
};

// document.body.insertAdjacentHTML(
//   "afterbegin",
//   '<div id="entry-template"><div>'
// );
// const source = document.getElementById("entry-template")!.innerHTML;
// const template = Handlebars.compile(source);
// const context = { title: "My New Post", body: "This is my first post!" };
// const html = template(context);
// document
//   .getElementById("entry-template")!
//   .insertAdjacentHTML("afterbegin", html);
