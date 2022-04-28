---
layout: null
---
{% if site.site_search %}
{% assign pages = site.pages | where_exp: "item", "item.title" %}
{% assign posts = site.posts | where_exp: "item", "item.title" %}
{% assign allPages = pages | concat: posts %}

{% capture lunrData %}
var docIndex = [
{% for page in allPages %}
{
"id": {{ forloop.index0 }},
"url": "{{ site.url }}{{ page.url }}",
"title": {{ page.title | jsonify }},
"body": {{ page.content | strip_html | replace: '\n', ' ' | replace: '#', ' ' | split: ' ' | join: ' ' | jsonify }}
}
{% unless forloop.last %}, {% endunless %}
{% endfor %}
];
{% endcapture %}

{{ lunrData | strip_newlines }}

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    docIndex.forEach(function (doc) {
        this.add(doc)
    }, this)
});

function initSearch() {
    // add keyup to search-input
    const desktopSearch = document.getElementById('search-input');
    const resultSection = document.getElementById('results-container');
    const resultCount = document.getElementById('show-results-count');
    const searchDiv = document.getElementById('search');

    //make results visible when focus is gained if search is not empty
    desktopSearch.addEventListener('focus', function () {
        resultCount.classList.remove('ml-[-46%]');
        resultCount.classList.add('ml-0');
        console.log('desktopSearch focus')
    });

    document.addEventListener('click', function (e) {
        const withinBoundaries = e.composedPath().includes(searchDiv)
        if (!withinBoundaries) {
            resultCount.classList.remove('ml-0');
            resultCount.classList.add('ml-[-46%]');
            resultSection.classList.add('hidden');
        }
    });

    document.addEventListener('focus', function (e) {
        const withinBoundaries = e.composedPath().includes(searchDiv)
        if (!withinBoundaries) {
            resultCount.classList.remove('ml-0');
            resultCount.classList.add('ml-[-46%]');
            resultSection.classList.add('hidden');
        }
    });

    // on input, search and show results
    desktopSearch.addEventListener('keyup', function (e) {

        if (window.getComputedStyle(resultSection).display === "none") {
            resultSection.classList.remove('hidden');
        }

        resultCount.innerHTML = 'Searching....';
        const query = e.target.value;
        const results = idx.search(query);
        resultCount.innerHTML = results.length + ' Result' + (results.length !== 1 ? 's' : '');

        resultSection.innerHTML = '';
        for (var item in results) {
            var ref = results[item].ref;
            
            var link = document.createElement('a');
            link.href = docIndex[ref].url;
            link.innerHTML = docIndex[ref].title;

            var li = document.createElement('li');
            li.classList.add('p-px');
            li.appendChild(link);

            resultSection.appendChild(li);
        }
    });
}
{% endif %}