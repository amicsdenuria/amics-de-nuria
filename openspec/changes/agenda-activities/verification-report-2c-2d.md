# Verificación de Agenda: 2C y 2D

Fecha: 2026-10-08. Rama: `codex/agenda-activities`.

Implementación terminada y validada. El usuario aceptó la entrega y autorizó
commits, merge a `preview` y pushes de ambas ramas el 2026-10-08.
El usuario pidió implementar 2C y después 2D en una entrega;
2C pasó su gate antes de comenzar 2D. No se ha iniciado la fase 3.

Ampliación posterior: consultar también `verification-report-load-more.md` para
el botón de bloques de 12 y su checklist. Sus 851 aserciones corresponden a una
validación nueva de la ampliación y regresiones; las 480 siguientes son el resultado
histórico de la entrega inicial, sin sumar ambos informes.

En el cierre se incluyó su cambio adicional que activa la tarjeta Agenda en
la portada. Se repitieron lint, TypeScript, build y diff check, además de 591
aserciones: 79 de dominio, 473 de carga/filtros, 23 de producción y 16 del recorrido
portada → Agenda → listado, con la tarjeta a 360/768/1280 px. Todas PASS; ninguna
corrección de implementación fue necesaria después de la aceptación.

## Resultado automático: PASS / FAIL

**480 aserciones PASS, 0 FAIL**: 79 de dominio/render y 401 de navegador.
Los números corresponden a una ejecución final de cada escenario, sin sumar
las repeticiones usadas para corregir o depurar las comprobaciones.

| Gate o escenario | Resultado | Evidencia |
| --- | --- | --- |
| `pnpm lint` | PASS | Sin errores ni warnings de código. |
| `pnpm exec tsc --noEmit --incremental false` | PASS | Contratos y nueva página válidos. |
| `pnpm build` | PASS | Build de producción con `/agenda/activitats`. |
| `git diff --check` | PASS | Sin errores de whitespace. |
| Dominio y render SSR | PASS, 79 | Orden, serialización, búsqueda, fechas, DST, previews y selección de edición. |
| `browser --rollout` | PASS, 161 | Búsqueda, filtros, URLs, cero resultados, teclado, enlaces, menú, pie y responsive. |
| `spirit --rollout` | PASS, 24 | Edición futura cancelada, empate por ID, candidato inválido y título sin marca. |
| `empty --rollout` | PASS, 28 | Estados vacíos, presentación, navegación y fallback de contacto. |
| `local --rollout` | PASS, 35 | Seis actividades habituales, imágenes locales, 404 y edición de 2027. |
| `detail` | PASS, 86 | Siete detalles, opcionales, galerías, metadatos, estados e inscripción. |
| `calendar` | PASS, 22 | Archivo e inscripción a las 12:00 del 8 de octubre. |
| `calendar-next` | PASS, 22 | Archivo e inscripción a la 01:00 del 9 de octubre. |
| `production` | PASS, 23 | Fixtures ignoradas, filtros sin navegación/peticiones, imágenes y 404. |
| Capturas a 360/768/1280 px | PASS | Revisión visual del listado; controles y tarjetas sin desbordamiento. |
| Imágenes reales de Sanity | N/A | No se renderizó ninguna en `/rutes-itineraris`; Agenda sigue usando datos locales. |
| Aceptación manual del usuario | PASS | Cierre y commit autorizados explícitamente el 2026-10-08. |

Las comprobaciones de navegador se ejecutaron en Chrome real mediante Playwright,
sin instalar un framework ni dependencias nuevas en el proyecto. Los scripts
están en `verification/domain-checks.mjs` y `verification/browser-checks.mjs`.
El render SSR directo sustituye únicamente `connection()` para poder ejecutarse
fuera del servidor Next; las interacciones y la navegación se verifican en Next real.

Se corrigió un conflicto de nombres por mayúsculas en Windows. Se desactivó la
precarga de las tarjetas del listado para conservar las interacciones locales.
El CLI añadió inicialmente una utilidad `cn`; se adaptaron los componentes a
`@/lib/utils` y se retiró esa dependencia y el cambio de lockfile.
Las pruebas ahora esperan la hidratación antes de operar controles y menús.

El servidor de desarrollo usado para verificar funciona con
`pnpm dev --webpack --hostname localhost --port 3100`; la combinación inicial de
hostname y proxy no completaba las rutas dinámicas. No se cambió la configuración
de Next ni de autenticación. El build de producción se probó en el puerto 3101.

Los avisos existentes de baseline-browser-mapping, claves de desarrollo de Clerk,
proporciones del logo y configuración de Sanity Live no impiden estos gates.
El origen `http://localhost:3100` no está autorizado para Sanity Live: no se ha
modificado CORS ni se afirma que el refresco editorial Live esté verificado.
Studio, Agenda con Sanity y publicación editorial pertenecen a las fases 3/4.
No se realizaron escrituras remotas.

## Preparación de la verificación manual

Comenzar con `AGENDA_VERIFY` y `AGENDA_VERIFY_NOW` sin definir. Para los escenarios
reproducibles, definir las variables **en el proceso que arranca el servidor** y
reiniciarlo después de cambiar escenario o reloj. No cambiar el reloj del sistema.

```powershell
$env:AGENDA_VERIFY = 'browser'
$env:AGENDA_VERIFY_NOW = '2026-10-08T12:00:00+02:00'
```

Para restaurar los datos habituales, retirar ambas variables y reiniciar:

```powershell
Remove-Item Env:AGENDA_VERIFY, Env:AGENDA_VERIFY_NOW -ErrorAction SilentlyContinue
```

`example.org/inscripcio` es un destino de demostración: comprobar su dirección,
sin esperar un formulario de reserva real. Producción ignora ambas variables.

## Checklist manual completo

Todos los casos siguientes tienen gate del agente PASS. Se conserva el checklist
ofrecido como referencia de la entrega que el usuario aceptó el 2026-10-08.

### Datos habituales y navegación pública

- [ ] En `/agenda`, el subtítulo es `Trobem-nos i fem comunitat`, no hay descripción
  en el hero, y se conservan introducción, destacados, previews y estilos aprobados.
- [ ] El primer CTA del hero, `Totes les activitats`, abre `/agenda/activitats`.
- [ ] El botón de próximas abre `?period=upcoming`; el de archivo abre
  `?period=archived`. El selector muestra el periodo correspondiente.
- [ ] El listado sin filtros contiene las seis actividades locales, incluidos los
  destacados; próximas primero por fecha y archivo después, de más reciente a antiguo.
- [ ] `Torna a l’agenda` vuelve a `/agenda`. Cada tarjeta abre su propio detalle,
  incluidas las canceladas; el detalle conserva su enlace de vuelta.
- [ ] Desde `/rutes-itineraris`, abrir Agenda en el menú y entrar en `Vista general`
  y `Totes les activitats`. Desde el listado, Agenda aparece desplegada. Navegar
  cierra el menú; Enter activa los enlaces.
- [ ] El pie contiene Agenda y su enlace al listado funciona.
- [ ] En `/rutes-itineraris#sortides-esperit`, la tarjeta y el botón visible
  `Més informació` abren `/agenda/activity/sortides-amb-esperit-2027`.
- [ ] `/agenda/activity/does-not-exist` devuelve 404 y muestra
  `Aquesta pàgina no existeix`, sin contenido de actividad.
- [ ] En `/agenda/activity/sortida-familiar-a-nuria`, se ven estado Completa,
  imagen, inicio/fin del 5 de julio de 2027, 09:00/17:00, 480 minutos, 12 EUR,
  organizador, ubicación, participantes y requisitos. No hay enlace de inscripción.

### Búsqueda, filtros y resultados: fixture `browser`

Con el reloj fijo indicado arriba, abrir `/agenda/activitats`.

| Comprobación | Resultado esperado |
| --- | --- |
| Sin filtros | 8 actividades: `verify-7`, `verify-3`, `verify-2`, `verify-4`, `verify-5`, `verify-6`, `verify-1`, `verify-8`. |
| Tipos disponibles | Astronomia, Música y Natura; sin duplicados ni tipos ausentes en los datos. |
| `MUSICA A NURIA`, `musica` o texto con espacios exteriores | Solo `verify-1`; mayúsculas y acentos no afectan. |
| `CONSTEL·LACIONS` o `constellacions` | Solo `verify-3`, buscando en la descripción. |
| `REFUGI DEL BOSC` | Solo `verify-2`, buscando en el lugar. |
| `RIBES DE FRESER` | Solo `verify-2`, buscando en la ciudad. |
| `ASSOCIACIO CAMINS` | Solo `verify-5`, buscando en el organizador. |
| `ASTRONOMIA` u `ONLINE` | Solo `verify-6`, buscando en tipo o ubicación online. |
| Agendada / Completa / Cancel·lada / Finalitzada | 3 / 1 / 2 / 2 resultados. |
| Properes i d’avui / Arxivades | 6 / 2 resultados. |
| Finalitzada + Properes i d’avui | Solo `verify-3`, aunque ya acabó hoy. |
| Finalitzada + Arxivades | Solo `verify-1`. La cancelada archivada conserva Cancel·lada. |
| Astronomia / Música / Natura | 1 / 1 / 6 resultados. Astronomia viene de los datos, sin opción fija en la UI. |
| Natura + Cancel·lada + Properes i d’avui + `CAMINS` | Solo `verify-5`. |
| Texto `NO-EXISTEIX` | 0 resultados y `No hem trobat cap activitat`. |
| Neteja els filtres | Restablece texto vacío, todos los tipos/estados/periodos, 8 resultados y foco en la búsqueda. |
| `?period=upcoming` / `?period=archived` | Inicializa 6 / 2; limpiar vuelve a 8, aunque la URL conserve el preset inicial. |
| Sin `period`, desconocido, vacío o repetido | Todos los periodos, 8 resultados. |

- [ ] Realizar todas las comprobaciones de la tabla; resultados inmediatos y
  contador correcto, incluido el singular `1 activitat`.
- [ ] Al escribir, seleccionar o limpiar, no cambia la URL ni se vuelve a pedir
  el listado. Comprobar en Network las peticiones de documentos/fetch de Agenda.
- [ ] Tab recorre búsqueda, tipo, estado y periodo; Shift+Tab recorre en sentido
  inverso. Las flechas operan los selectores, el foco es visible y Enter en una
  tarjeta abre su detalle. Los controles tienen etiquetas y el contador es una
  región de estado anunciable.
- [ ] A 360, 768 y 1280 px: filtros y botones caben, tarjetas en 1/2/3 columnas,
  sin scroll horizontal ni solapamientos; menú y pie funcionan.
- [ ] Las canceladas conservan título tachado, fondo atenuado y badge rojo; siguen
  siendo navegables. Título, tipo, ubicación, descripción limitada a tres líneas
  y panel de horario mantienen el orden aprobado. Inici/Fi separan fecha y hora.

### Previews y deduplicación

- [ ] Usar `preview-0`, `preview-1`, `preview-6` y `preview-8`, con el mismo reloj:
  la sección de próximas contiene respectivamente 0/1/6/6 tarjetas adicionales,
  excluyendo los dos destacados. El listado contiene respectivamente 2/3/8/10.
- [ ] Usar `archive-0`, `archive-1`, `archive-6` y `archive-8`: el preview de archivo
  contiene 0/1/6/6 y el listado 0/1/6/8. Orden descendente, sin huecos de relleno.
- [ ] Con `same-highlight` aparece un solo destacado y una sola actividad en el
  listado. Con `archive-featured`, el destacado archivado no se repite en el
  preview de seis; las ocho actividades siguen disponibles en el listado.

### Calendario y finalización

- [ ] Con `calendar` y reloj `2026-10-08T12:00:00+02:00`: hay 7 actividades,
  6 próximas/de hoy y 1 archivada; `verify-2` está Finalitzada pero sigue en hoy,
  y `verify-3`, de varios días, no está archivada.
- [ ] En sus detalles, la inscripción existe solo para `verify-3`, `verify-4` y
  `verify-6`; ninguna en 1 (sin URL), 2 (finalizada), 5 (cancelada) o 7 (archivada).
  En 4 se muestran Inici y Durada, sin inventar Fi.
- [ ] Cambiar solo el reloj a `2026-10-09T01:00:00+02:00`: hay 4 archivadas;
  1 finaliza tras medianoche y 4 finaliza exactamente a la 01:00. Solo 3 conserva
  su inscripción. La cancelación conserva su etiqueta.

Las transiciones exactas de medianoche y los cambios de horario de Madrid del
29 de marzo y 25 de octubre se comprobaron adicionalmente en el script de dominio.

### Detalles y opcionales: fixture `detail`

Con reloj `2026-10-08T12:00:00+02:00`, todos estos slugs van tras `/agenda/activity/`.

| Slug | Resultado esperado |
| --- | --- |
| `verify-1` | Campos esenciales, online y gratis. Sin imagen, requisitos, galería, fin, duración, límites ni inscripción. |
| `verify-2` | Agendada, imagen principal y exactamente dos imágenes útiles de galería; 9 de octubre 09:00/11:00, 120 min, dirección, organizador, 12 EUR, edades 6–80, participantes 5–25, materiales, notas e inscripción externa. |
| `detail-full` | Completa; conserva la inscripción externa. |
| `detail-cancelled` | Cancel·lada; título tachado y motivo de lluvia con fecha. Sin inscripción. |
| `detail-finished` | Finalitzada hoy; sin inscripción, todavía fuera del archivo. |
| `detail-archived` | Finalitzada archivada, detalle accesible; sin inscripción, fin ni duración. |
| `detail-empty` | Opcionales vacíos no generan imágenes, requisitos, galerías ni placeholders. |

- [ ] Revisar la tabla, un solo h1 por detalle y metadatos acordes al título.
  La descripción completa aparece al abrir el detalle.
- [ ] En detalles mínimo, completo y cancelado, comprobar 360/768/1280 px,
  información práctica debajo del contenido en móvil, foco en enlaces e iconos
  decorativos. Las imágenes útiles tienen alt y cargan; ninguna tiene src vacío.
- [ ] La imagen local de la actividad familiar usa `/_next/image`; no se ha
  cambiado el proveedor ni la optimización de imágenes.

### Ediciones especiales y datos vacíos

- [ ] Con `spirit`, Rutas enlaza `verify-3`, `Camí nou (empat A)`, futura y cancelada.
  La candidata inválida no la oculta; un título parecido sin marca no se selecciona.
  Tarjeta y ambos CTAs apuntan al mismo detalle.
- [ ] Con `empty`, `/agenda` conserva hero e introducción y presenta el estado
  vacío; `/agenda/activitats` muestra 0 y el mensaje de ausencia de publicaciones.
  No se generan enlaces de detalle. El menú y pie siguen permitiendo navegar.
- [ ] Sin una edición marcada, Rutas conserva la sección y su acceso a `/contacta`.
- [ ] Retirar las variables de fixtures después de verificar.

## Reejecución de las comprobaciones automáticas

Desde la raíz del repositorio, con Node 24 y el Chrome instalado:

```powershell
node openspec/changes/agenda-activities/verification/domain-checks.mjs
$env:AGENDA_PLAYWRIGHT_DIR = 'C:/Users/muner/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'
$env:AGENDA_VERIFY_URL = 'http://localhost:3100'
node openspec/changes/agenda-activities/verification/browser-checks.mjs browser --rollout
```

El argumento debe coincidir con las fixtures del servidor ya reiniciado:
`browser`, `spirit`, `empty`, `detail`, `calendar` o `local` (variables retiradas).
`calendar-next` usa la fixture `calendar` con el reloj del 9 de octubre a la 01:00.
Usar `--rollout` con browser/spirit/empty/local para revisar menú, pie y Rutas.
Para `production`, usar el build con `next start`, URL del puerto de ese servidor
y fixture `empty` definida deliberadamente: deben seguir apareciendo los seis datos
habituales. Las capturas se generan en `.next/agenda-verification/` y son temporales.

## Bloques de revisión

Separar componentes UI nuevos, implementación 2C, rollout 2D, scripts y documentación
en bloques revisables de menos de 400 líneas cada uno. No hay cambios de esquemas,
queries, dependencias, configuración de fuentes ni contenido remoto.
La aceptación manual explícita y el gate de cierre están registrados; revisar
estado y diff antes de cada commit y conservar las fases 3–5 pendientes.
