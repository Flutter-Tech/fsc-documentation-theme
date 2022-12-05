---
layout: blog
title: Blog
---

{% for post in site.posts %}
<div class="mb-5">
  <a href="{{ post.url }}" class="text-xl block">{{ post.title }}</a>
  <div class="text-xs">{{ post.date | date_to_string }}</div>
  <div class="text-sm pt-3">{{ post.summary}}</div>
</div>
{% endfor %}
