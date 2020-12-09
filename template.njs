{% if html %}
<html>
  <head>
    <style media="screen">
      body {
        margin: 0 0;
      }
    </style>
  </head>
  <body>
{% endif %}
    <svg id="svg" viewBox="0 0 {{width}} {{height}}"  xmlns="http://www.w3.org/2000/svg" >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(92, 172, 172);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(116, 128, 190);stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="{{width}}" height="{{height}}" fill="url(#grad1)"/>
      {% for cell in grid %}
      <g transform="translate({{cell.x}},{{cell.y}})">
        {% set width = cell.width|default(135) %}
        <image href="{{cell.href}}" x="-{{width/2}}px" y="-{{width/2}}px" width="{{width}}px"/>
      </g>
      {% endfor %}
    </svg>
{% if html %}
</body>
</html>
{% endif %}
