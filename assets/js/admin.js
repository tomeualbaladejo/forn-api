(function () {
	const API_BASE = window.API_BASE || "https://forn-api.onrender.com";
	const tbody = document.getElementById("orders-body");
	const refreshBtn = document.getElementById("refresh");

	function formatDateDDMMYYYY(s) {
		// Accept "YYYY-MM-DD" or ISO strings; take first 10 chars
		if (!s) return "";
		const core = String(s).slice(0, 10); // YYYY-MM-DD
		const [y,m,d] = core.split("-");
		return `${d}/${m}/${y}`;
	}

	async function fetchOrders() {
		const res = await fetch(`${API_BASE}/api/orders?status=pending`, { cache: "no-store" });
		if (!res.ok) {
			alert("Error cargando encargos. ¿Tienes acceso?");
			return;
		}
		const json = await res.json();
		// Ordenar únicamente por fecha de recogida (más próxima primero).
		// Los pedidos sin fecha de recogida se envían al final.
		const orders = (json.orders || [])
			.slice()
			.sort((a, b) => {
				const ar = a.fecha_recogida || "9999-12-31";
				const br = b.fecha_recogida || "9999-12-31";
				return ar > br ? 1 : ar < br ? -1 : 0;
			});
		render(orders);
	}

	function render(orders) {
		tbody.innerHTML = "";
		if (!orders.length) {
			const tr = document.createElement("tr");
			const td = document.createElement("td");
			td.colSpan = 6;
			td.textContent = "Sin encargos por ahora.";
			tr.appendChild(td);
			tbody.appendChild(tr);
			return;
		}
		for (const o of orders) {
			const tr = document.createElement("tr");
			const fr = formatDateDDMMYYYY(o.fecha_recogida);
			tr.innerHTML = `
				<td><span class="date-badge">${formatDateDDMMYYYY(o.fecha_creacion)}</span></td>
				<td><span class="date-badge date-badge--pickup">${fr || "—"}</span></td>
				<td>${o.nombre} ${o.apellidos}</td>
				<td><a href="tel:${o.telefono}">${o.telefono}</a></td>
				<td>${(o.pedido || "").replace(/\\n/g, "<br>")}</td>
				<td><span class="status${o.estado === "preparada" ? " estado-preparada" : ""}">${o.estado}</span></td>
				<td class="row-actions">
					<button data-action="edit" data-id="${o.id}" class="btn">Editar</button>
					<button data-action="prep" data-id="${o.id}" class="btn">Preparada</button>
					<button data-action="del" data-id="${o.id}" class="btn btn--ghost">Eliminar</button>
				</td>
			`;
			tbody.appendChild(tr);
		}
	}

	// helper to update DOM to prepared without reloading
	function setRowPrepared(tr) {
		const badge = tr?.querySelector(".status");
		if (badge) {
			badge.textContent = "preparada";
			badge.classList.add("estado-preparada");
		}
		const prepBtn = tr?.querySelector('button[data-action="prep"]');
		if (prepBtn) prepBtn.disabled = true;
	}

	// Edit modal wiring
	const editModal = document.getElementById("edit-modal");
	const editForm = document.getElementById("edit-form");
	const editSuccess = document.getElementById("edit-success");
	let currentEditRow = null;

	function openEdit(order, tr) {
		currentEditRow = tr;
		editForm.dataset.id = order.id;
		editForm.nombre.value = order.nombre || "";
		editForm.apellidos.value = order.apellidos || "";
		editForm.telefono.value = order.telefono || "";
		editForm.fecha_recogida.value = (order.fecha_recogida || "").slice(0,10);
		editForm.pedido.value = order.pedido || "";
		editForm.estado.value = order.estado || "pendiente";
		editSuccess.hidden = true;
		editModal.setAttribute("aria-hidden","false");
		document.body.style.overflow = "hidden";
	}
	function closeEdit() {
		editModal.setAttribute("aria-hidden","true");
		document.body.style.overflow = "";
		editForm.reset();
		currentEditRow = null;
	}
	editModal?.addEventListener("click", (e) => {
		if (e.target.matches("[data-close]") || e.target.classList.contains("adm-backdrop")) {
			closeEdit();
		}
	});
	editForm?.addEventListener("submit", async (e) => {
		e.preventDefault();
		const id = editForm.dataset.id;
		const payload = {
			nombre: editForm.nombre.value.trim(),
			apellidos: editForm.apellidos.value.trim(),
			telefono: editForm.telefono.value.trim(),
			fecha_recogida: editForm.fecha_recogida.value,
			pedido: editForm.pedido.value.trim(),
			estado: editForm.estado.value
		};
		const res = await fetch(`${API_BASE}/api/orders/${id}`, {
			method: "PUT",
			headers: { "Content-Type":"application/json" },
			body: JSON.stringify(payload)
		});
		if (!res.ok) { alert("No se han podido guardar los cambios."); return; }
		// Update DOM row
		if (currentEditRow) {
			const tds = currentEditRow.querySelectorAll("td");
			// 0 fecha pedido (unchanged), 1 recogida, 2 nombre, 3 tel, 4 pedido, 5 estado
			tds[1].querySelector(".date-badge").textContent = formatDateDDMMYYYY(payload.fecha_recogida);
			tds[2].textContent = `${payload.nombre} ${payload.apellidos}`;
			const telLink = tds[3].querySelector("a");
			telLink.textContent = payload.telefono;
			telLink.href = `tel:${payload.telefono}`;
			tds[4].innerHTML = (payload.pedido || "").replace(/\\n/g,"<br>");
			const statusBadge = tds[5].querySelector(".status");
			statusBadge.textContent = payload.estado;
			statusBadge.classList.toggle("estado-preparada", payload.estado === "preparada");
		}
		editSuccess.hidden = false;
		setTimeout(closeEdit, 900);
	});

	async function onClick(e) {
		const btn = e.target.closest("button[data-action]");
		if (!btn) return;
		const id = btn.getAttribute("data-id");
		const action = btn.getAttribute("data-action");
		const tr = btn.closest("tr");
		if (action === "edit") {
			// Fetch full order to edit (admin is authorized)
			const res = await fetch(`${API_BASE}/api/orders/${id}`, { method:"GET" });
			if (!res.ok) { alert("No se ha podido cargar el pedido."); return; }
			const json = await res.json();
			if (!json.ok || !json.order) { alert("No se ha podido cargar el pedido."); return; }
			openEdit(json.order, tr);
		} else if (action === "prep") {
			const res = await fetch(`${API_BASE}/api/orders/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ estado: "preparada" }) });
			if (!res.ok) { alert("No se ha podido marcar como preparada."); return; }
			setRowPrepared(tr);
		} else if (action === "del") {
			if (!confirm("¿Eliminar reserva?")) return;
			const res = await fetch(`${API_BASE}/api/orders/${id}`, { method: "DELETE" });
			if (!res.ok) { alert("No se ha podido eliminar."); return; }
			// remove row after delete
			tr?.remove();
		}
	}

	refreshBtn?.addEventListener("click", fetchOrders);
	tbody?.addEventListener("click", onClick);

	fetchOrders();
})();

