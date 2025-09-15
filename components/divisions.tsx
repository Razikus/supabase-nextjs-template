"use client"

import { useRef } from "react"

type Division = {
  id: string
  lines: [string, string]       // title split across two lines
  desc: string
  bgImage: string               // from /public
  gradFrom: string              // hex
  gradTo: string                // hex
}

const DIVISIONS: Division[] = [
  {
    id: "media",
    lines: ["10x", "Media"],
    desc:
      "Integrating brands into fandom across live games, highlights and shoulder programming in linear TV, live streaming, and digital.",
    bgImage: "/sports-fans-celebrating.png",
    gradFrom: "#3B99D1",
    gradTo: "#3289bc",
  },
  {
    id: "properties",
    lines: ["10x", "Sports Properties"],
    desc:
      "Owning and activating marketing & multimedia rights for leading properties, associations and venues.",
    bgImage: "/sports-stadium-with-athletes-training-dynamic-acti.png",
    gradFrom: "#E85949",
    gradTo: "#E2383A",
  },
  {
    id: "tech",
    lines: ["10x", "Tech & SaaS"],
    desc:
      "Cutting-edge tools to engage fans and unlock revenue: our in-house technology and deep partner ecosystem.",
    bgImage: "/modern-dashboard-interface-showing-creator-profile.png",
    gradFrom: "#572E29",
    gradTo: "#44231f",
  },
  {
    id: "global",
    lines: ["10x", "Global Partnerships"],
    desc:
      "Data-driven commercial strategy for brands: sponsorship sales, gameday revenue, and representation across the ecosystem.",
    bgImage: "/live-streaming-interface-with-sports-event-broadca.png",
    gradFrom: "#3B99D1",
    gradTo: "#132945",
  },
]

export default function DivisionsSection() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollByCards = (dir: "prev" | "next") => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>("[data-card]")
    const gap = 24 // gap-6 = 24px
    const amount = card ? card.offsetWidth + gap : 560 + gap
    track.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" })
  }

  return (
    <section className="py-28 bg-[#132945]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-captain text-6xl md:text-8xl lg:text-9xl text-white text-center mb-16 leading-none">
          Core Pillars
        </h2>

        {/* Carousel */}
        <div className="relative">
          {/* track */}
          <div
            ref={trackRef}
            className="
              flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory
              [&::-webkit-scrollbar]:hidden
            "
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {DIVISIONS.map((d) => (
              <article
                key={d.id}
                data-card
                className="
                  snap-center flex-shrink-0
                  w-[88vw] sm:w-[520px] xl:w-[560px] h-[520px] md:h-[600px]
                "
              >
                <div
                  className="relative rounded-2xl overflow-hidden h-full group will-change-transform transition-transform duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${d.gradFrom}, ${d.gradTo})`,
                  }}
                >
                  {/* photo layer */}
                  <div
                    className="absolute inset-0 bg-center bg-cover opacity-35"
                    style={{ backgroundImage: `url(${d.bgImage})` }}
                  />
                  {/* shadow veil for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                  {/* content */}
                  <div className="relative z-20 p-8 md:p-12 h-full flex flex-col">
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-white/15 rounded-xl grid place-items-center">
                        <span className="font-climate text-white text-xl leading-none">10x</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <h3 className="font-captain text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
                        {d.lines[0]} <br /> {d.lines[1]}
                      </h3>
                      <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                        {d.desc}
                      </p>

                      <a
                        href="#"
                        className="
                          inline-flex items-center gap-2 rounded-full
                          px-6 py-3 text-base md:text-lg font-medium
                          border border-white/30 text-white bg-white/10
                          transition-all duration-300
                          hover:bg-transparent hover:border-[#3B99D1] hover:text-[#3B99D1]
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2383A]
                          focus-visible:ring-offset-2 focus-visible:ring-offset-[#132945]
                        "
                      >
                        Learn more
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 13 14"
                          fill="currentColor"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <path d="M13 1.5C13 0.947715 12.5523 0.5 12 0.5L3 0.500001C2.44771 0.5 2 0.947716 2 1.5C2 2.05228 2.44772 2.5 3 2.5L11 2.5L11 10.5C11 11.0523 11.4477 11.5 12 11.5C12.5523 11.5 13 11.0523 13 10.5L13 1.5ZM1.70711 13.2071L12.7071 2.20711L11.2929 0.792894L0.292893 11.7929L1.70711 13.2071Z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* controls */}
          <div className="flex items-center justify-center mt-10 gap-4">
            <button
              onClick={() => scrollByCards("prev")}
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scrollByCards("next")}
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
