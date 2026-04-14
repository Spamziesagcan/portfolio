import { Fragment, useMemo, useState } from 'react'
import { ExternalLink, Play } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

const timelineBars = [24, 34, 18, 42, 30, 56, 38, 62, 46, 68, 52, 74, 60, 80]

const experiences = [
	{
		id: '1',
		company: 'DevPulse Labs',
		initials: 'DL',
		logoColor: 'bg-[#7C3AED]',
		role: 'Frontend Engineer',
		duration: '2024 - Present',
		highlights: 'Built performant UI systems and analytics dashboards.',
		achievements: [
			'Led migration from legacy CSS to Tailwind, reducing styling debt by 40%.',
			'Shipped reusable component library used across 5 internal products.',
			'Improved Lighthouse performance score from 72 to 95 on the flagship app.',
		],
		tech: ['React', 'TypeScript', 'Tailwind', 'Vite'],
		website: 'https://example.com/devpulse',
	},
	{
		id: '2',
		company: 'BlueOrbit Systems',
		initials: 'BO',
		logoColor: 'bg-[#0EA5E9]',
		role: 'Software Developer',
		duration: '2022 - 2024',
		highlights: 'Delivered product modules for B2B workflow automation.',
		achievements: [
			'Implemented multi-tenant auth flows and RBAC for enterprise clients.',
			'Created dashboard widgets with real-time updates over WebSocket.',
			'Reduced bug backlog by introducing shared validation utilities and tests.',
		],
		tech: ['Node.js', 'React', 'PostgreSQL', 'Docker'],
		website: 'https://example.com/blueorbit',
	},
	{
		id: '3',
		company: 'Open Collective Tech',
		initials: 'OC',
		logoColor: 'bg-[#16A34A]',
		role: 'Open Source Contributor',
		duration: '2021 - 2022',
		highlights: 'Contributed features and DX improvements to OSS tools.',
		achievements: [
			'Authored plugin docs and starter templates adopted by community maintainers.',
			'Fixed memory leak issues in a high-traffic data visualization package.',
			'Mentored first-time contributors through issue triage and code reviews.',
		],
		tech: ['JavaScript', 'GitHub Actions', 'D3', 'Jest'],
		website: 'https://example.com/opencollective',
	},
]

function Experience() {
	const [expandedId, setExpandedId] = useState(experiences[0].id)

	const activeExperience = useMemo(
		() => experiences.find((item) => item.id === expandedId),
		[expandedId],
	)

	return (
		<PageWrapper className="min-h-full bg-[#121212] px-6 py-8 lg:px-8">
			<section className="rounded-xl border border-white/10 bg-[#181818] p-5">
				<p className="text-xs uppercase tracking-[0.14em] text-[#B3B3B3]">Career Timeline</p>
				<h1 className="mt-2 text-3xl font-bold text-white">Recently Played Experience</h1>
				<p className="mt-2 text-sm text-[#B3B3B3]">
					A waveform view of career growth and impact over time.
				</p>

				<div className="mt-6 flex h-24 items-end gap-1.5">
					{timelineBars.map((height, index) => (
						<div
							key={index}
							className="w-3 rounded-t-full bg-gradient-to-t from-[#1DB954] via-[#1DB954]/70 to-[#2A2A2A]"
							style={{ height: `${height}%` }}
							aria-hidden="true"
						/>
					))}
				</div>

				<div className="mt-3 flex justify-between text-xs text-[#B3B3B3]">
					<span>2021</span>
					<span>2026</span>
				</div>
			</section>

			<section className="mt-8 rounded-xl border border-white/10 bg-[#181818] p-3 sm:p-5">
				<div className="overflow-x-auto">
					<table className="w-full border-collapse">
						<thead>
							<tr className="border-b border-white/10">
								<th className="w-14 px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B3B3B3]">
									#
								</th>
								<th className="px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B3B3B3]">
									Company
								</th>
								<th className="px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B3B3B3]">
									Role
								</th>
								<th className="px-3 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B3B3B3]">
									Duration
								</th>
								<th className="px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B3B3B3]">
									Highlights
								</th>
							</tr>
						</thead>

						<tbody>
							{experiences.map((item, index) => {
								const expanded = expandedId === item.id

								return (
									<Fragment key={item.id}>
										<tr
											onClick={() => setExpandedId(expanded ? '' : item.id)}
											className="hoverable group cursor-pointer border-b border-white/5 transition-colors hover:bg-[#282828]"
										>
											<td className="px-3 py-3">
												<div className="relative flex h-6 w-6 items-center justify-center text-sm text-[#B3B3B3]">
													<span className="group-hover:opacity-0">{index + 1}</span>
													<Play className="absolute h-4 w-4 text-[#1DB954] opacity-0 group-hover:opacity-100" />
												</div>
											</td>

											<td className="px-3 py-3">
												<div className="flex items-center gap-3">
													<span
														className={[
															'inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white',
															item.logoColor,
														].join(' ')}
													>
														{item.initials}
													</span>
													<span className="font-semibold text-white">{item.company}</span>
												</div>
											</td>

											<td className="px-3 py-3 text-[#B3B3B3]">{item.role}</td>
											<td className="px-3 py-3 text-right text-[#B3B3B3]">{item.duration}</td>
											<td className="px-3 py-3 text-[#B3B3B3]">{item.highlights}</td>
										</tr>

										{expanded ? (
											<tr className="border-b border-white/5 bg-[#151515]">
												<td colSpan={5} className="px-4 pb-5 pt-2">
													<div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
														<div>
															<p className="text-xs uppercase tracking-[0.12em] text-[#B3B3B3]">
																Key Achievements
															</p>
															<ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[#E5E5E5]">
																{item.achievements.map((point) => (
																	<li key={point}>{point}</li>
																))}
															</ul>

															<div className="mt-4 flex flex-wrap gap-2">
																{item.tech.map((tech) => (
																	<span
																		key={tech}
																		className="rounded-full border border-[#1DB954]/40 bg-[#1DB954]/10 px-3 py-1 text-xs font-medium text-[#1DB954]"
																	>
																		{tech}
																	</span>
																))}
															</div>
														</div>

														<a
															href={item.website}
															target="_blank"
															rel="noreferrer"
															className="hoverable inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
														>
															Company Website
															<ExternalLink className="h-4 w-4" />
														</a>
													</div>
												</td>
											</tr>
										) : null}
									</Fragment>
								)
							})}
						</tbody>
					</table>
				</div>
			</section>

			{activeExperience ? (
				<p className="mt-4 text-xs text-[#B3B3B3]">
					Selected: <span className="text-white">{activeExperience.company}</span>
				</p>
			) : null}
		</PageWrapper>
	)
}

export default Experience
