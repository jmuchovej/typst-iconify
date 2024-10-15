//! typst-iconify
//! https://github.com/jmuchovej/typst-iconify


#let iconify = state("iconify", (:))

#let from-key(name) = {
  let (library, icon) = name.replace("iconify::", "").split(":")
  return (library: library, icon: icon)
}

#let to-key(library: auto, icon: auto) = (library, icon).join(":")

#let icon-key(name) = {
  let state-key = ("iconify", name).join("::")
  return state-key
}

#let load-icon(alias, iconset, icon) = {
  let file-path = "./icons/" + iconset + "/" + icon + ".svg"
  let state-key = icon-key(to-key(library: alias, icon: icon))
  state(state-key, none).update(image(file-path, height: 1em))
}

#let load-icons(alias, iconset) = {
  let icon-list = json("./collections/" + iconset + ".json").icons
  for icon in icon-list {
    load-icon(alias, iconset, icon)
  }
}

// TODO support dynamically calling icons
#let show-icon(name) = (
  context {
    let state-key = icon-key(name)
    let (library, icon) = from-key(name)

    return state(state-key).get()
  }
)

#let prefetch-icons(..iconsets) = {
  let desired-icons = (:)

  for icon in iconsets.pos() {
    desired-icons.insert(icon, icon)
  }

  for (alias, icon) in iconsets.named() {
    assert(
      icon not in desired-icons,
      message: "Found " + icon + " already specified! Please clean-up your icon specification!",
    )
    desired-icons.insert(alias, icon)
  }
  iconify.update(desired-icons)

  for (alias, iconset) in desired-icons {
    load-icons(alias, iconset)
  }
}

#let icon(name, height: 1em, width: 1em, ..args) = {
  return show-icon(name)
}
