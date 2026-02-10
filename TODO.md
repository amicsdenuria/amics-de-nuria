[ ] - Loading screens between charges or at pages (see how it works for SSR)
[ ] - Almacenar el event.id o al menos guardar en Sanity que se ha procesado ese event.id para evitar procesar dos veces el mismo webhook.
[ ] - Implementar reintentos y logging (errores deben devolver 500 para que Stripe reintente automáticamente)
