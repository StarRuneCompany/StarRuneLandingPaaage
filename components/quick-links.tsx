import type { IQuickLinks } from "@/utils/types";
import { useRef } from "react";
import Link from "next/link";
import data from "@/utils/data";

function smoothScrollTo(targetId: string) {
	const el = document.getElementById(targetId);
	if (!el) return;

	const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 0;
	const targetY = el.getBoundingClientRect().top + window.scrollY - headerHeight;
	const startY = window.scrollY;
	const distance = targetY - startY;
	const duration = 600;
	let start: number | null = null;

	function step(timestamp: number) {
		if (!start) start = timestamp;
		const progress = Math.min((timestamp - start) / duration, 1);
		const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
		window.scrollTo(0, startY + distance * ease);
		if (progress < 1) requestAnimationFrame(step);
	}

	requestAnimationFrame(step);
}

export default function QuickLinks({ className, floatClassName, linkClassName, aspectColumn, hiddenLinksDesktop, handleCloseMobileMenu, resourceLinks }: IQuickLinks) {

	const navRef = useRef<HTMLDivElement>(null);

	function handleNavHover(_: any, mouseIn: boolean, index: number) {
		if (!navRef.current) return;

		const float = navRef.current.children[0] as HTMLSpanElement;

		if (mouseIn) {
			const link = navRef.current.children[index + 1] as HTMLAnchorElement;

			if (aspectColumn) {
				float.style.height = `${link.offsetHeight}px`;
			} else {
				float.style.width = `${link.offsetWidth}px`;
			}

			if (aspectColumn) {
				float.style.transform = `translate3d(0, ${link.offsetTop}px, 0) skew(12deg, 0)`;
			} else {
				float.style.transform = `translate3d(${link.offsetLeft}px, 0, 0) skew(12deg, 0)`;
			}

			float.classList.add("opacity-100");
			return;
		}

		float.classList.remove("opacity-100");
	}

	const links = resourceLinks ? data.resourceLinks : data.homeLinks;

	return (
		<nav ref={navRef} className={`relative${className ? ` ${className}` : ""}`}>
			<span className={`absolute ${aspectColumn ? "-inset-x-1" : "-inset-y-1"} shadow-yellow-400/30 shadow-xl bg-yellow-400 opacity-0 transition-all duration-300 -z-1 pointer-events-none${floatClassName ? ` ${floatClassName}` : ""}`}></span>

			{links.map((link, index) => {
				const isHashLink = !("url" in link);
				const cls = `relative duration-300 transition-all hover:rotate-cta ${hiddenLinksDesktop?.includes(index) ? " hidden 2xl:inline" : ""}${linkClassName ? ` ${linkClassName}` : ""}`;
				const hoverProps = {
					onMouseEnter: (e: any) => handleNavHover(e, true, index),
					onMouseOut: (e: any) => handleNavHover(e, false, index),
					onTouchStart: (e: any) => handleNavHover(e, true, index),
					onTouchEnd: (e: any) => handleNavHover(e, false, index),
				};

				if (isHashLink) {
					return (
						<a
							key={link.id}
							href={`#${link.id}`}
							className={cls}
							onClick={(e) => {
								e.preventDefault();
								smoothScrollTo(link.id);
								handleCloseMobileMenu?.();
							}}
							{...hoverProps}
						>
							{link.title}
						</a>
					);
				}

				return (
					<Link
						key={link.id}
						href={link.url}
						prefetch={false}
						className={cls}
						{...hoverProps}
					>
						{link.title}
					</Link>
				);
			})}
		</nav>
	)
}
