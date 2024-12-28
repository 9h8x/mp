"use client";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import Ripple from "@/components/ui/ripple";
import DotPattern from "@/components/ui/dot-pattern";
import FlickeringGrid from "@/components/ui/flickering-grid";
import BlurFade from "@/components/ui/blur-fade";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import RetroGrid from "@/components/ui/retro-grid";

const features = [
  {
    Icon: FileTextIcon,
    name: "Historial",
    description: "Historial de pedidos",
    href: "/",
    cta: "Learn more",
    background: (
      <FlickeringGrid
        className="z-0 absolute inset-0 size-full border-2"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.2}
        flickerChance={0.1}
        height={800}
        width={800}
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "Learn more",
    background: <Ripple />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: (
      <DotPattern className="[z-0 absolute inset-0 size-full border-2 mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "Learn more",
    background: (
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 border-2"
        )}
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: <RetroGrid className="z-0 absolute inset-0 size-full border-2" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export function BentoDemo() {
  return (
    <BlurFade delay={0.5} inView>
      <BentoGrid className="lg:grid-rows-3 px-8">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </BlurFade>
  );
}
