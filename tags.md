---
layout: blog
title: Blog Tags
toc: false
permalink: /blog/tags
---

<div>
  {% for tag in site.tags %}
  <a href="#{{ tag[0] | slugify }}" class="pl-3 font-bold">{{ tag[0] }}</a>
  {% endfor %}
</div>
<hr/>
<div>
  {% for tag in site.tags %}
  <h2 id="{{ tags[0] | slugify }}">{{ tag | first | capitalize}}</h2>
  <ul>
    {% for post in tag[1] %}
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
