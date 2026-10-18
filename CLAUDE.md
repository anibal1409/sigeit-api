# Reglas del proyecto

- Reglas: `.cursor/rules/api.mdc` (fuente única compartida con Cursor). Seguirlas siempre.
- Al terminar un cambio y antes de commitear: skill `sigeit-review` (`.claude/skills/sigeit-review`, enlace a `.cursor/skills/sigeit-review`).
- Resumen: identificadores en inglés, comentarios y documentación en español; todo código documentado; sin duplicado ni código muerto; métodos ≤ 50 líneas; seguridad según la regla.
- Decisiones y cambios relevantes (qué se hizo, por qué y qué se eliminó): `docs/decisiones/`. Leerlos antes de tocar autenticación, permisos, configuración, formatos u horarios, y agregar uno nuevo al hacer cambios de ese tipo.
