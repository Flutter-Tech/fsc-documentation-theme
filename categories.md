---
layout: blog
title: Blog Categories
toc: false
permalink: /blog/categories
---

<div>
  {% for category in site.categories %}
  <a href="#{{ category[0] | slugify }}" class="pl-3 font-bold">{{ category[0] }}</a>
  {% endfor %}
</div>
<hr/>
<div>
  {% for category in site.categories %}
  <h2 id="{{ categories[0] | slugify }}">{{ category | first | capitalize}}</h2>
  <ul>
    {% for post in category[1] %}
    <a href="{{ site.baseurl }}{{ post.url }}">
      <li>
        {{ post.title }}
        <small class="text-gray-800">{{ post.date | date_to_string }}</small>
      </li>
    </a>
    {% endfor %}
  </ul>
  {% endfor %}
</div>
