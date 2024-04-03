import type { Meta, StoryObj } from "@storybook/react";

import TagsTable from "../components/TagsTable/TagsTable";

const meta = {
  title: "Components/TagsTable",
  component: TagsTable,
  tags: ["autodocs"],
} satisfies Meta<typeof TagsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestTableStory: Story = {};
