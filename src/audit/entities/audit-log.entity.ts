import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AuditAction } from '../enum';

/**
 * Registro persistente de auditoría: trazabilidad de acciones sobre la API.
 * Cada fila describe un evento (quién, qué, dónde, desde qué cliente y qué cambió).
 */
@Entity('audit_log')
export class AuditLog {
  /** Identificador único del registro de auditoría. */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Id del usuario en la aplicación (tabla user), si se pudo resolver.
   * Puede ser null en rutas públicas o fallos antes de identificar al usuario.
   */
  @Column({ type: 'varchar', length: 64, nullable: true })
  userId!: string | null;

  /**
   * Correo u otro identificador legible del actor (p. ej. email en login).
   * Complementa userId cuando solo se conoce el email o para búsquedas rápidas.
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  userEmail!: string | null;

  /**
   * Tipo de operación semántica (CREATE, AUTH_LOGIN, etc.).
   * Ver enum AuditAction.
   */
  @Column({ type: 'varchar', length: 48 })
  action!: AuditAction;

  /**
   * Recurso o módulo afectado (primer segmento de ruta: period, section, auth…).
   */
  @Column({ type: 'varchar', length: 128 })
  resource!: string;

  /**
   * Identificador del recurso en ruta cuando aplica (p. ej. id numérico en PATCH /period/5).
   * Null en creaciones POST sin id en URL o en rutas sin recurso concreto.
   */
  @Column({ type: 'varchar', length: 64, nullable: true })
  resourceId!: string | null;

  /** Método HTTP de la petición (GET, POST, PATCH…). */
  @Column({ type: 'varchar', length: 16 })
  httpMethod!: string;

  /**
   * Ruta solicitada (sin query string en la práctica); tokens sensibles enmascarados.
   */
  @Column({ type: 'varchar', length: 512 })
  path!: string;

  /**
   * Dirección IP de origen (según el proxy/servidor; puede ser la del balanceador).
   */
  @Column({ type: 'varchar', length: 64, nullable: true })
  ipAddress!: string | null;

  /**
   * Valor del header User-Agent tal como lo envía el navegador (truncado).
   * Sirve para análisis técnico o soporte.
   */
  @Column({ type: 'varchar', length: 1024, nullable: true })
  userAgent!: string | null;

  /**
   * Resumen legible derivado del User-Agent (navegador y SO aproximados).
   * Pensado para mostrar en pantallas de administración sin parsear el UA completo.
   */
  @Column({ type: 'varchar', length: 128, nullable: true })
  clientSummary!: string | null;

  /**
   * Fragmento del cuerpo de la petición (JSON) con datos sensibles redactados.
   * Complementa propertyChanges; no sustituye al diff estructurado en updates.
   */
  @Column({ type: 'text', nullable: true })
  payloadSnippet!: string | null;

  /**
   * JSON con cambios de propiedades para el frontend:
   * - PATCH/PUT: `{ "campo": { "previous": …, "current": … }, … }` según body enviado.
   * - POST creación: `{ "operation": "CREATE", "fieldsSubmitted": ["a","b"] }`.
   * Null si no aplica (auth, GET, fallo, entidad no encontrada para diff).
   */
  @Column({ type: 'text', nullable: true })
  propertyChangesJson!: string | null;

  /** Código HTTP de la respuesta al cliente. */
  @Column({ type: 'smallint' })
  statusCode!: number;

  /** true si la respuesta fue 2xx/3xx (operación considerada exitosa a nivel HTTP). */
  @Column({ type: 'boolean' })
  success!: boolean;

  /** Momento en que se generó el registro (servidor, UTC). */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
