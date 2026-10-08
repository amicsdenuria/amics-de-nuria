# Verificación: botón «Veure'n més»

Fecha: 2026-10-08. Ampliación de 2C aceptada por el usuario, con autorización
explícita para commitear, mergear a `preview` y pushear ambas ramas.
No se ha iniciado la fase 3.

## PASS / FAIL

**851 aserciones PASS, 0 FAIL** en esta ampliación: 588 del botón y filtros con
0/1/12/13/24/25/60 actividades, 79 de dominio, 161 de regresión de 2C/2D y 23 en
producción. Se cuenta una ejecución final de cada escenario. Las 480 del informe
anterior son la verificación histórica de 2C/2D y no se suman a este resultado.

Para cerrar, se repitieron lint/types/build/diff y 591 aserciones incluyendo
el cambio adicional del usuario en portada: 79 dominio, 473 carga/filtros,
23 producción y 16 portada → Agenda → listado a 360/768/1280 px. Todas PASS;
no hubo correcciones de implementación después de la aceptación.

| Comprobación | Resultado | Evidencia |
| --- | --- | --- |
| Lint, TypeScript, build de producción | PASS | Sin errores; `/agenda/activitats` incluido. |
| Dataset vacío | PASS, 7 | Estado vacío, contador 0, sin botón. |
| 1 actividad | PASS, 6 | Singular, tarjeta única, sin botón. |
| 12 actividades | PASS, 6 | Las 12 visibles, sin botón. |
| 13 actividades | PASS, 30 | 12 → 13; última pulsación añade 1 y retira el botón. |
| 24 actividades | PASS, 30 | 12 → 24; sin bloque adicional vacío. |
| 25 actividades | PASS, 36 | 12 → 24 → 25; orden, foco y fin de resultados correctos. |
| 60 actividades | PASS, 473 | 12 → 24 → 36 → 48 → 60; filtros, resets, presets, teclado y responsive. |
| Búsqueda sobre tarjetas ocultas | PASS | Encuentra `Activitat de prova 60` sin expandir antes. |
| Cambiar texto, tipo, estado o periodo; limpiar | PASS | Cada cambio vuelve al primer bloque de hasta 12 coincidencias. |
| Combinación de filtros | PASS | Archivo + Finalitzada + Música + texto; 1/0 resultados correctos. |
| Desplazamiento sin pulsar | PASS | Hacer scroll al final conserva solo 12 tarjetas. |
| Orden, identidad y duplicados | PASS | Se conservan tarjetas existentes y orden; sin duplicados ni omisiones. |
| Peticiones y URL | PASS | Mostrar más y filtrar no piden datos ni navegan. |
| Accesibilidad | PASS | Enter/Espacio/clic; foco visible en primera tarjeta añadida; contador `aria-live`. |
| 360/768/1280 px | PASS | 1/2/3 columnas; botón dentro del viewport; sin desbordamiento. Capturas revisadas. |
| Dominio y render SSR | PASS, 79 | Búsqueda, serialización, fechas, DST, orden, previews y edición. |
| Regresión `browser --rollout` | PASS, 161 | Buscador, filtros, CTA, navegación, menú, pie y Rutas. |
| Build servido en producción | PASS, 23 | Seis datos habituales; fixtures ignoradas, filtros, imágenes locales y 404. |
| `git diff --check` | PASS | Sin errores de whitespace. |
| Aceptación manual | PASS | Cierre, commits, merge y pushes autorizados el 2026-10-08. |

Chrome real con Playwright, sin dependencias ni framework añadidos al proyecto.
Durante QA se usó una instancia de desarrollo con salida de compilación aislada
para conservar el servidor abierto en 3000; se cerraron solo los servidores de
prueba en 3100/3101. Se retiró el helper temporal y se revirtieron los cambios de
TypeScript generados por Next. No hay cambios permanentes de configuración.

Las comprobaciones antiguas de detalles/calendario siguen documentadas en
`verification-report-2c-2d.md`; las pruebas de esta ampliación no vuelven a ejecutar
toda aquella matriz. Agenda sigue con datos locales. Sanity Live/editorial real
pertenece a 3/4, y no se hicieron escrituras remotas.

## Checklist manual de la ampliación

Los datos habituales son solo seis y no activan el botón. Para verificarlo,
definir estas variables **en el proceso que arranca el servidor de desarrollo**;
reiniciar al cambiar de escenario. Producción ignora las fixtures.

```powershell
$env:AGENDA_VERIFY = 'load-more-25'
$env:AGENDA_VERIFY_NOW = '2026-10-08T12:00:00+02:00'
```

- [ ] Abrir `/agenda/activitats`: hay 12 tarjetas, contador total 25 y
  `Mostrant 12 de 25 activitats`; aparece `Veure'n més` debajo.
- [ ] Desplazarse al final sin pulsar: siguen siendo 12.
- [ ] Pulsar: quedan 24 en el mismo orden. Pulsar de nuevo: quedan 25 y el botón
  desaparece. El foco llega a la primera tarjeta añadida en ambas pulsaciones.
- [ ] Con `load-more-12`, ver 12 y ningún botón. Con `load-more-13`, ver 12 y
  una pulsación añade solo 1. Con `load-more-24`, una pulsación añade 12 y termina.
- [ ] Con `load-more-60`, ver 12 → 24 → 36 → 48 → 60. Orden: `verify-1` a
  `verify-37` (próximas) y después `verify-60` a `verify-38` (archivo).
- [ ] Expandir y cambiar cada control: texto `prova` (60), Música (30), Agendada
  (24), Completa (13), Properes i d’avui (37), Arxivades (23). Limpiar entre casos.
  Cada cambio vuelve a un máximo de 12; cargar más actúa solo sobre coincidencias.
- [ ] Sin expandir, buscar `Activitat de prova 60`: aparece la tarjeta oculta.
  Buscar `NO-EXISTEIX`: contador 0, estado sin coincidencias y ningún botón.
- [ ] Limpiar después de expandir: controles vacíos/todos, primeras 12 y foco
  en la búsqueda. El contador superior siempre indica el total de coincidencias.
- [ ] Abrir `?period=upcoming` y `?period=archived`: primeros 12 del periodo,
  carga correcta y limpiar vuelve a los primeros 12 de las 60.
- [ ] Activar el botón con Enter y Espacio; comprobar foco visible y enlaces
  de las tarjetas añadidas. El contador inferior anuncia visibles/total.
- [ ] Comprobar 360/768/1280 px: botón legible, sin desbordamiento y 1/2/3 columnas.
- [ ] En Network, mostrar más y filtrar no cambian URL ni solicitan datos de Agenda.
- [ ] Restaurar las variables tras verificar y conservar el checklist completo
  de 2C/2D del informe anterior para la aceptación conjunta.

```powershell
Remove-Item Env:AGENDA_VERIFY, Env:AGENDA_VERIFY_NOW -ErrorAction SilentlyContinue
```

## Reproducción automática

Con el servidor ya iniciado con la fixture correspondiente y puerto libre:

```powershell
$env:AGENDA_PLAYWRIGHT_DIR = 'C:/Users/muner/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'
$env:AGENDA_VERIFY_URL = 'http://localhost:3100'
node openspec/changes/agenda-activities/verification/load-more-checks.mjs 25
```

El argumento admite 0/1/12/13/24/25/60 y debe coincidir con `load-more-<n>` en el
servidor. En este entorno funciona `pnpm dev --webpack --hostname localhost --port 3100`;
no iniciar dos instancias que compartan el mismo directorio de compilación.
Para dominio, regresión y producción, usar los comandos del informe de 2C/2D.
Las capturas temporales están en `.next/agenda-verification/load-more-*.png`.

## Fase posterior documentada

La fase 5 en `tasks.md`, `proposal.md` y `design.md` es opcional y muy recomendada:
medir alrededor de 200 actividades y valorar consultas filtradas y bloques con
cursor en Sanity hacia 300–500, incluyendo archivo. Es una estimación para este
proyecto; el peso de los datos y el rendimiento móvil pueden adelantarla.
No bloquea las fases 2–4 ni sus gates. El botón actual reduce el render inicial,
pero recibe todos los datos. No se ha implementado todavía la migración.
