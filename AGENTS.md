<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# FULL DESIGN STACK WORKFLOW

This project has **4 design tools** integrated. Always use this workflow:

## 1. Google Stitch MCP — UI Mockups & Prototypes
- Use `stitch_generate_screen_from_text` to create UI mockups
- Use `stitch_edit_screens` to refine existing screens
- Use `stitch_create_design_system` for consistent branding
- **Purpose**: High-fidelity page mockups and design exploration

## 2. ComfyUI (Local) — AI Image Generation
- Use `generate_image` with SDXL for AI-generated images (1024x1024)
- Use `regenerate` to iterate on images with different seeds or params
- Use `publish_asset` to publish images to the project
- **Purpose**: Hero images, backgrounds, illustrations, social cards
- **Model**: sd_xl_base_1.0.safetensors (local, GPU-accelerated)

## 3. shadcn/ui — Component Library (Always Use)
- Every UI component MUST use shadcn/ui components from `src/components/ui/`
- Available: button, card, badge, avatar, navigation-menu, separator, tabs, sheet, input, label, dialog, dropdown-menu, select, tooltip, toast
- **Purpose**: Consistent design language — every button, card, nav looks like it came from the same designer
- **No raw divs with inline styles** — use shadcn components

## 5. agent-browser (Vercel Labs) — Browser Automation & Visual Testing
- MCP server: `agent-browser --args "--no-sandbox" mcp` (registered in opencode.jsonc)
- Installed globally via npm, Chrome 150 downloaded to `~/.agent-browser/browsers/`
- CLI: `agent-browser open <url>`, `agent-browser snapshot`, `agent-browser screenshot`, `agent-browser click <ref>`
- Use for: visual regression testing, screenshot capture, DOM inspection, interaction testing
- Sandbox disabled via `--args "--no-sandbox"` (required for VMs/containers)
- Session management: `--session <name>` for isolated browser instances

## 4. 21st.dev Magic MCP — Interactive UI Assets
- Use `21st_magic_component_builder` to generate new React components
- Use `21st_magic_component_inspiration` to browse component ideas
- Use `logo_search` to get company/brand logos (TSX/JSX/SVG)
- **Purpose**: Complex interactive components, branded logos, design inspiration

## Workflow Order
1. **Plan** with Stitch (mockups) → 2. **Generate** with ComfyUI (images) → 3. **Build** with shadcn/ui (components) → 4. **Enhance** with 21st.dev (interactive assets)

## Project Info
- **Person**: Apoorv Anand — Agentic AI Engineer & Full-Stack SaaS Builder
- **Stack**: Next.js 16, shadcn/ui, Framer Motion, Recharts, lucide-react
- **Location**: Bengaluru, India
