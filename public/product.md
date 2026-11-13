# QuadShip

QuadShip es un PaaS self-hosted en Rust, en prealfa. Está en desarrollo y no está listo para producción. No hay una fecha de lanzamiento anunciada.

## Definición original de la especificación

Es un PaaS self-hosted en Rust: Podman rootless con un usuario Linux por proyecto, supervisión nativa con systemd/Quadlet, Caddy con HTTPS automático, deploy que solo avanza cuando el CI está en verde y un servidor MCP de primera clase con aprobaciones humanas para las acciones destructivas.

## Objetivos, no funcionalidades terminadas

- Desplegar aplicaciones en servidores propios con aislamiento rootless por proyecto.
- Condicionar el deploy al CI del commit exacto.
- Acceder mediante UI, API, CLI y MCP, con permisos limitados y control humano.
- Bindings de bases de datos gestionadas o externas, con usuarios y privilegios por aplicación y rotación de credenciales.
- Asistencia LLM opcional con clave propia: solo texto, sin ejecución autónoma.

## Liderazgo del desarrollo

Miguel Ángel Bonilla Torres lidera el desarrollo integral de QuadShip.
Portafolio y contacto: https://mangel14.dev/es

## Identidad

La marca usa el rombo de cuatro compartimentos separados y el wordmark quadship en minúscula; QuadShip en prosa. No está afiliada a terceros por mencionar compatibilidad técnica.
