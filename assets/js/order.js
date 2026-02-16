(function () {
	// configurable API base for cross-origin deployments (Render)
	const API_BASE = window.API_BASE || "https://forn-api.onrender.com";
	const modal = document.getElementById("order-modal");
	const openBtn = document.getElementById("open-order");
	const closeEls = modal?.querySelectorAll("[data-close]");
	const form = document.getElementById("order-form");
	const success = document.getElementById("order-success");
	const dateInput = document.getElementById("fecha_recogida");
	const submitBtn = form?.querySelector('button[type="submit"]');

	function open() {
		modal.setAttribute("aria-hidden", "false");
		document.body.style.overflow = "hidden";
		form?.reset();
		if (submitBtn) { submitBtn.disabled = false; }
		if (form) { delete form.dataset.submitting; delete form.dataset.sent; }
		if (success) success.hidden = true;
	}
	function close() {
		modal.setAttribute("aria-hidden", "true");
		document.body.style.overflow = "";
	}

	openBtn?.addEventListener("click", open);
	closeEls?.forEach(el => el.addEventListener("click", close));
	window.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

	function isValidPhone(value) {
		return /^[+0-9()\\s-]{6,}$/.test(value || "");
	}

	function formatLocalDateYYYYMMDD(d) {
		const dt = new Date(d.getFullYear(), d.getMonth(), d.getDate());
		const y = dt.getFullYear();
		const m = String(dt.getMonth() + 1).padStart(2, "0");
		const day = String(dt.getDate()).padStart(2, "0");
		return `${y}-${m}-${day}`;
	}

	// Configure min date as today and default to today
	(function initDateField() {
		if (!dateInput) return;
		const today = new Date();
		const todayStr = formatLocalDateYYYYMMDD(today);
		dateInput.min = todayStr;
		dateInput.value = todayStr;
	})();

	async function submitOrder(event) {
		event.preventDefault();
		if (form?.dataset.submitting === "true" || form?.dataset.sent === "true") return;
		form.dataset.submitting = "true";
		if (submitBtn) submitBtn.disabled = true;
		const data = {
			nombre: form.nombre.value.trim(),
			apellidos: form.apellidos.value.trim(),
			telefono: form.telefono.value.trim(),
			fecha_recogida: form.fecha_recogida.value,
			pedido: form.pedido.value.trim()
		};
		// Validate requireds
		const todayStr = formatLocalDateYYYYMMDD(new Date());
		if (!data.nombre || !data.apellidos || !isValidPhone(data.telefono) || !data.fecha_recogida || data.pedido.length === 0) {
			alert("Por favor, revisa los campos obligatorios.");
			return;
		}
		if (data.fecha_recogida < todayStr) {
			alert("La fecha de recogida no puede ser anterior a hoy.");
			return;
		}
		try {
			const res = await fetch(`${API_BASE}/api/orders`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			});
			if (!res.ok) throw new Error("Network error");
			const payload = await res.json();
			// Save id+token so the client can manage their own order later
			if (payload && payload.order && payload.token) {
				try { localStorage.setItem("fct_my_order", JSON.stringify({ id: payload.order.id, token: payload.token })); } catch {}
			}
			// Build friendly success with selected date
			const [y,m,d] = data.fecha_recogida.split("-");
			const ddmmyyyy = `${d}/${m}/${y}`;
            if (success) {
                const lang = document.documentElement.lang || "es";
                const mainMsg = {
                    es: `Hemos recibido tu encargo, te esperamos el día: ${ddmmyyyy}.`,
                    ca: `Hem rebut s'encàrrec, t’esperam es dia: ${ddmmyyyy}.`,
                    en: `We’ve received your order, see you on ${ddmmyyyy}.`
                }[lang] || `Hemos recibido tu encargo, te esperamos el día: ${ddmmyyyy}.`;
                const cancelNote = {
                    es: `Para modificar o cancelar el encargo, llama al <a href="tel:971502581"><strong>971 502 581</strong></a>.`,
                    ca: `Per modificar o cancel·lar l'encàrrec, crida al <a href="tel:971502581"><strong>971 502 581</strong></a>.`,
                    en: `To modify or cancel your order, please call <a href="tel:971502581"><strong>971 502 581</strong></a>.`
                }[lang] || `Para modificar o cancelar el encargo, llama al <a href="tel:971502581"><strong>971 502 581</strong></a>.`;

                success.innerHTML = `<span class="msg-main">${mainMsg}</span><span class="cancel-note">${cancelNote}</span>`;
                success.hidden = false;
                success.removeAttribute("hidden");
                try { success.scrollIntoView({ behavior: "smooth", block: "center" }); } catch {}
            }
			// Clear form and prevent duplicate sends
			form.reset();
			// Reset date to today and keep disabled submit until modal reopens
			(function initDateAgain(){
				if (!dateInput) return;
				const t = new Date();
				const todayStr = formatLocalDateYYYYMMDD(t);
				dateInput.min = todayStr;
				dateInput.value = todayStr;
			})();
			form.dataset.sent = "true";
		} catch (e) {
			alert("No s'ha pogut enviar l'encàrrec. Torna-ho a provar.");
			if (submitBtn) submitBtn.disabled = false;
			delete form.dataset.submitting;
			return;
		}
		// Keep button disabled to avoid duplicates until modal se cierre
	}
	form?.addEventListener("submit", submitOrder);
})();

