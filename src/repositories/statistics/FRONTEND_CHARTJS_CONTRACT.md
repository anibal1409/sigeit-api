# Contrato de estadísticas para frontend con Chart.js

Este documento define el formato recomendado de respuesta para que el frontend pueda consumir las estadísticas con `Chart.js` y `ng2-charts` con el mínimo de transformación posible.

## Principios

- Usar `camelCase` en todos los DTOs.
- Mantener respuestas planas, normales y tipadas.
- Devolver valores numéricos como `number`.
- Evitar estructuras anidadas innecesarias.
- Entregar series simples por categoría o por período.
- No mezclar datos con presentación visual.

## Formato recomendado

### Series simples

Cuando la métrica depende de una categoría, devolver una lista de objetos con una etiqueta y un valor:

```json
[
  { "dayName": "Lunes", "teacherCount": 12 },
  { "dayName": "Martes", "teacherCount": 8 }
]
```

```json
[
  { "departmentName": "Ingeniería", "totalCapacity": 1200 },
  { "departmentName": "Ciencias", "totalCapacity": 950 }
]
```

```json
[
  { "careerName": "Sistemas", "sectionCount": 34 },
  { "careerName": "Industrial", "sectionCount": 28 }
]
```

### Comparaciones entre períodos

Cuando se comparan semestres, devolver una fila por período con los indicadores agregados:

```json
{
  "metrics": [
    {
      "periodId": 1,
      "periodName": "2025-1",
      "periodStart": "2025-01-15T00:00:00.000Z",
      "sectionCount": 120,
      "totalCapacity": 3600,
      "totalSubjectHours": 2400
    }
  ]
}
```

### Comparación de demanda por asignatura

Para indicar qué asignaturas incrementaron demanda entre dos períodos, devolver una lista plana:

```json
[
  {
    "subjectId": 10,
    "subjectCode": "MAT101",
    "subjectName": "Matemática I",
    "baseTotalCapacity": 60,
    "referenceTotalCapacity": 90,
    "capacityDelta": 30,
    "baseSectionCount": 2,
    "referenceSectionCount": 3,
    "sectionDelta": 1
  }
]
```

## Qué conviene evitar

- Respuestas con HTML ya renderizado.
- Datos con nombres inconsistentes o en `snake_case`.
- Datos calculados mezclados con estilo visual.
- Objetos profundamente anidados si solo se van a graficar.
- Estructuras que obliguen al frontend a reconstruir información básica.

## Mapeo sugerido para Chart.js

- `labels = data.map(item => item.dayName)`
- `datasets = [{ data: data.map(item => item.teacherCount) }]`
- Para comparaciones, usar `metrics` como base de series múltiples.
- Para ranking o top-N, usar listas planas ordenadas por valor.

## Endpoints de estadísticas

- `GET /statistics/period-comparison?periodIds=1,2,3`
- `GET /statistics/teachers-by-day?periodId=N`
- `GET /statistics/by-department?periodId=N`
- `GET /statistics/by-subject?periodId=N`
- `GET /statistics/teacher-workload?periodId=N`
- `GET /statistics/classroom-usage?periodId=N`
- `GET /statistics/start-time-distribution?periodId=N`
- `GET /statistics/section-open-distribution?periodId=N`
- `GET /statistics/timeline`
- `GET /statistics/by-career?periodId=N`
- `GET /statistics/by-curriculum-semester?periodId=N`

## Recomendación práctica para el frontend

- Barras y líneas: `periodName`, `dayName`, `departmentName`, `careerName`, `subjectName`.
- Valores: `teacherCount`, `sectionCount`, `totalCapacity`, `totalSubjectHours`.
- Doughnut o pie: `openToAll` vs `sectionCount`.
- Ranking: `by-subject`, `teacher-workload`, `classroom-usage`.

Con este contrato, el frontend solo debe transformar cada respuesta en `labels` y `datasets`, sin lógica adicional compleja.
