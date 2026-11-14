import { SITE } from '../../../shared/routes'

/** Hasta cuándo vale el fichero. La RFC 9116 recomienda menos de un año; cada despliegue lo renueva. */
const VALID_DAYS = 364

/**
 * /.well-known/security.txt (RFC 9116): a quién avisar de un fallo de seguridad en heavnd.com o en las apps.
 * Se prerenderiza en el build, así que Expires se calcula entonces: mientras haya un despliegue al año,
 * no caduca. Si pasara casi un año sin desplegar, hay que relanzar el workflow.
 */
export default defineEventHandler((event) => {
  const expires = new Date(Date.now() + VALID_DAYS * 24 * 60 * 60 * 1000)
  expires.setUTCHours(0, 0, 0, 0)
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return [
    'Contact: mailto:security@heavnd.com',
    `Expires: ${expires.toISOString().replace('.000Z', 'Z')}`,
    'Preferred-Languages: es, en, ca',
    `Canonical: ${SITE}/.well-known/security.txt`,
    '',
  ].join('\n')
})
