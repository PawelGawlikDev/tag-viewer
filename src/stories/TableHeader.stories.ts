import type { Meta, StoryObj } from "@storybook/react";

import TableHeader from "../components/TableHeader/TableHeader";

const meta = {
  title: "Components/TableHeader",
  component: TableHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof TableHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TableHeaderStory: Story = {
  args: {
    order: "asc",
    orderBy: "count",
    onRequestSort: () => {
      console.log("sort");
    },
  },
};
