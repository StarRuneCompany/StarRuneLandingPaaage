import type { ISectionHeader } from "@/utils/types";

export default function SectionHeader({ id, title, text, h1 }: ISectionHeader) {
	return (
		<div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
			<div className="space-y-2 max-w-4xl">
				{h1 ?
					<h1 className="leading-[1.1] sm:leading-[1.1] md:leading-[1.1] lg:leading-[1.1] text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-600">
						{title}
					</h1>
					:
					<h2 className="leading-[1.1] sm:leading-[1.1] md:leading-[1.1] lg:leading-[1.1] text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-600">
						{title}
					</h2>
				}

				<p className="text-slate-600 md:text-xl lg:text-xl max-w-[900px] mx-auto">
					{text}
				</p>
			</div>
		</div>
	)
}
