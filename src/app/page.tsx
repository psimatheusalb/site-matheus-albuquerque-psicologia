import Image from "next/image";
import { Container } from "@/components/Container";
import { MotionInView } from "@/components/MotionInView";
import { WhatsappCta } from "@/components/WhatsappCta";
import { FaqAccordion } from "@/components/FaqAccordion";
import { BrandLogo } from "@/components/BrandLogo";
import { SmartImage } from "@/components/SmartImage";
import { Ratings } from "@/components/Ratings";
import { AdminAccess } from "@/components/AdminAccess";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/lib/site";
import { getStoredPhotos } from "@/lib/photos";

export const dynamic = "force-dynamic";

function SectionTitle({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance font-semibold tracking-tight text-ink-900 [font-family:var(--font-display)] text-3xl sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-ink-700 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function Icon({
  path,
  className
}: {
  path: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}

const fallbackHeroImage =
  "https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20clinical%20psychologist%20portrait%2C%20warm%20minimal%20modern%20office%2C%20soft%20beige%20and%20sage%20tones%2C%20natural%20light%2C%20realistic%20photography%2C%20shallow%20depth%20of%20field%2C%20premium%20editorial%20style&image_size=portrait_4_3";

export default async function HomePage() {
  const storedPhotos = await getStoredPhotos();

  const heroSources = [
    storedPhotos.hero,
    storedPhotos.photo3,
    "/photos/photo-3.jpeg",
    "/photos/photo-3.jpg",
    "/photos/hero.jpeg",
    "/photos/hero.jpg",
    fallbackHeroImage
  ].filter(Boolean) as string[];

  const photo1Sources = [storedPhotos.photo1, "/photos/photo-1.jpeg", "/photos/photo-1.jpg"].filter(
    Boolean
  ) as string[];
  const photo2Sources = [storedPhotos.photo2, "/photos/photo-2.jpeg", "/photos/photo-2.jpg"].filter(
    Boolean
  ) as string[];
  const photo3Sources = [storedPhotos.photo3, "/photos/photo-3.jpeg", "/photos/photo-3.jpg"].filter(
    Boolean
  ) as string[];

  const pains = [
    {
      title: "Ansiedade",
      description:
        "Pensamentos acelerados, preocupação excessiva e sintomas físicos que parecem não ter explicação. A terapia ajuda a entender gatilhos e construir estratégias para se sentir mais seguro no presente."
    },
    {
      title: "Estresse",
      description:
        "Rotina sobrecarregada, cansaço acumulado e sensação de que não consegue dar conta de tudo. Trabalhamos em organização emocional, limites e autocuidado prático e sustentável."
    },
    {
      title: "Baixa autoestima",
      description:
        "Comparações excessivas, medo de julgamento e dificuldade de reconhecer suas próprias qualidades. Construímos gradualmente uma relação mais gentil, justa e realista consigo mesmo."
    },
    {
      title: "Relacionamentos difíceis",
      description:
        "Ciclos de conflito, dificuldade de se expressar ou de estabelecer limites. A terapia ajuda a desenvolver comunicação assertiva e vínculos mais seguros e respeitosos."
    },
    {
      title: "Sobrecarga emocional",
      description:
        "Sensação de carregar o mundo nas costas, com emoções intensas difíceis de nomear ou lidar. Criamos espaço para acolher, organizar e transformar esse peso com leveza."
    },
    {
      title: "Depressão",
      description:
        "Desânimo persistente, perda de interesse e sensação de vazio que não passa. Caminhamos juntos para resgatar prazeres, pequenos movimentos e mais sentido no dia a dia."
    }
  ];

  const benefits = [
    {
      title: "Autoconhecimento",
      description:
        "Entenda padrões, gatilhos e necessidades para tomar decisões com mais clareza.",
      icon: "M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8Zm0-11v6m0-9h.01"
    },
    {
      title: "Controle emocional",
      description:
        "Desenvolva estratégias práticas para lidar com pensamentos e emoções intensas.",
      icon: "M12 3v3m0 12v3m9-9h-3M6 12H3m15.36-6.36-2.12 2.12M8.76 15.24l-2.12 2.12m0-11.48 2.12 2.12m9.48 9.48 2.12 2.12"
    },
    {
      title: "Relacionamentos saudáveis",
      description:
        "Fortaleça limites, comunicação e autoestima para vínculos mais seguros.",
      icon: "M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3ZM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.67 0-8 1.34-8 4v2h10m6 0h8v-2c0-2.66-5.33-4-8-4-1.02 0-2.13.2-3.2.54"
    },
    {
      title: "Mais qualidade de vida",
      description:
        "Construa uma rotina emocionalmente sustentável com pequenas mudanças consistentes.",
      icon: "M4 12l3 3 4-7 4 7 3-3"
    },
    {
      title: "Desenvolvimento pessoal",
      description:
        "Alinhe seus objetivos a ações possíveis, com acompanhamento e responsabilidade.",
      icon: "M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7Z"
    }
  ];

  const steps = [
    {
      title: "Entre em contato",
      description:
        "Clique no WhatsApp, informe seu nome e o motivo da procura para eu entender como posso te ajudar."
    },
    {
      title: "Agende sua consulta",
      description: "Escolhemos o melhor horário e combinamos o formato (online ou presencial)."
    },
    {
      title: "Realize a sessão",
      description: "Um espaço seguro para acolhimento, escuta e direcionamento clínico."
    },
    {
      title: "Inicie seu processo",
      description: "Plano terapêutico com metas realistas e acompanhamento contínuo."
    }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-brand-gray/70 bg-white/80 backdrop-blur">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <ThemeToggle />
              <div>
                <a href="#inicio" className="inline-flex items-center gap-3">
                  <BrandLogo
                    className="hidden h-7 w-auto sm:block"
                    variant="horizontal"
                    alt={site.professionalName}
                  />
                  <span className="sr-only">{site.professionalName}</span>
                </a>
                <p className="mt-1 text-xs text-ink-600">{site.crp}</p>
              </div>
              <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-ink-600">
                <a href="#dores" className="transition hover:text-ink-900">
                  Dores
                </a>
                <a href="#beneficios" className="transition hover:text-ink-900">
                  Benefícios
                </a>
                <a href="#sobre" className="transition hover:text-ink-900">
                  Sobre
                </a>
                <a href="#faq" className="transition hover:text-ink-900">
                  FAQ
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <div className="sm:hidden">
                <WhatsappCta label="WhatsApp" />
              </div>
              <div className="hidden sm:block">
                <WhatsappCta />
              </div>
              <AdminAccess />
            </div>
          </div>
        </Container>
      </header>

      <main>
        <section id="inicio" className="relative overflow-hidden py-14 sm:py-20">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <MotionInView>
                  <p className="inline-flex items-center rounded-full bg-brand-beige px-4 py-2 text-xs font-semibold tracking-wide text-ink-700 ring-1 ring-brand-gray/60">
                    Psicoterapia acolhedora • {site.city}
                  </p>
                </MotionInView>

                <MotionInView delay={0.05}>
                  <h1 className="mt-5 text-balance font-semibold tracking-tight text-ink-900 [font-family:var(--font-display)] text-4xl sm:text-5xl">
                    {site.headline}
                  </h1>
                </MotionInView>

                <MotionInView delay={0.1}>
                  <p className="mt-5 text-pretty text-base leading-relaxed text-ink-700 sm:text-lg">
                    {site.approach}
                  </p>
                </MotionInView>

                <MotionInView delay={0.15}>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <WhatsappCta />
                    <p className="text-xs text-ink-600">
                      Resposta rápida para combinar horários e formato de atendimento.
                    </p>
                  </div>
                </MotionInView>

                <MotionInView delay={0.2}>
                  <ul className="mt-6 flex flex-wrap gap-2 text-xs text-ink-600">
                    <li className="rounded-full bg-white/70 px-3 py-2 ring-1 ring-ink-100">
                      Sigilo e acolhimento
                    </li>
                    <li className="rounded-full bg-white/70 px-3 py-2 ring-1 ring-ink-100">
                      Online ou presencial
                    </li>
                    <li className="rounded-full bg-white/70 px-3 py-2 ring-1 ring-ink-100">
                      Abordagem baseada em evidências
                    </li>
                  </ul>
                </MotionInView>
              </div>

              <MotionInView delay={0.1}>
                <div className="relative">
                  <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-beige via-white to-brand-blue blur-xl" />
                  <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-ink-100/70">
                    <SmartImage
                      sources={heroSources}
                      alt={`Foto profissional de ${site.professionalName}`}
                      className="h-[420px] w-full object-cover object-top sm:h-[520px]"
                      loading="eager"
                    />
                  </div>
                </div>
              </MotionInView>
            </div>
          </Container>
        </section>

        <section
          id="dores"
          className="border-y border-brand-gray/70 bg-brand-beige/45 py-14 sm:py-20"
        >
          <Container>
            <MotionInView>
              <SectionTitle
                eyebrow="O que pesa no dia a dia"
                title="Você pode estar carregando mais do que deveria"
                description="A terapia é um espaço para organizar pensamentos, reduzir sofrimento e construir recursos internos com consistência."
              />
            </MotionInView>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pains.map((pain, idx) => (
                <MotionInView key={pain.title} delay={0.05 * (idx % 3)}>
                  <div className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-soft transition duration-300 will-change-transform hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(31,41,55,0.12)]">
                    <p className="text-sm font-semibold text-ink-900">{pain.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-700">
                      {pain.description}
                    </p>
                  </div>
                </MotionInView>
              ))}
            </div>
          </Container>
        </section>

        <section id="beneficios" className="py-14 sm:py-20">
          <Container>
            <MotionInView>
              <SectionTitle
                eyebrow="Benefícios"
                title="Como a psicoterapia pode ajudar"
                description="Um processo estruturado, respeitando seu ritmo e seus objetivos, com foco em mudança real e sustentada."
              />
            </MotionInView>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b, idx) => (
                <MotionInView key={b.title} delay={0.05 * (idx % 3)}>
                  <div className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-soft transition duration-300 will-change-transform hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(31,41,55,0.12)]">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-beige/70 text-brand-green ring-1 ring-brand-gray/70">
                        <Icon path={b.icon} className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink-900">{b.title}</p>
                        <p className="mt-2 text-sm leading-relaxed text-ink-700">
                          {b.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </MotionInView>
              ))}
            </div>
          </Container>
        </section>

        <section
          id="sobre"
          className="border-y border-brand-gray/70 bg-brand-beige/30 py-14 sm:py-20"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <MotionInView>
                <SectionTitle
                  eyebrow="Sobre"
                  title="Atendimento clínico com acolhimento e direcionamento"
                  description="Um espaço seguro, com escuta qualificada e intervenções alinhadas a evidências, para que você avance com mais leveza."
                />

                <div className="mt-7 space-y-4 rounded-xl2 border border-ink-100 bg-white p-7 shadow-soft">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                        Formação
                      </p>
                      <p className="mt-2 text-sm text-ink-800">
                        Psicólogo clínico • experiência em escolas e no SUS
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                        Especializações
                      </p>
                      <p className="mt-2 text-sm text-ink-800">
                        Pós-graduação em TCC e Psicodiagnóstico • terceira onda
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                        CRP
                      </p>
                      <p className="mt-2 text-sm text-ink-800">{site.crp}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                        Experiência
                      </p>
                      <p className="mt-2 text-sm text-ink-800">
                        Atendimentos online há 1 ano e meio • adolescentes e jovens adultos
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <WhatsappCta label="Agendar pelo WhatsApp" />
                  </div>
                </div>
              </MotionInView>

              <MotionInView delay={0.05}>
                <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-ink-100">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/15 via-white to-brand-beige/55" />
                  <div className="relative p-8 sm:p-10">
                    <p className="text-sm font-semibold text-ink-900">
                      Mini biografia
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-700 sm:text-base">
                      Sou {site.professionalName}, psicólogo clínico. Entrei na Psicologia para
                      ajudar pessoas a transformar suas vidas, encontrar sentido e cultivar mais
                      consciência e tranquilidade — especialmente no mundo acelerado de hoje.
                      Minha escuta se construiu em estágios em escolas e no SUS, além de projetos
                      voluntários de escuta empática. Estudo Terapia Cognitivo-Comportamental,
                      abordagens de terceira onda e levo o existencialismo como filosofia de vida.
                    </p>
                    <div className="mt-7 grid gap-3">
                      <div className="rounded-xl bg-white/70 p-4 ring-1 ring-ink-100">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                          Atendimento
                        </p>
                        <p className="mt-2 text-sm text-ink-800">
                          Online • sessões de ~1h com intervalo generoso
                        </p>
                      </div>
                      <div className="rounded-xl bg-white/70 p-4 ring-1 ring-ink-100">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                          Abordagem
                        </p>
                        <p className="mt-2 text-sm text-ink-800">
                          TCC com intervenções ativas (escrita, desenho, música) e foco em autonomia.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionInView>
            </div>
          </Container>
        </section>

        <section id="fotos" className="py-14 sm:py-20">
          <Container>
            <MotionInView>
              <SectionTitle
                eyebrow="Fotos"
                title="Presença profissional e acolhedora"
                description="Imagens reais para transmitir confiança e proximidade desde o primeiro contato."
              />
            </MotionInView>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <MotionInView>
                <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-brand-gray/60">
                  <SmartImage
                    sources={photo1Sources}
                    alt={`Foto de ${site.professionalName} em contexto profissional`}
                    className="h-72 w-full object-cover object-top sm:h-80"
                  />
                </div>
              </MotionInView>
              <MotionInView delay={0.05}>
                <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-brand-gray/60">
                  <SmartImage
                    sources={photo2Sources}
                    alt={`Foto de ${site.professionalName} em ambiente de trabalho`}
                    className="h-72 w-full object-cover object-top sm:h-80"
                  />
                </div>
              </MotionInView>
              <MotionInView delay={0.1}>
                <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-soft ring-2 ring-brand-green/60">
                  <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-brand-green ring-1 ring-brand-gray/70">
                    Principal
                  </div>
                  <SmartImage
                    sources={photo3Sources}
                    alt={`Foto de ${site.professionalName}`}
                    className="h-72 w-full object-cover object-top sm:h-80"
                  />
                </div>
              </MotionInView>
            </div>
          </Container>
        </section>

        <section id="como-funciona" className="py-14 sm:py-20">
          <Container>
            <MotionInView>
              <SectionTitle
                eyebrow="Como funciona"
                title="Um passo a passo simples e transparente"
              />
            </MotionInView>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, idx) => (
                <MotionInView key={s.title} delay={0.05 * (idx % 4)}>
                  <div className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-soft transition duration-300 will-change-transform hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(31,41,55,0.12)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                      Passo {idx + 1}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-ink-900">{s.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-700">
                      {s.description}
                    </p>
                  </div>
                </MotionInView>
              ))}
            </div>
          </Container>
        </section>

        <section id="avaliacoes" className="py-14 sm:py-20">
          <Container>
            <MotionInView>
              <SectionTitle
                eyebrow="Avaliações"
                title="Como foi sua experiência?"
                description="Se você já fez atendimento, deixe uma avaliação por estrelas e um comentário."
              />
            </MotionInView>
            <MotionInView delay={0.05}>
              <div className="mt-10">
                <Ratings />
              </div>
            </MotionInView>
          </Container>
        </section>

        <section id="faq" className="py-14 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <MotionInView>
                <SectionTitle
                  eyebrow="FAQ"
                  title="Dúvidas frequentes"
                  description="Se a sua dúvida não estiver aqui, me chame no WhatsApp e eu respondo com clareza."
                />
                <div className="mt-7">
                  <WhatsappCta label="Tirar dúvidas no WhatsApp" />
                </div>
              </MotionInView>
              <MotionInView delay={0.05}>
                <FaqAccordion />
              </MotionInView>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <MotionInView>
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-tr from-brand-green via-brand-blue to-brand-brown px-7 py-12 shadow-soft sm:px-12 sm:py-14">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-blue blur-3xl" />
                  <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brand-brown blur-3xl" />
                </div>
                <div className="relative max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                    Comece hoje
                  </p>
                  <h2 className="mt-4 text-balance font-semibold tracking-tight text-white [font-family:var(--font-display)] text-3xl sm:text-4xl">
                    Comece hoje seu processo de transformação.
                  </h2>
                  <p className="mt-4 text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
                    Um primeiro passo pode fazer diferença. Vamos conversar e encontrar o melhor
                    caminho para você.
                  </p>
                  <div className="mt-8">
                    <WhatsappCta label="Falar no WhatsApp" size="lg" />
                  </div>
                </div>
              </div>
            </MotionInView>
          </Container>
        </section>
      </main>

      <footer className="border-t border-brand-gray/70 py-10">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <BrandLogo className="h-7 w-auto" variant="horizontal" alt={site.professionalName} />
                <p className="text-sm font-semibold text-ink-900">{site.professionalName}</p>
              </div>
              <p className="mt-1 text-xs text-ink-600">{site.crp} • {site.city}</p>
              <div className="mt-3">
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-ink-600 transition hover:text-ink-900"
                >
                  Instagram: @psi.matheusalb
                </a>
              </div>
            </div>
            <div className="text-xs text-ink-600">
              <p>Atendimento mediante agendamento.</p>
              <p className="mt-1">© {new Date().getFullYear()} {site.name}</p>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}
