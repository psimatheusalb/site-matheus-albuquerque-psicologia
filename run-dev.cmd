@echo off
setlocal

rem Abre uma janela que NAO fecha automaticamente
start "Servidor do site" cmd /k "\"%~dp0start-dev.cmd\""
