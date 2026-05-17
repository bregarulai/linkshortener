# UI Component Guidelines — shadcn/ui

## Core Rule

**All UI elements MUST use shadcn/ui components. Never create custom components.**

## Usage Rules

| Rule                     | Detail                                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| **No custom components** | Always use shadcn/ui primitives (`Button`, `Input`, `Card`, `Dialog`, `Select`, etc.).                    |
| **Install via CLI**      | Add new components with `npx shadcn@latest add <component>` — do not copy-paste code.                     |
| **Styling**              | Use Tailwind CSS utility classes only. Avoid inline styles or custom CSS files.                           |
| **Theming**              | Follow the project's existing shadcn theme (colors, radii, etc.) defined in `globals.css`.                |
| **Icons**                | Use `lucide-react` icons as provided by shadcn's icon convention.                                         |
| **Accessibility**        | shadcn components are built on Radix UI and are accessible by default. Do not strip ARIA attributes.      |
| **Overrides**            | If a component needs customization, extend via Tailwind classes or variant props — never fork the source. |

## Common Components Reference

| Use Case     | shadcn Component                                            |
| ------------ | ----------------------------------------------------------- |
| Buttons      | `Button`                                                    |
| Forms        | `Form`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch` |
| Layout       | `Card`, `Sheet`, `Dialog`, `Drawer`                         |
| Feedback     | `Toast`, `Alert`, `Progress`, `Skeleton`                    |
| Navigation   | `Tabs`, `DropdownMenu`, `NavigationMenu`                    |
| Data Display | `Table`, `Badge`, `Avatar`, `Tooltip`                       |
| Overlays     | `Popover`, `Command`, `Calendar`                            |

## When in Doubt

1. Check the [shadcn/ui docs](https://ui.shadcn.com/docs) for the component you need.
2. If no existing component fits, add one via the CLI — do not write it from scratch.
