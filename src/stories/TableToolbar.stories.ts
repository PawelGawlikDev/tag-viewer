import type { Meta, StoryObj } from "@storybook/react";

import TableToolbar from "../components/TableToolbar/TableToolbar";

const meta = {
  title: "Components/Table",
  component: TableToolbar,
  tags: ["autodocs"],
} satisfies Meta<typeof TableToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TableToolbarStory: Story = {};
