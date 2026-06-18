// ---- Estados e municípios (amostra representativa) ----
const UF = {
  AC: { nome: "Acre", cidades: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira"] },
  AL: { nome: "Alagoas", cidades: ["Maceió", "Arapiraca", "Palmeira dos Índios"] },
  AM: { nome: "Amazonas", cidades: ["Manaus", "Parintins", "Itacoatiara"] },
  AP: { nome: "Amapá", cidades: ["Macapá", "Santana", "Laranjal do Jari"] },
  BA: { nome: "Bahia", cidades: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari"] },
  CE: { nome: "Ceará", cidades: ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Sobral"] },
  DF: { nome: "Distrito Federal", cidades: ["Brasília"] },
  ES: { nome: "Espírito Santo", cidades: ["Vitória", "Vila Velha", "Serra", "Cariacica"] },
  GO: { nome: "Goiás", cidades: ["Goiânia", "Aparecida de Goiânia", "Anápolis"] },
  MA: { nome: "Maranhão", cidades: ["São Luís", "Imperatriz", "Caxias"] },
  MG: { nome: "Minas Gerais", cidades: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora"] },
  MS: { nome: "Mato Grosso do Sul", cidades: ["Campo Grande", "Dourados", "Três Lagoas"] },
  MT: { nome: "Mato Grosso", cidades: ["Cuiabá", "Várzea Grande", "Rondonópolis"] },
  PA: { nome: "Pará", cidades: ["Belém", "Ananindeua", "Santarém", "Marabá"] },
  PB: { nome: "Paraíba", cidades: ["João Pessoa", "Campina Grande", "Patos"] },
  PE: { nome: "Pernambuco", cidades: ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru"] },
  PI: { nome: "Piauí", cidades: ["Teresina", "Parnaíba", "Picos"] },
  PR: { nome: "Paraná", cidades: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa"] },
  RJ: { nome: "Rio de Janeiro", cidades: ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Niterói"] },
  RN: { nome: "Rio Grande do Norte", cidades: ["Natal", "Mossoró", "Parnamirim"] },
  RO: { nome: "Rondônia", cidades: ["Porto Velho", "Ji-Paraná", "Ariquemes"] },
  RR: { nome: "Roraima", cidades: ["Boa Vista", "Rorainópolis"] },
  RS: { nome: "Rio Grande do Sul", cidades: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas"] },
  SC: { nome: "Santa Catarina", cidades: ["Florianópolis", "Joinville", "Blumenau", "Chapecó"] },
  SE: { nome: "Sergipe", cidades: ["Aracaju", "Nossa Senhora do Socorro", "Lagarto"] },
  SP: { nome: "São Paulo", cidades: ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santos"] },
  TO: { nome: "Tocantins", cidades: ["Palmas", "Araguaína", "Gurupi"] },
};

const $ = (id) => document.getElementById(id);
const stripAccents = (s) =>
  s.normalize("NFD").split("").filter((c) => {
    const code = c.charCodeAt(0);
    return code < 0x0300 || code > 0x036f; // remove marcas de combinação (acentos)
  }).join("");
const slug = (s) => stripAccents(s.toLowerCase()).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ---- Popular estados ----
const estadoSel = $("estado");
Object.keys(UF).sort().forEach((sigla) => {
  const opt = document.createElement("option");
  opt.value = sigla;
  opt.textContent = `${sigla} — ${UF[sigla].nome}`;
  estadoSel.appendChild(opt);
});

// ---- Estado -> município ----
const municipioSel = $("municipio");
estadoSel.addEventListener("change", () => {
  municipioSel.innerHTML = '<option value="">Selecione o município</option>';
  const uf = estadoSel.value;
  if (!uf) { municipioSel.disabled = true; return; }
  UF[uf].cidades.forEach((cidade) => {
    const opt = document.createElement("option");
    opt.value = cidade;
    opt.textContent = cidade;
    municipioSel.appendChild(opt);
  });
  municipioSel.disabled = false;
});

// ---- Submit busca por município ----
$("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const uf = estadoSel.value;
  const cidade = municipioSel.value;
  if (!uf || !cidade) {
    showHint("Selecione o estado e o município para continuar.");
    return;
  }
  // Em produção, redirecionaria para: /leis/{uf}/{cidade-slug}
  showHint(`Abrindo a legislação de ${cidade} (${uf})… → /leis/${uf.toLowerCase()}/${slug(cidade)}`);
});

// ---- Busca por palavra-chave ----
$("keywordBtn").addEventListener("click", () => {
  const termo = $("keyword").value.trim();
  if (!termo) { showHint("Digite uma palavra-chave para buscar."); return; }
  showHint(`Buscando por “${termo}” na base legislativa… → /busca?q=${encodeURIComponent(termo)}`);
});

function showHint(msg) {
  const hint = $("searchHint");
  hint.textContent = msg;
  hint.style.opacity = 0;
  requestAnimationFrame(() => { hint.style.transition = "opacity .3s"; hint.style.opacity = 1; });
}

// ---- Municípios em destaque ----
const destaques = [
  ["São Paulo", "SP"], ["Rio de Janeiro", "RJ"], ["Belo Horizonte", "MG"], ["Curitiba", "PR"],
  ["Porto Alegre", "RS"], ["Salvador", "BA"], ["Fortaleza", "CE"], ["Recife", "PE"],
];
const grid = $("citiesGrid");
destaques.forEach(([nome, uf]) => {
  const el = document.createElement("div");
  el.className = "city-card";
  el.innerHTML = `
    <span class="city-card__flag">${uf}</span>
    <span>
      <span class="city-card__name">${nome}</span><br/>
      <span class="city-card__uf">${UF[uf].nome}</span>
    </span>`;
  el.addEventListener("click", () => {
    showHint(`Abrindo a legislação de ${nome} (${uf})… → /leis/${uf.toLowerCase()}/${slug(nome)}`);
    document.getElementById("inicio").scrollIntoView({ behavior: "smooth" });
  });
  grid.appendChild(el);
});

// ---- Formulário de contato ----
$("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  $("contactFeedback").textContent = "✓ Recebemos seu contato! Retornaremos em breve.";
  e.target.reset();
});

// ---- Menu mobile ----
$("navToggle").addEventListener("click", () => $("nav").classList.toggle("open"));
document.querySelectorAll(".nav__link").forEach((l) =>
  l.addEventListener("click", () => $("nav").classList.remove("open"))
);
