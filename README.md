# 🤖 Chatbot Flow Builder

A visual drag-and-drop interface to build chatbot flows using [@xyflow/react (React Flow)](https://reactflow.dev/). Users can create, connect, and configure custom nodes to design conversational experiences.

![Chatbot Flow Builder Screenshot](https://res.cloudinary.com/dpqpclkby/image/upload/v1752309568/83a728df-56b7-4fb9-aba6-ce1f723b8ab4.png)

## 📹 Preview

![Preview GIF](https://res.cloudinary.com/dpqpclkby/image/upload/v1752310464/Vite_React_TS_-_Google_Chrome_2025-07-12_14-04-27.mp4_tmisgo.gif)

---

## ✨ Features

- 📌 Drag and drop custom nodes onto the canvas
- 🔗 Connect nodes visually
- 📝 Edit node labels/messages
- 🗑️ Delete selected nodes/edges with `Delete`
- 📂 Save button for exporting or processing flows
- 🧙‍♂️ Extendable node system via a central registry
- 🧘‍🎨 Built with TailwindCSS + ShadCN UI for clean UI

---

## 🧪 Tech Stack

- **React** with **TypeScript**
- **@xyflow/react** (React Flow)
- **Tailwind CSS**
- **ShadCN UI**
- **Lucide Icons**
- **Sonner Toasts**

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/chatbot-flow-builder.git
cd chatbot-flow-builder

```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install

```

### 3. Run Locally

```bash
pnpm dev
# or
npm run dev
# or
yarn dev

```

---

## [📂 View Folder Structure](./FOLDER_STRUCTURE.md)

## 🧱 Custom Node System

To add new nodes:

1.  Edit `NodeRegistry.ts`
2.  Provide:

    - `label`
    - `component`
    - `defaultData`

```ts
export const NODE_TYPES = {
  text: {
    label: "Text Message",
    component: TextNode,
    defaultData: { label: "Hi there!" }
  },
  ...
};

```

---

## 🤝 Acknowledgements

Thanks to:

- [React Flow (xyflow)](https://reactflow.dev/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
