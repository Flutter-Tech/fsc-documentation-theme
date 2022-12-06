---
layout: blog
title: Blog
---

{% for post in site.posts %}
<div class="mb-5">
  <a href="{{ post.url }}" class="block text-xl">{{ post.title }}</a>
  <div class="text-xs">{{ post.date | date_to_string }}</div>
  <div class="pt-3 text-sm">
  {{ post.summary}}
  </div>
</div>
{% endfor %}
