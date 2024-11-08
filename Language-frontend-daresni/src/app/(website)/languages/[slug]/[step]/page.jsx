import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import Sidebar from "../../_components/Sidebar";
import MarkdownContent from "../../_components/MarkdownContent";
import Buttons from "../../_components/Buttons";
import { AwardIcon } from "lucide-react";
import { Inscription } from "@/actions/client/language";

const DUMMY_DATA = {
  steps: [
    {
      id: "0",
      label: "Step 1",
    },
    {
      id: "1",
      label: "Step 2",
    },
    {
      id: "2",
      label: "Step 3",
    },
  ],

  current: {
    title: "Step 1",
    content: `
  ## Title 1
  Hello world!
  ## Title 2
    `,
  },
};

const getSTeps = (steps, slug) => {
  return steps.map((step, index) => ({
    ...step,href: `/languages/${slug}/${index}`,
  }));
};

export default  async function page({ params }) {

  const alldata= await Inscription(params.slug)
 // const data = await getStepsContet(params.slug , params.step)

  return (
    <main className="flex">
      <Sidebar
        items={getSTeps(alldata.steps, params.slug)}
        active={params.step}
      />
      <ScrollArea className="flex-grow flex flex-col h-screen bg-[#e4d9ff26]">
        <div className="flex-grow p-8 container">
           <MarkdownContent step={alldata.steps[params.step]} />
          <Buttons
            step={parseInt(params.step)}
            slug={params.slug}
            length={alldata?.steps.length}
          />
        </div>
      </ScrollArea>
    </main>
  );
}