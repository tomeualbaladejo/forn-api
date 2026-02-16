(function() {
	const translations = {
		es: {
			claim: "Forners desde 1930",
			nav: { inici: "Inicio", historia: "Historia", carta: "Carta", galeria: "Galería", contacte: "Contacto" },
			hero: {
				title: "Un horno de leña de toda la vida, en Inca",
				subtitle: "Más de noventa años elaborando pan artesanal con horno de leña tradicional. Tres generaciones de tradición."
			},
			order: {
				open: "Reservar / Hacer encargo",
				title: "Reservar / Hacer encargo",
				fields: { nombre: "Nombre", apellidos: "Apellidos", telefono: "Teléfono", fecha: "Fecha de recogida", pedido: "Comentarios / Pedido" },
				help: { fecha: "Selecciona el día en el que recogerás el encargo." },
				submit: "Enviar encargo",
				cancel: "Cancelar",
				success: "Gracias, hemos recibido tu encargo. Te esperamos.",
				success_prefix: "Gracias, hemos recibido tu encargo correctamente. Te esperamos el "
			},
			values: {
				bread: { title: "Pan artesanal", text: "Fermentado con masa madre y trabajado a mano a diario." },
				wood: { title: "Horno de leña", text: "El corazón del horno desde 1930: sabor y corteza inconfundibles." },
				pastry: { title: "Repostería", text: "Ensaimadas, empanadas, cocas… recetas de casa." },
				cafe: { title: "Cafetería", text: "Un espacio tranquilo para desayunar y merendar en Inca." }
			},
			reviews: {
				title: "Qué dice la gente",
				subtitle: "Clientes que nos visitan cada día",
				q1: "“Pan de horno de leña todo buenísimo.”",
				q2: "“Uno de los mejores panes de Inca.””",
				q3: "“Todo buenísimo y a buen precio. Servicio de 10.”",
				q4: "“Panadería tradicional de toda la vida.”",
				q5: "“Las ensaimadas están increíbles, como las de antes.”",
				q6: "“Calidad y tradición en cada bocado. Muy recomendable.”"
			},
			contact: {
				title: "Dónde estamos",
				addressLabel: "Dirección:",
				phoneLabel: "Teléfono:",
				hoursTitle: "Horario",
				days: { weekdays: "Lunes–Viernes", saturday: "Sábado", sunday: "Domingo" },
				closed: "Cerrado"
			},
			history: {
				title: "Familia de panaderos",
				subtitle: "Tres generaciones dedicadas al oficio de panadero",
				p1: "El Forn Can Tomeu, con más de noventa años de historia y tres generaciones detrás, es una de las pocas panaderías que actualmente trabaja con un horno de leña tradicional en la isla.",
				p2: "La historia comienza en 1930, cuando el abuelo del actual propietario, que trabajaba en Can Guixe, decide abrir su propio horno. Su hijo, Tomeu, le ayudaba repartiendo el pan por el pueblo en bicicleta.",
				p3: "Años más tarde, Toni tomó el relevo del negocio familiar, amplió el local y creó el espacio de cafetería, conservando el mismo horno de leña original que sigue utilizándose hoy en día.",
				g1: "1ª Generación – Toni Cifre Llompart (1930)",
				g2: "2ª Generación – Tomeu Cifre Niell",
				g3: "3ª Generación – Toni Cifre Bennasar"
			},
			menu: {
				eyebrow: "Para comer aquí o llevar",
				title: "Nuestra Carta",
				subtitle: "Tostadas, bocatas y variado del día.",
				sections: { tostadas: "Tostadas", bocatas: "Bocatas", variados: "Variados" },
				tostadas: {
					note: "Los precios indicados corresponden a media ración y ración entera.",
					jamonYork: "Jamón York",
					jamonSerrano: "Jamón Serrano",
					queso: "Queso",
					quesoMahones: "Queso Mahonés",
					atun: "Atún",
					camaiot: "Camaiot",
					sobrasada: "Sobrasada",
					aguacateTomate: "Aguacate y tomate",
					aguacateSalmon: "Aguacate y salmón",
					aguacateEmbutido: "Aguacate y embutido",
					tortillaPatatas: "Tortilla de patatas",
					tortillaFrancesa: "Tortilla francesa",
					tortillaEmbutido: "Tortilla francesa con embutido"
				},
				bocatas: {
					pepitoLomoPollo: "Pepito de lomo / pollo",
					pepitoCompleto: "Pepito completo",
					serranito: "Serranito",
					calamares: "Calamares romana",
					llonguetVariado: "Llonguet de variado"
				},
				variados: {
					note: "Los precios indicados corresponden a media ración y ración entera.",
					lomoSetas: "Lomo con setas",
					lengua: "Lengua",
					albondigas: "Albóndigas",
					callos: "Callos",
					caminites: "Caminites",
					sepiaCebolla: "Sepia con cebolla",
					ensaladilla: "Ensaladilla",
					croquetas: "Croquetas de pollo",
					calamares: "Calamares romana"
				},
				note: "Nota: Los precios pueden variar. IVA incluido."
			},
			gallery: {
				eyebrow: "Horno de leña tradicional",
				title: "Galería de fotos",
				subtitle: "Un recorrido visual por el horno, el obrador y la familia.",
				cap1: "Horno de leña en funcionamiento",
				cap2: "Pan artesano recién hecho",
				cap3: "Galletas de aceite, pipas y sésamo",
				cap4: "El oficio en el día a día",
				cap5: "Cafetería y espacio de desayunos",
				cap6: "Panecillos del día",
				cap7: "Masa y tradición",
				cap8: "Mostrador del horno",
				cap9: "Horno histórico",
				cap10: "Recuerdos de 2ª generación",
				cap11: "Los inicios del horno",
				cap12: "La familia en el horno",
				cap13: "La tercera generación"
			},
			cta: { call: "Llamar ahora", directions: "Cómo llegar" },
			cta: { call: "Llamar ahora", directions: "Cómo llegar", review: "Añadir reseña" },
			social: { instagram: "Instagram", facebook: "Facebook" },
			footer: { emblematic: "Negocio emblemático en Mallorca" }
		},
		ca: {
			claim: "Forners des de 1930",
			nav: { inici: "Inici", historia: "Història", carta: "Carta", galeria: "Galeria", contacte: "Contacte" },
			hero: {
				title: "Un forn de llenya de tota la vida, a Inca",
				subtitle: "Més de noranta anys fent pa artesanal amb forn de llenya tradicional. Tres generacions de tradició."
			},
			order: {
				open: "Reservar / Fer encàrrec",
				title: "Reservar / Fer encàrrec",
				fields: { nombre: "Nom", apellidos: "Llinatges", telefono: "Telèfon", fecha: "Dia de recollida", pedido: "Comentaris / Encàrrec" },
				help: { fecha: "Selecciona el dia en què recolliràs s'encàrrec." },
				submit: "Enviar encàrrec",
				cancel: "Cancel·lar",
				success: "Gràcies, hem rebut el teu encàrrec. T’esperam.",
				success_prefix: "Gràcies, hem rebut el teu encàrrec correctament. T’esperam es "
			},
			values: {
				bread: { title: "Pa artesanal", text: "Fermentat amb massa mare i treballat a mà a diari." },
				wood: { title: "Forn de llenya", text: "El cor del forn des del 1930: sabor i crosta inconfusibles." },
				pastry: { title: "Rebosteria", text: "Ensaimades, panades, coques… receptes de casa." },
				cafe: { title: "Cafeteria", text: "Un espai tranquil per esmorzar i berenar a Inca." }
			},
			reviews: {
				title: "Què diu la gent",
				subtitle: "Clients que ens visiten cada dia",
				q1: "“Pa de forn de llenya, tot boníssim.”",
				q2: "“Un dels millors pans d’Inca.”",
				q3: "“Tot boníssim i a bon preu. Servei de 10.”",
				q4: "“Forn tradicional de tota la vida.”",
				q5: "“Les ensaïmades són increïbles, com les d’abans.”",
				q6: "“Qualitat i tradició a cada mos. Molt recomanable.”"
			},
			contact: {
				title: "On som",
				addressLabel: "Adreça:",
				phoneLabel: "Telèfon:",
				hoursTitle: "Horari",
				days: { weekdays: "Dilluns–Divendres", saturday: "Dissabte", sunday: "Diumenge" },
				closed: "Tancat"
			},
			history: {
				title: "Família de forners",
				subtitle: "Tres generacions dedicades a l’ofici de forner",
				p1: "El Forn Can Tomeu, amb més de noranta anys d’història i tres generacions al darrere, és un dels pocs forns que actualment treballen amb un forn de llenya tradicional a l’illa.",
				p2: "La història comença el 1930, quan el padrí de l’actual propietari, que feia feina a Can Guixe, decideix obrir el seu propi forn. El seu fill, en Tomeu, l’ajudava repartint el pa pel poble amb bicicleta.",
				p3: "Anys més tard, en Toni va agafar el relleu del negoci familiar, va ampliar el local i va crear s’espai de cafeteria, conservant el mateix forn de llenya original que se segueix utilitzant avui en dia.",
				g1: "1ª Generació – Toni Cifre Llompart (1930)",
				g2: "2ª Generació – Tomeu Cifre Niell",
				g3: "3ª Generació – Toni Cifre Bennasar"
			},
			menu: {
				eyebrow: "Per menjar aquí o per emportar",
				title: "La nostra carta",
				subtitle: "Torrades, entrepans i variats del dia.",
				sections: { tostadas: "Torrades", bocatas: "Entrepans", variados: "Variats" },
				tostadas: {
					note: "Els preus indicats corresponen a mitja ració i ració sencera.",
					jamonYork: "Pernil dolç",
					jamonSerrano: "Pernil serrà",
					queso: "Formatge",
					quesoMahones: "Formatge maonès",
					atun: "Tonyina",
					camaiot: "Camaiot",
					sobrasada: "Sobrassada",
					aguacateTomate: "Alvocat i tomàtiga",
					aguacateSalmon: "Alvocat i salmó",
					aguacateEmbutido: "Alvocat i embotit",
					tortillaPatatas: "Truita de patata",
					tortillaFrancesa: "Truita francesa",
					tortillaEmbutido: "Truita francesa amb embotit"
				},
				bocatas: {
					pepitoLomoPollo: "Pepito de llom / pollastre",
					pepitoCompleto: "Pepito complet",
					serranito: "Serranito",
					calamares: "Calamars a la romana",
					llonguetVariado: "Llonguet de variat"
				},
				variados: {
					note: "Els preus indicats corresponen a mitja ració i ració sencera.",
					lomoSetas: "Llom amb esclata-sangs",
					lengua: "Llengua",
					albondigas: "Mandonguilles",
					callos: "Callos",
					caminites: "Caminites",
					sepiaCebolla: "Sípia amb ceba",
					ensaladilla: "Ensaladilla",
					croquetas: "Croquetes de pollastre",
					calamares: "Calamars a la romana"
				},
				note: "Nota: Els preus poden variar. IVA inclòs."
			},
			gallery: {
				eyebrow: "Forn de llenya tradicional",
				title: "Galeria de fotos",
				subtitle: "Un recorregut visual pel forn, l’obrador i la família.",
				cap1: "Forn de llenya en funcionament",
				cap2: "Pa artesà acabat de fer",
				cap3: "Galletes d’oli, pipes i sèsam",
				cap4: "L’ofici al dia a dia",
				cap5: "Cafeteria i espai d’esmorzars",
				cap6: "Panets del dia",
				cap7: "Massa i tradició",
				cap8: "Mostrador del forn",
				cap9: "Forn històric",
				cap10: "Records de 2ª generació",
				cap11: "Els inicis del forn",
				cap12: "La família al forn",
				cap13: "La tercera generació"
			},
			cta: { call: "Trucar ara", directions: "Com arribar", review: "Afegeix ressenya" },
			social: { instagram: "Instagram", facebook: "Facebook" },
			footer: { emblematic: "Comerç emblemàtic a Mallorca" }
		},
		en: {
			claim: "Bakers since 1930",
			nav: { inici: "Home", historia: "Our Story", carta: "Menu", galeria: "Gallery", contacte: "Contact" },
			hero: {
				title: "A lifelong wood‑fired bakery in Inca",
				subtitle: "Over ninety years baking artisan bread in a traditional wood‑fired oven. Three generations of craft."
			},
			order: {
				open: "Reserve / Place order",
				title: "Reserve / Place order",
				fields: { nombre: "First name", apellidos: "Last name", telefono: "Phone", fecha: "Pickup date", pedido: "Comments / Order" },
				help: { fecha: "Select the day you will pick up your order." },
				submit: "Send order",
				cancel: "Cancel",
				success: "Thanks, we’ve received your order. See you!",
				success_prefix: "Thanks, your order is confirmed. See you on "
			},
			values: {
				bread: { title: "Artisan bread", text: "Naturally fermented with sourdough and handcrafted daily." },
				wood: { title: "Wood‑fired oven", text: "The heart of our bakery since 1930: unmistakable flavour and crust." },
				pastry: { title: "Pastry", text: "Ensaimadas, empanadas and Majorcan bakes – our family recipes." },
				cafe: { title: "Café", text: "A quiet spot for breakfast or a snack in Inca." }
			},
			reviews: {
				title: "What people say",
				subtitle: "Regulars who visit us every day",
				q1: "“Wood‑fired bread – everything is delicious.”",
				q2: "“One of the best breads in Inca.”",
				q3: "“Great value and everything tasty. Service 10/10.”",
				q4: "“Traditional bakery like the old days.”",
				q5: "“Ensaimadas are amazing – just like before.”",
				q6: "“Quality and tradition in every bite. Highly recommended.”"
			},
			contact: {
				title: "Where to find us",
				addressLabel: "Address:",
				phoneLabel: "Phone:",
				hoursTitle: "Hours",
				days: { weekdays: "Monday–Friday", saturday: "Saturday", sunday: "Sunday" },
				closed: "Closed"
			},
			history: {
				title: "Family of bakers",
				subtitle: "Three generations devoted to the craft",
				p1: "With over ninety years of history and three generations behind it, Forn Can Tomeu is one of the few bakeries on the island that still bakes with a traditional wood‑fired oven.",
				p2: "It all began in 1930, when the current owner’s grandfather, who worked at Can Guixe, decided to open his own bakery. His son Tomeu helped by delivering bread around town on his bicycle.",
				p3: "Years later, Toni took over the family business, expanded the shop and created the café area, keeping the original wood‑fired oven that is still in use today.",
				g1: "1st Generation – Toni Cifre Llompart (1930)",
				g2: "2nd Generation – Tomeu Cifre Niell",
				g3: "3rd Generation – Toni Cifre Bennasar"
			},
			menu: {
				eyebrow: "Eat in or take away",
				title: "Our Menu",
				subtitle: "Toasts, sandwiches and daily tapas.",
				sections: { tostadas: "Toasts", bocatas: "Sandwiches", variados: "Tapas" },
				tostadas: {
					note: "Prices shown are for half portion and full portion.",
					jamonYork: "York ham",
					jamonSerrano: "Serrano ham",
					queso: "Cheese",
					quesoMahones: "Mahon cheese",
					atun: "Tuna",
					camaiot: "Camaiot (pork sausage)",
					sobrasada: "Sobrasada",
					aguacateTomate: "Avocado & tomato",
					aguacateSalmon: "Avocado & salmon",
					aguacateEmbutido: "Avocado & cold cuts",
					tortillaPatatas: "Spanish omelette",
					tortillaFrancesa: "Plain omelette",
					tortillaEmbutido: "Omelette with cold cuts"
				},
				bocatas: {
					pepitoLomoPollo: "Pepito – pork loin / chicken",
					pepitoCompleto: "Pepito especial",
					serranito: "Serranito",
					calamares: "Calamari sandwich",
					llonguetVariado: "Llonguet (mixed tapas)"
				},
				variados: {
					note: "Prices shown are for half portion and full portion.",
					lomoSetas: "Pork with mushrooms",
					lengua: "Ox tongue",
					albondigas: "Meatballs",
					callos: "Tripe stew",
					caminites: "Caminites",
					sepiaCebolla: "Cuttlefish with onion",
					ensaladilla: "Russian salad",
					croquetas: "Chicken croquettes",
					calamares: "Calamari (romana)"
				},
				note: "Note: Prices may vary. VAT included."
			},
			gallery: {
				eyebrow: "Traditional wood‑fired oven",
				title: "Photo gallery",
				subtitle: "A visual tour of the bakery, workshop and family.",
				cap1: "Wood‑fired oven at work",
				cap2: "Freshly baked artisan bread",
				cap3: "Oil biscuits with seeds",
				cap4: "Craft, day by day",
				cap5: "Café and breakfast area",
				cap6: "Daily rolls",
				cap7: "Dough and tradition",
				cap8: "Bakery counter",
				cap9: "Historic oven",
				cap10: "Second generation memories",
				cap11: "The early days",
				cap12: "The family at the bakery",
				cap13: "The third generation"
			},
			cta: { call: "Call now", directions: "Get directions", review: "Add review" },
			social: { instagram: "Instagram", facebook: "Facebook" },
			footer: { emblematic: "Emblematic business in Mallorca" }
		}
	};

	const els = {
		texts: document.querySelectorAll("[data-i18n]"),
		langButtons: document.querySelectorAll(".lang-btn")
	};

	function setLang(lang) {
		const dict = translations[lang] || translations.ca;
		els.texts.forEach(el => {
			const key = el.getAttribute("data-i18n");
			const parts = key.split(".");
			let value = dict;
			for (const p of parts) value = value?.[p];
			if (typeof value === "string") el.textContent = value;
		});
		els.langButtons.forEach(btn => btn.classList.toggle("is-active", btn.dataset.lang === lang));
		document.documentElement.lang = lang;
		localStorage.setItem("fct_lang", lang);
	}

	els.langButtons.forEach(btn => {
		btn.addEventListener("click", () => setLang(btn.dataset.lang));
	});

	// Init language from saved preference or browser
	const saved = localStorage.getItem("fct_lang");
	const initial = saved || (navigator.language?.startsWith("es") ? "es" : navigator.language?.startsWith("en") ? "en" : "ca");
	setLang(initial);
})();

