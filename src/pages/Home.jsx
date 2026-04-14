import { useState } from 'react'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import heroImage from '../assets/hero.png'
import PageWrapper from '../components/PageWrapper'
import HeroWaveform from '../components/HeroWaveform'

const featuredCards = [
	{
		title: 'Latest Project',
		subtitle: 'Spotify Portfolio Web App',
	},
	{
		title: 'Top Skill',
		subtitle: 'React + Tailwind CSS',
	},
	{
		title: 'Current Role',
		subtitle: 'Frontend Developer',
	},
]

function getGreetingByTime() {
	const hour = new Date().getHours()

	if (hour < 12) return 'Good morning'
	if (hour < 18) return 'Good afternoon'
	return 'Good evening'
}

function Home() {
	const [isHeroHovered, setIsHeroHovered] = useState(false)
	const greeting = getGreetingByTime()

	return (
		<PageWrapper className="min-h-full bg-[#121212] text-white">
			<header className="relative isolate overflow-hidden bg-gradient-to-b from-[#3a2d6f] via-[#223b66] to-[#121212] px-8 pt-10 pb-8">
				<div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
					<div
						onMouseEnter={() => setIsHeroHovered(true)}
						onMouseLeave={() => setIsHeroHovered(false)}
						className="relative flex h-[260px] w-[260px] shrink-0 items-center justify-center"
					>
						<HeroWaveform isHovered={isHeroHovered} />

						<img
							src={heroImage}
							alt="Profile"
							className="relative z-10 h-36 w-36 rounded-full border-4 border-white/20 object-cover shadow-2xl"
						/>
					</div>

					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B3B3B3]">
							Artist Profile
						</p>
						<h1 className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl">
							Your Name
						</h1>
						<p className="mt-2 text-base text-[#B3B3B3]">Full-Stack Developer</p>

						<div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#B3B3B3]">
							<span>
								<span className="font-semibold text-white">420+</span> GitHub stars
							</span>
							<span className="hidden h-1 w-1 rounded-full bg-[#B3B3B3] sm:inline-block" />
							<span>
								<span className="font-semibold text-white">4+</span> years of experience
							</span>
							<span className="hidden h-1 w-1 rounded-full bg-[#B3B3B3] sm:inline-block" />
							<span>
								<span className="font-semibold text-white">30+</span> projects built
							</span>
						</div>
					</div>
				</div>
			</header>

			<section className="px-8 pb-10 pt-2">
				<h2 className="text-2xl font-bold text-white">{greeting}</h2>

				<div className="mt-6 overflow-x-auto pb-2">
					<div className="flex w-max gap-4">
						{featuredCards.map((card) => (
							<motion.article
								key={card.title}
								className="hoverable group relative h-40 w-40 shrink-0 rounded-xl bg-[#282828] p-4 transition-all duration-300 hover:brightness-110"
								whileHover={{ scale: 1.04 }}
								transition={{ duration: 0.2, ease: 'easeOut' }}
							>
								<h3 className="text-sm font-bold text-white">{card.title}</h3>
								<p className="mt-2 text-xs leading-5 text-[#B3B3B3]">{card.subtitle}</p>

								<button
									type="button"
									aria-label={`Play ${card.title}`}
									className="hoverable absolute bottom-4 right-4 inline-flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-[#1DB954] text-black opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
								>
									<Play className="ml-0.5 h-5 w-5 fill-current" />
								</button>
							</motion.article>
						))}
					</div>
				</div>
			</section>
		</PageWrapper>
	)
}

export default Home
