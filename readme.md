# Iconify, for Typst!

Iconify is a pretty sweet project used in web development, but since they provide SVGs
of all icon sets, we can integrate these into Typst documents! 🥰

## Usage

## High-level Roadmap

- [x] Support `<icon-set>:<icon-name>` lookups from Typst.
- [ ] Split the package into something like `typst-iconify-core` and `typst-iconify-<icon-set>` so the core remains small (and relatively stagnant once stable) while icon sets can receive updates as-needed.
- [ ] Support dynamic specification/importing of icons (e.g. say the use doesn't load the `phosphor` icons but wants to use `ph:app-window-duotone`, we should be able to lookup/load this icon for them) -- at least while `typst-iconify` is a monolithic package.
- [ ] Support configuration of icon sizes, either per-icon or globally with something like a `#show iconify...` rule.
- [ ] Perhaps natively support inline-icons via `#box[#icon(...)]`, as mentioned [here](https://github.com/jgm/pandoc/pull/9149)?

## Development