# Copias de seguridad

Copia diaria de las cuatro bases de datos (`resolvd`, `meald`, `togethrd`, `simplfd`) y de las carpetas de fotos (`/var/lib/resolvd/uploads`, `/var/lib/togethrd/uploads`) a un almacenamiento fuera del VPS.

- Los volcados (`pg_dump -Fc`) se cifran con [age](https://age-encryption.org) para una clave pública. La privada no está en el VPS.
- [restic](https://restic.net) sube volcados y fotos, cifra el repositorio y aplica la retención: 7 diarias, 4 semanales, 6 mensuales.
- No forma parte del despliegue: se instala a mano una vez.

## Instalar

1. En tu ordenador, no en el VPS: `age-keygen -o heavnd-backup.key`. Guarda el fichero en el gestor de contraseñas y copia la línea `Public key: age1…`.
2. Crea el destino en otro proveedor (un bucket de Backblaze B2 o un Storage Box) con una credencial limitada a él.
3. En el VPS, como root, desde esta carpeta:

   ```bash
   ./install.sh
   ```

   ```bash
   cp /etc/heavnd/backup.env.example /etc/heavnd/backup.env
   ```

   ```bash
   openssl rand -base64 32 > /etc/heavnd/restic-password && chmod 600 /etc/heavnd/restic-password
   ```

   Rellena `/etc/heavnd/backup.env` y guarda también la contraseña de restic en el gestor. Vuelve a ejecutar `./install.sh`: activa el temporizador.
4. Primera copia y comprobación:

   ```bash
   systemctl start heavnd-backup.service
   ```

   ```bash
   journalctl -u heavnd-backup -n 30 --no-pager
   ```

   ```bash
   heavnd-restore.sh list
   ```

Antes de un despliegue con migración: `heavnd-backup.sh --db-only`.

## Restaurar

La clave privada age hace falta solo para las bases de datos. Llévala a la máquina, úsala y bórrala.

```bash
AGE_IDENTITY=/root/heavnd-backup.key heavnd-restore.sh db simplfd
```

Deja la copia en la base `simplfd_restore`, sin tocar la real, y enseña cuántas tablas tiene y la última migración. Para sustituir la real en un desastre: parar la app (`systemctl stop simplfd-api`), añadir `--replace` y volver a arrancarla.

```bash
heavnd-restore.sh uploads /tmp/fotos
```

Con destino `/` las fotos vuelven a su sitio. `--snapshot ID` elige una copia concreta en lugar de la última.

## Prueba de restauración

Una copia que no se ha restaurado no cuenta. Cada trimestre, en una máquina temporal: instalar PostgreSQL, restic y age, copiar `backup.env`, la contraseña de restic y la clave age, restaurar las cuatro bases de datos, arrancar una app contra la copia y entrar con una cuenta. Apuntar cuánto se tarda.

## Límites

- El VPS tiene la contraseña de restic: quien consiga root puede borrar las copias. Si el proveedor lo permite, usa una credencial sin permiso de borrado (en B2, una clave sin `deleteFiles` y reglas de ciclo de vida) y ejecuta la retención desde otra máquina.
- Las fotos van cifradas por restic, no por age.
- No hay recuperación a un punto en el tiempo: se pierde como mucho un día.
