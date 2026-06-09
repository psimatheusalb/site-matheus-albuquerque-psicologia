@echo off
setlocal

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nao encontrado.
  echo Instale o Node.js LTS e tente novamente.
  echo https://nodejs.org/
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm nao encontrado.
  echo Reinstale o Node.js LTS (o npm vem junto).
  echo https://nodejs.org/
  pause
  exit /b 1
)

echo Instalando dependencias...
call npm install
if errorlevel 1 (
  echo Falha ao instalar dependencias.
  pause
  exit /b 1
)

echo Gerando build...
call npm run build
if errorlevel 1 (
  echo Falha no build.
  pause
  exit /b 1
)

echo Build concluido.
pause
