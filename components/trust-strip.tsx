"use client"

const LOGOS = [
  // US Pro Leagues
  "https://upload.wikimedia.org/wikipedia/en/a/a2/National_Football_League_logo.svg",
  "https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg",
  "https://upload.wikimedia.org/wikipedia/en/a/a6/Major_League_Baseball_logo.svg",
  "https://upload.wikimedia.org/wikipedia/en/3/3a/05_NHL_Shield.svg",
  "https://upload.wikimedia.org/wikipedia/commons/7/76/Major_League_Soccer_logo.svg",
  // Media Networks
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/ESPN_wordmark.svg",
  "https://upload.wikimedia.org/wikipedia/commons/8/8e/Fox_Sports_logo_2019.svg",
  "https://upload.wikimedia.org/wikipedia/commons/1/1b/CBS_Sports_2020.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2c/NBC_Sports_logo_2014.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/5d/Sky_Sports_logo_2017.svg",
  "https://upload.wikimedia.org/wikipedia/commons/7/7a/DAZN_logo.svg",
  // Social/Platforms
  "https://upload.wikimedia.org/wikipedia/commons/4/4f/YouTube_icon_%282013-2017%29.png",
  "https://upload.wikimedia.org/wikipedia/commons/3/31/Twitter_Logo_Blue.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
  "https://upload.wikimedia.org/wikipedia/commons/0/0b/TikTok_logo.svg",
]

export default function TrustStrip() {
  // duplicate array so it loops seamlessly
  const logos = [...LOGOS, ...LOGOS]

  return (
    <section className="py-20 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto max-h-5xl px-4 sm:px-6">
        <p className="text-center text-white/60 mb-10 text-sm md:text-lg uppercase tracking-wider font-medium">
          Trusted by leading sports organizations
        </p>

        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="carousel-track gap-16">
            {logos.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-10 md:h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
