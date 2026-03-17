import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

/**
 * Carga el estado de una fila antes de PATCH/PUT para poder calcular el diff
 * después de que el handler haya persistido los cambios.
 */
@Injectable()
export class AuditDiffService {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Obtiene un objeto plano con las columnas de la entidad para el id dado.
   * @param resourceKey Segmento de URL (p. ej. period) alineado con tableName de TypeORM.
   */
  async getEntitySnapshot(
    resourceKey: string,
    id: number,
  ): Promise<Record<string, unknown> | null> {
    const meta = this.dataSource.entityMetadatas.find(
      (m) =>
        m.tableName.toLowerCase() === resourceKey.toLowerCase() ||
        m.name.toLowerCase() === resourceKey.toLowerCase(),
    );
    if (!meta) return null;
    try {
      const repo = this.dataSource.getRepository(meta.target);
      const row = await repo.findOne({
        where: { id } as Record<string, number>,
      });
      if (!row || typeof row !== 'object') return null;
      return this.entityToPlain(row);
    } catch {
      return null;
    }
  }

  private entityToPlain(entity: object): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(entity)) {
      if (key.startsWith('_')) continue;
      const v = (entity as Record<string, unknown>)[key];
      if (typeof v === 'function') continue;
      out[key] = v;
    }
    return out;
  }
}
