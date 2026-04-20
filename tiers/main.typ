  #let brand = rgb("#2464ef")

  #set page(
    width: 1200pt,
    height: 1200pt,
    fill: brand,
    margin: 120pt,
  )

  #set text(fill: white)

  #let tier-image = (name, text-size: 220pt) => {
    v(1fr)
    align(center)[
      #grid(
        columns: (1fr, 3fr),
        column-gutter: 150pt,
        align: horizon,
        image("oicana-white.svg", height: 360pt),
        text(size: text-size, weight: 800)[#name],
      )
    ]
    v(1fr)
  }

  #tier-image("Startup")
  #pagebreak()
  #tier-image("Scaleup")
  #pagebreak()
  #tier-image("Enterprise", text-size: 150pt)