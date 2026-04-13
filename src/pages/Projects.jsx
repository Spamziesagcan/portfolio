import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'

const filters = ['All', 'Web', 'Mobile', 'Open Source']

const projects = [
	{
		id: 1,
		name: 'Pulse Commerce',
		category: 'Web',
		techStack: ['React', 'Tailwind', 'Node.js'],
		description:
			'A modern e-commerce dashboard with analytics, product management, and live order tracking.',
		github: 'https://github.com/yourusername/pulse-commerce',
		demo: 'https://pulse-commerce-demo.vercel.app',
		cover: 'from-[#4F46E5] via-[#2563EB] to-[#0891B2]',
	},
	{
		id: 2,
		name: 'Habit Flow',
		category: 'Mobile',
		techStack: ['React Native', 'Expo', 'Firebase'],
		description:
			'A mobile-first habit tracker with reminders, streaks, and social accountability circles.',
		github: 'https://github.com/yourusername/habit-flow',
		demo: 'https://habit-flow.app',
		cover: 'from-[#DB2777] via-[#9333EA] to-[#4F46E5]',
	},
	{
		id: 3,
		name: 'Query Lens',
		category: 'Open Source',
		techStack: ['TypeScript', 'Vite', 'Jest'],
		description:
			'An open-source toolkit for visualizing API response flows and schema changes.',
		github: 'https://github.com/yourusername/query-lens',
		demo: 'https://query-lens.dev',
		cover: 'from-[#16A34A] via-[#15803D] to-[#14532D]',
	},
	{
		id: 4,
		name: 'Studio Notes',
		category: 'Web',
		techStack: ['Next.js', 'Prisma', 'PostgreSQL'],
		description:
			'Collaborative markdown workspace with live collaboration and publishing tools.',
		github: 'https://github.com/yourusername/studio-notes',
		demo: 'https://studio-notes.vercel.app',
		cover: 'from-[#F97316] via-[#EA580C] to-[#C2410C]',
	},
	{
		id: 5,
		name: 'Route Scout',
		category: 'Mobile',
		techStack: ['Flutter', 'Dart', 'Mapbox'],
		description:
			'Travel planner app with saved routes, trip snapshots, and collaborative itineraries.',
		github: 'https://github.com/yourusername/route-scout',
		demo: 'https://route-scout.app',
		cover: 'from-[#0EA5E9] via-[#0284C7] to-[#0369A1]',
	},
	{
		id: 6,
		name: 'Open Sprint',
		category: 'Open Source',
		techStack: ['React', 'Supabase', 'TanStack Query'],
		description:
			'Community sprint board for open-source teams with issue queues and release planning.',
		github: 'https://github.com/yourusername/open-sprint',
		demo: 'https://open-sprint.dev',
		cover: 'from-[#A855F7] via-[#7E22CE] to-[#4C1D95]',
	},
	{
		id: 7,
		name: 'Atlas CMS',
		category: 'Web',
		techStack: ['Vue', 'Pinia', 'Express'],
		description:
			'Headless CMS with versioned content, role-based access, and webhook automations.',
		github: 'https://github.com/yourusername/atlas-cms',
		demo: 'https://atlas-cms.app',
		cover: 'from-[#22C55E] via-[#16A34A] to-[#166534]',
	},
	{
		id: 8,
		name: 'Pocket Ledger',
		category: 'Mobile',
		techStack: ['Kotlin', 'Room', 'Compose'],
		description:
			'Personal finance tracker with budgets, recurring expenses, and smart spending insights.',
		github: 'https://github.com/yourusername/pocket-ledger',
		demo: 'https://pocket-ledger.app',
		cover: 'from-[#EAB308] via-[#CA8A04] to-[#854D0E]',
	},
	{
		id: 9,
		name: 'Lint Garden',
		category: 'Open Source',
		techStack: ['Rust', 'WASM', 'CLI'],
		description:
			'Fast code quality CLI that combines linting and formatting with project presets.',
		github: 'https://github.com/yourusername/lint-garden',
		demo: 'https://lint-garden.dev',
		cover: 'from-[#F43F5E] via-[#E11D48] to-[#9F1239]',
	},
	{
		id: 10,
		name: 'Signal Board',
		category: 'Web',
		techStack: ['Svelte', 'D3', 'WebSocket'],
		description:
			'Real-time metrics dashboard with customizable panels and alert thresholds.',
		github: 'https://github.com/yourusername/signal-board',
		demo: 'https://signal-board.io',
		cover: 'from-[#14B8A6] via-[#0F766E] to-[#134E4A]',
	},
]

function Projects() {
	const [activeFilter, setActiveFilter] = useState('All')

	const filteredProjects = useMemo(() => {
		if (activeFilter === 'All') return projects
		return projects.filter((project) => project.category === activeFilter)
	}, [activeFilter])

	const [selectedProject, setSelectedProject] = useState(projects[0])

	return (
		<PageWrapper className="min-h-full bg-[#121212] px-6 py-8 lg:px-8">
			<h1 className="text-3xl font-bold text-white">Projects as Albums</h1>

			<div className="mt-6 flex flex-wrap gap-3">
				{filters.map((filter) => {
					const isActive = activeFilter === filter
					return (
						<button
							key={filter}
							type="button"
							onClick={() => setActiveFilter(filter)}
							className={[
								'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
								isActive
									? 'bg-[#1DB954] text-black'
									: 'bg-[#282828] text-[#B3B3B3] hover:text-white',
							].join(' ')}
						>
							{filter}
						</button>
					)
				})}
			</div>

			<div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
				<section>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
						{filteredProjects.map((project) => {
							const isSelected = selectedProject.id === project.id
							return (
								<motion.button
									key={project.id}
									type="button"
									onClick={() => setSelectedProject(project)}
									className={[
										'group rounded-lg bg-[#181818] p-3 text-left transition-all duration-300',
										'hover:bg-[#333333]',
										isSelected ? 'ring-1 ring-[#1DB954]/70' : 'ring-1 ring-transparent',
									].join(' ')}
									whileHover={{ scale: 1.04 }}
									transition={{ duration: 0.2, ease: 'easeOut' }}
								>
									<div
										className={[
											'relative aspect-square w-full overflow-hidden rounded-md bg-gradient-to-br',
											project.cover,
										].join(' ')}
									>
										<span className="absolute inset-0 bg-black/10" />
										<span className="absolute left-3 top-3 text-xs font-semibold text-white/80">
											{project.category}
										</span>
										<span className="absolute bottom-3 right-3 inline-flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-[#1DB954] text-black opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
											▶
										</span>
									</div>

									<h3 className="mt-3 line-clamp-1 text-sm font-bold text-white">
										{project.name}
									</h3>
									<p className="mt-1 line-clamp-2 text-xs text-[#B3B3B3]">
										{project.techStack.join(' • ')}
									</p>
								</motion.button>
							)
						})}
					</div>
				</section>

				<aside className="h-fit rounded-xl border border-white/10 bg-[#181818] p-5">
					<p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B3B3B3]">
						Now Playing
					</p>
					<h2 className="mt-2 text-2xl font-bold text-white">{selectedProject.name}</h2>
					<p className="mt-3 text-sm leading-6 text-[#B3B3B3]">
						{selectedProject.description}
					</p>

					<div className="mt-5 flex flex-wrap gap-2">
						{selectedProject.techStack.map((tech) => (
							<span
								key={tech}
								className="rounded-full border border-[#1DB954]/40 bg-[#1DB954]/10 px-3 py-1 text-xs font-medium text-[#1DB954]"
							>
								{tech}
							</span>
						))}
					</div>

					<div className="mt-6 flex flex-wrap gap-3">
						<a
							href={selectedProject.github}
							target="_blank"
							rel="noreferrer"
							className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
						>
							GitHub
						</a>
						<a
							href={selectedProject.demo}
							target="_blank"
							rel="noreferrer"
							className="rounded-full bg-[#1DB954] px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
						>
							Live Demo
						</a>
					</div>
				</aside>
			</div>
		</PageWrapper>
	)
}

export default Projects
