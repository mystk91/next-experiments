import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Accordian from "@/app/ui/accordian/accordian";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Accordian",
  component: Accordian,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: { control: "text" },
    content: { control: "boolean" },
    color: { control: "color" },
    backgroundColor: { control: "color" },
    height: { control: "text" },
    width: { control: "text" },
    border: { control: "text" },
    borderRadius: { control: "text" },
    buttonFontSize: { control: "text" },
    iconHeight: { control: "text" },
  },
} satisfies Meta<typeof Accordian>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: "Accordian",
    width: "100%"
  },
};

export const TypicalAccordian: Story = {
  args: {
    label: "Accordian",
    iconHeight: "2.5rem",
    buttonFontSize: "1.8rem",
    width: "34rem",
    height: "4.8rem",
  },
};
