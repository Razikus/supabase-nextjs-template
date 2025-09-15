import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  Radio,
  Users2,
  HandCoins,
} from "lucide-react";
import TrustStrip from "@/components/trust-strip";
import SiteHeader from "@/components/site-header";
import DivisionsSection from "@/components/divisions";
import {
  TrendingUp,
  Handshake,
  LayoutDashboard,
  Share2,
  ShieldCheck,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#132945]">
      {/* Navigation */}
      <SiteHeader />

      {/* Hero Section (video background, no overlapping stats) */}
      <section className="relative isolate overflow-hidden min-h-[96svh] pt-24 sm:pt-28">
        {/* Media (bottom layer) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <iframe
            src="https://www.youtube.com/embed/tWU8CXFLOgk?autoplay=1&mute=1&loop=1&playlist=tWU8CXFLOgk&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="10x Background"
          />
        </div>

        {/* Veil (middle layer) */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-[#132945]/90 via-[#132945]/80 to-[#3B99D1]/40" />

        {/* Content (top layer) */}
        <div className="relative z-20 flex items-center min-h-[calc(96svh-6rem)] py-12 sm:py-20">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
            <div className="max-w-5xl">
              <h1 className="font-captain text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white mb-6 md:mb-8 leading-[1.05] md:leading-[0.9]">
                <span className="text-[#E85949]">
                  Grow Your Fan Base. Not Your Tech Stack
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-2xl text-white/90 max-w-3xl md:max-w-4xl leading-relaxed font-medium">
                10x is the human-led service that empowers rights-holders to
                build, engage, and monetise existing fan networks by connecting
                them with FTA live sports content and branded partnerships.
              </p>

              {/* CTAs — stack on mobile, row on desktop */}
              <div className="mt-8 md:mt-12 mb-10 sm:mb-14 lg:mb-16 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full max-w-lg">
                <a
                  href="/values"
                  className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-medium
                       bg-[#3B99D1] text-white border-2 border-transparent transition-all duration-300 ease-out
                       hover:bg-transparent hover:text-[#3B99D1] hover:border-[#3B99D1]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2383A]
                       focus-visible:ring-offset-2 focus-visible:ring-offset-[#132945]"
                >
                  Get a Demo
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="18"
                    viewBox="0 0 13 14"
                    fill="currentColor"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M13 1.5C13 0.947715 12.5523 0.5 12 0.5L3 0.500001C2.44771 0.5 2 0.947716 2 1.5C2 2.05228 2.44772 2.5 3 2.5L11 2.5L11 10.5C11 11.0523 11.4477 11.5 12 11.5C12.5523 11.5 13 11.0523 13 10.5L13 1.5ZM1.70711 13.2071L12.7071 2.20711L11.2929 0.792894L0.292893 11.7929L1.70711 13.2071Z" />
                  </svg>
                </a>

                <Link href="/login" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-auto rounded-full px-6 py-3 sm:px-10 sm:py-5 text-base sm:text-xl
                         border-2 border-white/30 text-white bg-transparent hover:bg-white/10"
                  >
                    Login
                  </Button>
                </Link>
              </div>

              {/* Spacer removed since stats are no longer pinned/overlapping */}
              {/* <div className="pb-8 md:pb-24 lg:pb-28" /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Stats — now below the video section, in normal document flow */}
      <div className="bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            <div className="text-left">
              <div className="text-5xl md:text-7xl lg:text-8xl font-captain font-medium text-[#3B99D1] mb-2 md:mb-4">
                90%+
              </div>
              <div className="text-white text-base md:text-lg uppercase tracking-wider font-semibold">
                Gen Z and Millennial fans consuming sports on social media not
                TV
              </div>
              {/* <div className="text-white/70 text-sm md:text-base mt-1 md:mt-2">
              Gen Z and Millennial fans consuming sports on social media not TV 
              </div> */}
            </div>

            <div className="text-left">
              <div className="text-5xl md:text-7xl lg:text-8xl font-captain font-medium text-[#E85949] mb-2 md:mb-4">
                £52B
              </div>
              <div className="text-white text-base md:text-lg uppercase tracking-wider font-semibold">
                Value of the global sports sponsorship market in 2025
              </div>
              {/* <div className="text-white/70 text-sm md:text-base mt-1 md:mt-2">
                of all creators see increased engagement and ad-revenue
              </div> */}
            </div>

            <div className="text-left">
              <div className="text-5xl md:text-7xl lg:text-8xl font-captain font-medium text-[#E2383A] mb-2 md:mb-4">
                £24B
              </div>
              <div className="text-white text-base md:text-lg uppercase tracking-wider font-semibold">
                Estimated value of the global influencer marketing industry in
                2025.{" "}
              </div>
              {/* <div className="text-white/70 text-sm md:text-base mt-1 md:mt-2">
                Impressions delivered for partners per month Trusted by leading
                sports organisations
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Infographic — How 10x Works (centered, responsive, no overflow) */}
      <section className="bg-transparent relative z-10 bg-gradient-to-b from-[#132945] via-[#0f1f2e] to-[#132945]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          {/* Centered row; wraps on md/lg, overlaps only on xl+ */}
          <div className="relative flex flex-col md:flex-row md:flex-wrap md:justify-center md:gap-6 xl:flex-nowrap xl:gap-0">
            {/* 01 */}
            <div
              className="relative z-10 w-full md:w-[300px] lg:w-[320px] xl:w-[360px] rounded-2xl p-6 md:p-7 lg:p-8 xl:pr-16 text-white shadow-2xl min-h-[280px] lg:min-h-[340px] flex flex-col justify-start"
              style={{
                background: "linear-gradient(135deg,#E85949 0%,#D74C3F 100%)",
              }}
            >
              <div className="text-3xl md:text-4xl font-extrabold">01</div>
              <h3 className="font-bold mt-2 text-xl md:text-2xl leading-tight uppercase break-words hyphens-auto">
                Live Stream
                <br />
                Ingest
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed break-words hyphens-auto">
                We seamlessly ingest your live sports feeds, splitting video and
                audio for personalised content and multi-platform distribution.
              </p>
            </div>

            {/* 02 */}
            <div
              className="relative z-20 w-full md:w-[300px] lg:w-[320px] xl:w-[360px] rounded-2xl p-6 md:p-7 lg:p-8 xl:pr-16 text-white shadow-2xl min-h-[280px] lg:min-h-[340px] flex flex-col justify-start md:mt-0 md:ml-0 xl:-ml-10"
              style={{
                background: "linear-gradient(135deg,#E2383A 0%,#BA2D2C 100%)",
              }}
            >
              <div className="text-3xl md:text-4xl font-extrabold">02</div>
              <h3 className="font-bold mt-2 text-xl md:text-2xl leading-tight uppercase break-words hyphens-auto">
                Bespoke Creator
                <br />
                Search
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed break-words hyphens-auto">
                Our human-led service connects you with ideal fan channels,
                groups, and creators to reach highly engaged audiences.
              </p>
            </div>

            {/* 03 */}
            <div
              className="relative z-30 w-full md:w-[300px] lg:w-[320px] xl:w-[360px] rounded-2xl p-6 md:p-7 lg:p-8 xl:pr-16 text-white shadow-2xl min-h-[280px] lg:min-h-[340px] flex flex-col justify-start md:mt-0 md:ml-0 xl:-ml-10"
              style={{
                background: "linear-gradient(135deg,#3B99D1 0%,#2E7CAC 100%)",
              }}
            >
              <div className="text-3xl md:text-4xl font-extrabold">03</div>
              <h3 className="font-bold mt-2 text-xl md:text-2xl leading-tight uppercase break-words hyphens-auto">
                Strategic
                <br />
                Distribution
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed break-words hyphens-auto">
                We push your live sport to up to 30 channels via our CDN for
                maximum reach and high-quality viewer experience.
              </p>
            </div>

            {/* 04 */}
            <div
              className="relative z-40 w-full md:w-[300px] lg:w-[320px] xl:w-[360px] rounded-2xl p-6 md:p-7 lg:p-8 xl:pr-16 text-white shadow-2xl min-h-[280px] lg:min-h-[340px] flex flex-col justify-start md:mt-0 md:ml-0 xl:-ml-10"
              style={{
                background: "linear-gradient(135deg,#572E29 0%,#43231F 100%)",
              }}
            >
              <div className="text-3xl md:text-4xl font-extrabold">04</div>
              <h3 className="font-bold mt-2 text-xl md:text-2xl leading-tight uppercase break-words hyphens-auto">
                Revenue
                <br />
                Generation
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed break-words hyphens-auto">
                Integrate product placements, ad-share models, and creator
                shoutouts directly into your feeds to unlock new revenue.
              </p>
            </div>

            {/* 05 */}
            <div
              className="relative z-50 w-full md:w-[300px] lg:w-[320px] xl:w-[360px] rounded-2xl p-6 md:p-7 lg:p-8 xl:pr-16 text-white shadow-2xl min-h-[280px] lg:min-h-[340px] flex flex-col justify-start md:mt-0 md:ml-0 xl:-ml-10"
              style={{
                background: "linear-gradient(135deg,#132945 0%,#0E1F34 100%)",
              }}
            >
              <div className="text-3xl md:text-4xl font-extrabold">05</div>
              <h3 className="font-bold mt-2 text-xl md:text-2xl leading-tight uppercase break-words hyphens-auto">
                Performance
                <br />
                Reporting
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed break-words hyphens-auto">
                Go beyond viewership: detailed reports show sponsorship value
                and guide optimisation for future campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <TrustStrip />

      {/* Value Props */}
      <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-[#0f1f2e] to-[#132945] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-captain text-5xl md:text-7xl tracking-tight text-white mb-6">
            Why Choose <span className="text-brand-blue">10x</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Everything you need to activate and grow your sports content
            business
          </p>
        </div>

        {/* Feature rail */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 max-w-6xl mx-auto px-6">
          {/* Revenue Generation */}
          <div className="group text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <div
                className="h-20 w-20 rounded-2xl bg-brand-blue/10 flex items-center justify-center 
                        group-hover:scale-110 group-hover:bg-brand-blue/20 transition-transform duration-500"
              >
                <TrendingUp className="h-10 w-10 text-brand-blue" />
              </div>
            </div>
            <h3 className="font-captain text-2xl md:text-3xl text-white mt-8 mb-4">
              Revenue Generation
            </h3>
            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              We provide a powerful foundation to boost ad-revenue, secure new
              brand partnerships, and drive ticket sales through a highly
              engaged, quantifiable audience.
            </p>
          </div>

          {/* Human-Led Service */}
          <div className="group text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <div
                className="h-20 w-20 rounded-2xl bg-brand-red/10 flex items-center justify-center 
                        group-hover:scale-110 group-hover:bg-brand-red/20 transition-transform duration-500"
              >
                <Handshake className="h-10 w-10 text-brand-red" />
              </div>
            </div>
            <h3 className="font-captain text-2xl md:text-3xl text-white mt-8 mb-4">
              Human-Led Service
            </h3>
            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              Our team of sports and broadcast experts works with you to build a
              custom strategy for success, backed by our powerful platform.
            </p>
          </div>

          {/* Web Dashboard */}
          <div className="group text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <div
                className="h-20 w-20 rounded-2xl bg-brand-brown/10 flex items-center justify-center 
                        group-hover:scale-110 group-hover:bg-brand-brown/20 transition-transform duration-500"
              >
                <LayoutDashboard className="h-10 w-10 text-brand-brown" />
              </div>
            </div>
            <h3 className="font-captain text-2xl md:text-3xl text-white mt-8 mb-4">
              Web Dashboard
            </h3>
            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              An intuitive, centralised platform to manage all your creators,
              events, and analytics from a single screen.
            </p>
          </div>

          {/* Network Activation */}
          <div className="group text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <div
                className="h-20 w-20 rounded-2xl bg-brand-blue/10 flex items-center justify-center 
                        group-hover:scale-110 group-hover:bg-brand-blue/20 transition-transform duration-500"
              >
                <Share2 className="h-10 w-10 text-brand-blue" />
              </div>
            </div>
            <h3 className="font-captain text-2xl md:text-3xl text-white mt-8 mb-4">
              Network Activation
            </h3>
            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              A rights-managed centralised database for all your sports creators
              with performance tracking and engagement metrics for your new
              broadcast network.
            </p>
          </div>

          {/* Gateway Streaming */}
          <div className="group text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <div
                className="h-20 w-20 rounded-2xl bg-brand-red/10 flex items-center justify-center 
                        group-hover:scale-110 group-hover:bg-brand-red/20 transition-transform duration-500"
              >
                <ShieldCheck className="h-10 w-10 text-brand-red" />
              </div>
            </div>
            <h3 className="font-captain text-2xl md:text-3xl text-white mt-8 mb-4">
              Gateway Streaming
            </h3>
            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              Secure, professional-grade streaming for live sports via our
              encrypted SRT gateway, giving you and your partners full control.
            </p>
          </div>

          {/* Sponsorship Analytics */}
          <div className="group text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <div
                className="h-20 w-20 rounded-2xl bg-brand-brown/10 flex items-center justify-center 
                        group-hover:scale-110 group-hover:bg-brand-brown/20 transition-transform duration-500"
              >
                <BarChart3 className="h-10 w-10 text-brand-brown" />
              </div>
            </div>
            <h3 className="font-captain text-2xl md:text-3xl text-white mt-8 mb-4">
              Sponsorship Analytics
            </h3>
            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              Deep insights into content performance, audience growth, and the
              quantifiable media value of your sponsorship assets to secure
              future deals.
            </p>
          </div>
        </div>

        {/* Decorative gradient or pattern */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-brand-blue/10 via-transparent to-brand-red/10 opacity-40" />
      </section>

      {/* About Section — Playfly-style */}
      {/* About — sticky text column */}
      <section className="pt-10 pb-28 md:pt-12 md:pb-32 bg-[#132945]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* LEFT: stacked image tiles that scroll */}
            <div className="lg:col-span-7 grid gap-8">
              {/* 1 */}
              <div className="relative overflow-hidden rounded-2xl">
                <a href="/properties" className="block">
                  <img
                    src="nba-playing.jpg"
                    alt=""
                    className="w-full aspect-[16/9] object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
                  <span className="block text-white/80 uppercase tracking-wide text-xs sm:text-sm">
                    Delivering
                  </span>
                  <span className="block font-captain font-normal leading-none text-[44px] sm:text-6xl text-brand-blue">
                    85%
                  </span>
                  <span className="block text-white/90 text-sm sm:text-base">
                    of all U.S. Sports Fans
                  </span>
                </div>
              </div>

              {/* 2 */}
              <div className="relative overflow-hidden rounded-2xl">
                <a href="/home-team-sports" className="block">
                  <img
                    src="sports-fans-celebrating.png"
                    alt=""
                    className="w-full aspect-[16/9] object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
                  <span className="block text-white/80 uppercase tracking-wide text-xs sm:text-sm">
                    Engaging
                  </span>
                  <span className="block font-captain font-normal leading-none text-[44px] sm:text-6xl text-brand-dark-red">
                    3 of 5
                  </span>
                  <span className="block text-white/90 text-sm sm:text-base">
                    Americans
                  </span>
                </div>
              </div>

              {/* 3 */}
              <div className="relative overflow-hidden rounded-2xl">
                <a href="/premier" className="block">
                  <img
                    src="baseball-img.jpg"
                    alt=""
                    className="w-full aspect-[16/9] object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
                  <span className="block text-white/80 uppercase tracking-wide text-xs sm:text-sm">
                    Driving
                  </span>
                  <span className="block font-captain font-normal leading-none text-[44px] sm:text-6xl text-brand-dark-red">
                    230B+
                  </span>
                  <span className="block text-white/90 text-sm sm:text-base">
                    Impressions Per Year
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: sticky text column (desktop), normal flow on mobile */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
              <h2 className="font-captain font-normal text-6xl sm:text-7xl lg:text-8xl text-white leading-tight mb-8">
                About Us
              </h2>
              <div className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-10">
                <p>
                  10x is the leading hybrid agency and technology platform in
                  the sports industry. Our consultative, data-driven approach to
                  activate, grow, and measure fandom gives our partners a
                  competitive advantage. We provide the platform to drive
                  ad-revenue and brand return for your Free-to-Air rights.
                </p>
              </div>

              <a
                href="/values"
                className="group inline-flex items-center gap-2 rounded-full
            px-8 py-4 text-lg font-medium
            bg-[#3B99D1] text-white border-2 border-transparent
            transition-all duration-300 ease-out
            hover:bg-transparent hover:text-[#3B99D1] hover:border-[#3B99D1]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2383A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#132945]"
              >
                More about us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
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
      </section>

      {/* Sports Categories - Playfly Style with Banner */}
      <section className="py-32 bg-[#132945] relative overflow-hidden">
        <div className="mb-20">
          <div className="whitespace-nowrap overflow-hidden">
            <div className="animate-marquee text-6xl md:text-8xl font-captain font-medium text-white/20 uppercase tracking-wider">
            • Go Direct-to-Fan. No OTT Required • 
            </div>
          </div>
        </div>

        <DivisionsSection />
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-28 md:py-40 bg-[#0f1f2e]">
        {/* soft background accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 h-[48rem] w-[48rem] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(closest-side, #3B99D1 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute bottom-[-12rem] right-[-8rem] h-[36rem] w-[36rem] rounded-full blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(closest-side, #E2383A 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-captain text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight">
            Ready to 10x Your Sports Content?
          </h2>

          <p className="mt-6 md:mt-8 text-lg md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Join leading sports organizations already using our platform to
            amplify reach and engagement.
          </p>

          {/* Buttons */}
          <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Primary — filled, turns to outline on hover */}
            <a
              href="/get-demo"
              className="
          group inline-flex items-center gap-3 rounded-full
          px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-medium
          bg-[#3B99D1] text-white border-2 border-transparent
          transition-all duration-300 ease-out
          hover:bg-transparent hover:text-[#3B99D1] hover:border-[#3B99D1]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2383A]
          focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1f2e]
        "
            >
              Get Started Today
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 13 14"
                fill="currentColor"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M13 1.5C13 0.947715 12.5523 0.5 12 0.5L3 0.500001C2.44771 0.5 2 0.947716 2 1.5C2 2.05228 2.44772 2.5 3 2.5L11 2.5L11 10.5C11 11.0523 11.4477 11.5 12 11.5C12.5523 11.5 13 11.0523 13 10.5L13 1.5ZM1.70711 13.2071L12.7071 2.20711L11.2929 0.792894L0.292893 11.7929L1.70711 13.2071Z" />
              </svg>
            </a>

            {/* Secondary — outline, warms up on hover */}
            <a
              href="/contact"
              className="
          group inline-flex items-center gap-3 rounded-full
          px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-medium
          border-2 border-white/30 text-white
          transition-all duration-300 ease-out
          hover:text-[#E2383A] hover:border-[#E2383A]
          hover:bg-[color-mix(in_oklab,#E2383A_12%,transparent)]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2383A]
          focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1f2e]
        "
            >
              Talk to Sales
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 13 14"
                fill="currentColor"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M13 1.5C13 0.947715 12.5523 0.5 12 0.5L3 0.500001C2.44771 0.5 2 0.947716 2 1.5C2 2.05228 2.44772 2.5 3 2.5L11 2.5L11 10.5C11 11.0523 11.4477 11.5 12 11.5C12.5523 12 13 11.0523 13 10.5L13 1.5ZM1.70711 13.2071L12.7071 2.20711L11.2929 0.792894L0.292893 11.7929L1.70711 13.2071Z" />
              </svg>
            </a>
          </div>

          {/* tiny trust note */}
          <p className="mt-8 text-sm md:text-base text-white/60">
            No commitment needed — book a demo and see it in action.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f1f2e] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* top row */}
          <div className="grid gap-12 md:grid-cols-3">
            {/* Brand */}
            <div>
              <Link
                href="/"
                className="flex items-center gap-3"
                aria-label="Home"
              >
                <span className="font-climate text-[#E85949] leading-none text-3xl md:text-4xl">
                  10x
                </span>
              </Link>
              <p className="mt-6 text-white/60 text-sm max-w-xs leading-relaxed">
                Amplifying the passion of sports through technology, content,
                and partnerships.
              </p>
            </div>

            {/* Navigation */}
            <div className="md:col-span-2 flex flex-col sm:flex-row sm:justify-between gap-12">
              <div>
                <h4 className="font-captain text-white text-lg mb-4">
                  Platform
                </h4>
                <ul className="space-y-3 text-white/60 text-sm">
                  <li>
                    <Link
                      href="/get-demo"
                      className="hover:text-white transition"
                    >
                      Get a Demo
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className="hover:text-white transition">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard"
                      className="hover:text-white transition"
                    >
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-captain text-white text-lg mb-4">
                  Company
                </h4>
                <ul className="space-y-3 text-white/60 text-sm">
                  <li>
                    <a href="/about" className="hover:text-white transition">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/values" className="hover:text-white transition">
                      Our Values
                    </a>
                  </li>
                  <li>
                    <a href="/careers" className="hover:text-white transition">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-captain text-white text-lg mb-4">Legal</h4>
                <ul className="space-y-3 text-white/60 text-sm">
                  <li>
                    <a href="/privacy" className="hover:text-white transition">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="hover:text-white transition">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="mt-12 border-t border-white/10" />

          {/* bottom row */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>
              &copy; {new Date().getFullYear()} 10x Sports Platform. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.05 9.05 0 0 1-2.87 1.1A4.52 4.52 0 0 0 16.1 0c-2.53 0-4.57 2.1-4.57 4.7 0 .37.04.73.11 1.07-3.8-.2-7.2-2.1-9.47-5a4.82 4.82 0 0 0-.62 2.36c0 1.63.81 3.07 2.06 3.91a4.45 4.45 0 0 1-2.07-.59v.06c0 2.28 1.58 4.19 3.68 4.63a4.52 4.52 0 0 1-2.06.08c.58 1.87 2.27 3.24 4.26 3.28A9.05 9.05 0 0 1 0 19.54 12.77 12.77 0 0 0 6.92 22c8.3 0 12.84-7.2 12.84-13.43 0-.21 0-.42-.01-.63A9.22 9.22 0 0 0 23 3z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.4.3 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1.5 1.5-.5.5-.9.8-1.5 1-.4.2-1.1.3-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.4-.3-1.1-.4-2.3-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .4-.2 1.1-.3 2.3-.4 1.3-.1 1.7-.1 4.9-.1m0-2.2c-3.3 0-3.7 0-5 .1-1.3.1-2.2.2-3 .5-.8.3-1.5.7-2.2 1.4-.7.7-1.1 1.4-1.4 2.2-.3.8-.4 1.7-.5 3-.1 1.3-.1 1.7-.1 5s0 3.7.1 5c.1 1.3.2 2.2.5 3 .3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 3 .5 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.2 3-.5.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.4-1.7.5-3 .1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.2-2.2-.5-3-.3-.8-.7-1.5-1.4-2.2-.7-.7-1.4-1.1-2.2-1.4-.8-.3-1.7-.5-3-.5-1.3-.1-1.7-.1-5-.1z" />
                  <circle cx="12" cy="12" r="3.2" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.45 20.45H16.9V14.9c0-1.32 0-3.01-1.84-3.01-1.85 0-2.14 1.44-2.14 2.93v5.63H9.37V9h3.4v1.56h.05c.47-.89 1.61-1.82 3.31-1.82 3.53 0 4.18 2.32 4.18 5.34v6.36zM5.34 7.43a1.97 1.97 0 1 1 0-3.94 1.97 1.97 0 0 1 0 3.94zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}