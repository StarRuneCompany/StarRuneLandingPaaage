import type { ISliderFullscreen } from "@/utils/types";
import SliderControls from "@/components/slider-controls";
import Image from "@/components/image";

export default function SliderFullscreen({ slides, activeId, handleFullscreen, previousImage, nextImage, fullscreen }: ISliderFullscreen) {
	return (
		<div className={`fixed inset-0 bg-slate-700 z-50 transition-all duration-300 flex flex-col items-center justify-center overscroll-contain ${fullscreen ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"}`}>
			<nav className="w-full h-header min-h-[var(--header-height)] border-b bg-background">
				<SliderControls
					slides={slides}
					activeId={activeId}
					handleFullscreen={handleFullscreen}
					previousImage={previousImage}
					nextImage={nextImage}
					isFullscreen={true}
					className="container h-full px-4"
				/>
			</nav>

			<div className="relative h-full flex items-center justify-center max-h-[calc(100vh-var(--header-height))] w-full">
				<Image
					src={`/${slides[activeId].src}`}
					alt={slides[activeId].alt}
					className="flex aspect-abilities h-auto w-full max-h-[calc(100vh-var(--header-height))] opacity-0 pointer-events-none"
					height={1080}
					width={1920}
				/>

				{slides.map(({ id, src, alt }) => (
					<Image
						key={id}
						src={`/${src}`}
						alt={alt}
						className={`absolute top-[50%] left-[50%] flex will-change-transform aspect-abilities h-auto w-full max-h-[calc(100vh-var(--header-height))] translate-x-[-50%] translate-y-[-50%] transition-all duration-1000 ${activeId === id ? "clip-path-open" : activeId > id ? "clip-path-left" : "clip-path-right"}`}
					//height={1080}
					//width={1920}
					/>
				))}
			</div>
		</div>
	)
}
