(function () {
	const strip = document.getElementById("gallery-strip");
	if (!strip) return;

	// Fetch list of images from backend and render as a scroll-snap slider
	async function load() {
		try {
			const res = await fetch("/api/gallery", { cache: "no-store" });
			const json = await res.json();
			if (!json.ok) throw new Error();
			render(json.images || []);
		} catch (e) {
			// Silent fail to keep the page clean if no images
			render([]);
		}
	}

	function render(images) {
		strip.innerHTML = "";
		if (!images.length) { strip.style.display = "none"; return; }
		strip.style.display = "";
		images.forEach(src => {
			// Only append images that actually load to avoid empty slots
			const probe = new Image();
			probe.onload = () => {
				const item = document.createElement("div");
				item.className = "gallery-item";
				const img = document.createElement("img");
				img.src = src;
				img.alt = ""; // decorative
				img.loading = "lazy";
				item.appendChild(img);
				strip.appendChild(item);
			};
			probe.onerror = () => {}; // ignore broken files silently
			probe.src = src;
		});
		enableDragScroll(strip);
	}

	// Enable mouse/touch drag scrolling for desktop
	function enableDragScroll(container) {
		let isDown = false;
		let startX = 0;
		let scrollLeft = 0;
		container.addEventListener("pointerdown", (e) => {
			isDown = true;
			startX = e.clientX;
			scrollLeft = container.scrollLeft;
			container.setPointerCapture(e.pointerId);
		});
		container.addEventListener("pointermove", (e) => {
			if (!isDown) return;
			const dx = e.clientX - startX;
			container.scrollLeft = scrollLeft - dx;
		});
		["pointerup","pointercancel","pointerleave"].forEach(type => {
			container.addEventListener(type, () => { isDown = false; });
		});
	}

	load();
})();

