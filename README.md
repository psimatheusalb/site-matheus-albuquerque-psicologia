# Site profissional (Psicólogo Clínico)

## Requisitos
- Windows 10/11
- Node.js LTS instalado (inclui npm)

## Rodar em modo desenvolvimento
1) Abra a pasta `Matheus projeto`
2) Dê duplo clique em `start-dev.cmd`
3) Abra `http://localhost:3000`

## Build de produção (opcional)
1) Dê duplo clique em `start-build.cmd`
2) Para subir localmente depois do build, execute `npm run start`

## Personalizar dados do psicólogo
Edite:
- `src/lib/site.ts` (nome, CRP, cidade, WhatsApp, textos)
- `src/app/page.tsx` (conteúdo das seções)

## Configurar URL do site (sitemap/SEO)
Defina a variável de ambiente:
- `NEXT_PUBLIC_SITE_URL=https://seudominio.com`
