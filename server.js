"use strict";

/**
 * Minimal order system server for Forn Can Tomeu
 * - Serves static files from project root
 * - Public API: POST /api/orders  (create order)
 * - Admin API (basic auth): GET /api/orders, PUT /api/orders/:id, DELETE /api/orders/:id
 * - Persists to JSON file at ./data/orders.json
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = process.env.PORT || 5173;
const ROOT = path.resolve(__dirname);
// Allow overriding data directory for persistent storage on Render
const DATA_DIR = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(ROOT, "data");
const DATA_FILE = path.join(DATA_DIR, "orders.json");
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "https://forncantomeu.com";

// Simple admin credentials (change these in production)
const ADMIN_USER = process.env.ADMIN_USER || "forner";
const ADMIN_PASS = process.env.ADMIN_PASS || "tomeu1930";
const ADMIN_REALM = "Forn Can Tomeu Admin";

function ensureDataFile() {
	if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
	if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}
ensureDataFile();

function send(res, status, body, headers = {}) {
	const payload = typeof body === "string" ? body : JSON.stringify(body);
	res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", ...headers });
	res.end(payload);
}

function sendStatic(req, res, pathname) {
	// Prevent path traversal
	const filePath = path.join(ROOT, pathname.replace(/^\/+/, ""));
	if (!filePath.startsWith(ROOT)) return send(res, 403, { error: "Forbidden" });
	const ext = path.extname(filePath).toLowerCase();
	const map = {
		".html": "text/html; charset=utf-8",
		".css": "text/css; charset=utf-8",
		".js": "application/javascript; charset=utf-8",
		".png": "image/png",
		".jpg": "image/jpeg",
		".jpeg": "image/jpeg",
		".webp": "image/webp",
		".svg": "image/svg+xml",
		".ico": "image/x-icon"
	};
	const type = map[ext] || "application/octet-stream";
	fs.readFile(filePath, (err, data) => {
		if (err) {
			if (err.code === "ENOENT") return send(res, 404, { error: "Not found" });
			return send(res, 500, { error: "Server error" });
		}
		res.writeHead(200, { "Content-Type": type });
		res.end(data);
	});
}

function parseBody(req) {
	return new Promise((resolve, reject) => {
		let data = "";
		req.on("data", chunk => (data += chunk));
		req.on("end", () => {
			try {
				const json = data ? JSON.parse(data) : {};
				resolve(json);
			} catch {
				reject(new Error("Invalid JSON"));
			}
		});
	});
}

function localDateStringYYYYMMDD(date = new Date()) {
	const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
}
function isValidDateString(s) {
	return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function readOrders() {
	const raw = fs.readFileSync(DATA_FILE, "utf-8");
	const list = JSON.parse(raw || "[]");
	// Normalize legacy records to keep only dates (YYYY-MM-DD)
	let changed = false;
	const normalized = list.map(o => {
		const n = { ...o };
		if (n.fecha_creacion) {
			const onlyDate = String(n.fecha_creacion).slice(0, 10); // handles ISO strings
			if (n.fecha_creacion !== onlyDate) {
				n.fecha_creacion = onlyDate;
				changed = true;
			}
		}
		return n;
	});
	if (changed) writeOrders(normalized);
	return normalized;
}
function writeOrders(orders) {
	// Atomic write
	const tmp = DATA_FILE + ".tmp";
	fs.writeFileSync(tmp, JSON.stringify(orders, null, 2), "utf-8");
	fs.renameSync(tmp, DATA_FILE);
}

function randomToken(length = 16) {
	const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
	let out = "";
	for (let i = 0; i < length; i++) {
		out += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return out;
}

function isAuthorized(req) {
	const header = req.headers["authorization"];
	if (!header || !header.startsWith("Basic ")) return false;
	const decoded = Buffer.from(header.slice(6), "base64").toString("utf-8");
	const [user, pass] = decoded.split(":");
	return user === ADMIN_USER && pass === ADMIN_PASS;
}

function requireAuth(req, res) {
	if (isAuthorized(req)) return true;
	res.writeHead(401, {
		"WWW-Authenticate": `Basic realm="${ADMIN_REALM}"`,
		"X-Robots-Tag": "noindex, nofollow"
	});
	res.end("Auth required");
	return false;
}

const server = http.createServer(async (req, res) => {
	const { pathname, query } = url.parse(req.url, true);
	// CORS (allow static site origin, and localhost for development)
	const origin = req.headers.origin || "";
	const isDev =
		/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin) ||
		!origin; // direct calls (same-origin) or tools
	if (origin && (origin === ALLOWED_ORIGIN || isDev)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
		res.setHeader("Vary", "Origin");
		res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	}
	if (req.method === "OPTIONS") {
		res.writeHead(204);
		res.end();
		return;
	}

	// API routes
	if (pathname === "/api/orders" && req.method === "POST") {
		try {
			const body = await parseBody(req);
			const { nombre, apellidos, telefono, pedido, fecha_recogida } = body || {};
			if (!nombre || !apellidos || !telefono || !pedido || !fecha_recogida) return send(res, 400, { ok: false, error: "Campos obligatorios" });
			if (!isValidDateString(fecha_recogida)) return send(res, 400, { ok: false, error: "Fecha inválida" });
			const today = localDateStringYYYYMMDD();
			if (fecha_recogida < today) return send(res, 400, { ok: false, error: "Fecha anterior a hoy" });
			const orders = readOrders();
			const id = orders.length ? Math.max(...orders.map(o => o.id || 0)) + 1 : 1;
			const now = new Date();
			const order = {
				id,
				fecha_creacion: localDateStringYYYYMMDD(now),
				fecha_recogida: String(fecha_recogida),
				nombre: String(nombre),
				apellidos: String(apellidos),
				telefono: String(telefono),
				pedido: String(pedido || ""),
				estado: "pendiente",
				client_token: randomToken(16)
			};
			orders.push(order);
			writeOrders(orders);
			const { client_token: _, ...safe } = order;
			return send(res, 200, { ok: true, order: safe, token: order.client_token });
		} catch (e) {
			return send(res, 400, { ok: false, error: "JSON inválido" });
		}
	}

	// Public read one order with token (or admin)
	if (pathname.startsWith("/api/orders/") && req.method === "GET") {
		const id = parseInt(pathname.split("/").pop(), 10);
		const { token } = query;
		const orders = readOrders();
		const found = orders.find(o => o.id === id);
		if (!found) return send(res, 404, { ok: false, error: "No existe" });
		if (isAuthorized(req) || (token && token === found.client_token)) {
			const { client_token: __, ...safe } = found;
			return send(res, 200, { ok: true, order: safe });
		}
		return send(res, 401, { ok: false, error: "Auth/token requerido" });
	}

	if (pathname === "/api/orders" && req.method === "GET") {
		if (!requireAuth(req, res)) return;
		const orders = readOrders();
		let result = orders;
		if (query.day === "today") {
			const today = localDateStringYYYYMMDD();
			result = orders.filter(o => (o.fecha_recogida || o.fecha_creacion) === today);
		}
		// Status filter (default: pending only)
		const status = query.status || "pending";
		if (status === "pending") {
			result = result.filter(o => o.estado !== "preparada");
		} // if status=all → no filter
		result.sort((a,b) => {
			const ar = a.fecha_recogida || a.fecha_creacion || "";
			const br = b.fecha_recogida || b.fecha_creacion || "";
			if (ar === br) {
				const ac = a.fecha_creacion || "";
				const bc = b.fecha_creacion || "";
				return ac > bc ? 1 : ac < bc ? -1 : 0;
			}
			return ar > br ? 1 : -1;
		});
		return send(res, 200, { ok: true, orders: result }, { "X-Robots-Tag": "noindex, nofollow" });
	}

	// Dynamic gallery endpoint
	if (pathname === "/api/gallery" && req.method === "GET") {
		try {
			const imgsDir = path.join(ROOT, "assets", "img");
			const files = fs.readdirSync(imgsDir, { withFileTypes: true });
			const allowed = new Set([".jpg", ".jpeg", ".png", ".webp"]);
			const images = files
				.filter(e => e.isFile())
				.map(e => e.name)
				.filter(name => allowed.has(path.extname(name).toLowerCase()))
				.filter(name => !name.startsWith(".")) // ignore dotfiles
				.map(name => "/assets/img/" + name);
			return send(res, 200, { ok: true, images }, { "Cache-Control": "no-store" });
		} catch (e) {
			return send(res, 500, { ok: false, error: "No se pudo leer la galería" });
		}
	}

	if (pathname.startsWith("/api/orders/") && (req.method === "PUT" || req.method === "DELETE")) {
		const id = parseInt(pathname.split("/").pop(), 10);
		let orders = readOrders();
		const idx = orders.findIndex(o => o.id === id);
		if (idx === -1) return send(res, 404, { ok: false, error: "No existe" });
		if (req.method === "PUT") {
			try {
				const body = await parseBody(req);
				// allow if admin or token matches
				const authed = isAuthorized(req) || (body.token && body.token === orders[idx].client_token) || (query.token && query.token === orders[idx].client_token);
				if (!authed) return send(res, 401, { ok: false, error: "Auth/token requerido" });
				// Client/admin editable fields
				const fields = ["nombre","apellidos","telefono","fecha_recogida","pedido","estado"];
				for (const f of fields) {
					if (body[f] !== undefined) {
						if (f === "fecha_recogida" && !isValidDateString(body[f])) continue;
						orders[idx][f] = String(body[f]);
					}
				}
			} catch {}
			writeOrders(orders);
			const { client_token: ___, ...safe } = orders[idx];
			return send(res, 200, { ok: true, order: safe });
		} else {
			// DELETE: allow if admin or token matches query
			const authed = isAuthorized(req) || (query.token && query.token === orders[idx].client_token);
			if (!authed) return send(res, 401, { ok: false, error: "Auth/token requerido" });
			orders.splice(idx, 1);
			writeOrders(orders);
			return send(res, 200, { ok: true });
		}
	}

	// Admin page guard + robots
	if (pathname === "/admin" || pathname === "/admin/") {
		if (!requireAuth(req, res)) return;
		sendStatic(req, res, "admin/index.html");
		return;
	}
	if (pathname.startsWith("/admin/")) {
		if (!requireAuth(req, res)) return;
		return sendStatic(req, res, pathname);
	}

	// Static files
	let file = pathname.replace(/^\/+/, "");
	if (file === "" || file === "/") file = "index.html";
	sendStatic(req, res, file);
});

server.listen(PORT, () => {
	console.log("Forn Can Tomeu server running on http://localhost:" + PORT);
});

