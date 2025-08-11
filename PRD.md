# AndeanLearn - Plataforma Digital para el Aprendizaje del Kichua y Cultura Andina

Una aplicación educativa innovadora que combina el aprendizaje del idioma Kichua con la preservación y transmisión de las costumbres andinas ancestrales, con énfasis especial en música y danzas tradicionales.

**Experience Qualities**:
1. **Culturalmente Auténtico** - Respeta y honra las tradiciones andinas con contenido verificado por académicos
2. **Progresivo e Intuitivo** - Aprendizaje estructurado que permite avance gradual desde conceptos básicos
3. **Académicamente Riguroso** - Contenido basado en investigación lingüística y antropológica universitaria
4. **Multisensorial** - Integra elementos visuales, auditivos y kinestésicos para un aprendizaje completo

**Complexity Level**: Light Application (multiple features with basic state)
- Funcionalidades educativas interactivas con seguimiento de progreso, módulos especializados en música y danza, ideal para demostrar metodologías pedagógicas innovadoras en entorno universitario

## Essential Features

**Lecciones Interactivas de Idioma**
- Functionality: Módulos básicos de aprendizaje que combinan vocabulario Kichua con contexto cultural
- Purpose: Enseñar el idioma dentro de su marco cultural original para comprensión holística
- Trigger: Usuario selecciona lección desde dashboard principal
- Progression: Selección de lección → Presentación de concepto cultural → Vocabulario asociado → Ejercicio práctico → Retroalimentación → Progreso guardado
- Success criteria: Usuario completa ejercicios con 80% de precisión y comprende contexto cultural

**Lecciones de Música Andina**
- Functionality: Módulos especializados que enseñan sobre instrumentos, géneros y cantos tradicionales con simulación audio interactiva
- Purpose: Preservar y transmitir el patrimonio musical andino mientras se aprende vocabulario especializado
- Trigger: Selección de lección musical desde vista de lecciones
- Progression: Introducción cultural → Teoría musical → Práctica interactiva → Vocabulario musical → Evaluación
- Success criteria: Usuario identifica instrumentos, comprende contextos ceremoniales y aprende vocabulario musical específico

**Lecciones de Danza Andina**
- Functionality: Módulos que enseñan movimientos, significados y contextos de danzas tradicionales
- Purpose: Transmitir el conocimiento corporal y espiritual de las danzas ceremoniales y festivas
- Trigger: Selección de lección de danza desde vista de lecciones
- Progression: Contexto cultural → Pasos básicos → Movimientos rituales → Formaciones grupales → Significado ceremonial
- Success criteria: Usuario comprende simbolismo de movimientos y contexto cultural de cada danza

**Explorador Cultural Expandido**
- Functionality: Secciones temáticas sobre tradiciones, ceremonias, agricultura, cosmovisión, música y danza andina
- Purpose: Contextualizar el aprendizaje del idioma dentro de la riqueza cultural andina completa
- Trigger: Navegación desde menú principal o enlaces dentro de lecciones
- Progression: Selección de tema → Contenido multimedia → Vocabulario específico → Reflexión cultural → Marcado como explorado
- Success criteria: Usuario explora contenido y demuestra comprensión de conceptos culturales

**Seguimiento de Progreso Gamificado**
- Functionality: Dashboard que muestra avance en lecciones, logros específicos de música/danza y conocimiento cultural adquirido
- Purpose: Motivar continuidad y permitir evaluación académica del aprendizaje integral
- Trigger: Automático al completar actividades o acceso directo desde menú
- Progression: Actividad completada → Actualización automática → Logros desbloqueados → Visualización de progreso → Sugerencias de próximos pasos
- Success criteria: Registro preciso de progreso con logros específicos para diferentes tipos de aprendizaje

## Edge Case Handling

- **Contenido Multimedia Incompleto**: Placeholder educativo cuando audio/video está en desarrollo
- **Progreso Perdido**: Recuperación automática desde almacenamiento local persistente
- **Simulación de Audio**: Representación visual y textual cuando audio real no está disponible
- **Respuestas Incorrectas**: Explicación pedagógica con contexto cultural en lugar de simple corrección
- **Navegación Compleja**: Breadcrumbs claros para orientación en contenido extenso con múltiples categorías

## Design Direction

La interfaz debe evocar la serenidad y conexión con la naturaleza características de la filosofía andina, combinando elementos visuales que reflejan textiles, colores y patrones tradicionales con una presentación moderna y académica. Los módulos de música y danza requieren elementos visuales que sugieran movimiento y ritmo.

## Color Selection

Triadic (three equally spaced colors) - Inspirado en la trilogía andina (Cóndor, Puma, Serpiente) para representar los mundos cósmicos andinos con una paleta que transmite sabiduría ancestral y modernidad académica.

- **Primary Color**: Azul Andino (oklch(0.45 0.15 240)) - Representa el Hanaq Pacha (mundo de arriba) y transmite confianza académica
- **Secondary Colors**: Tierra Sagrada (oklch(0.65 0.12 45)) para calidez y conexión con la Pachamama
- **Accent Color**: Oro Inca (oklch(0.75 0.18 85)) - Color ceremonial para elementos importantes y logros
- **Foreground/Background Pairings**: 
  - Background Blanco (oklch(0.98 0.02 45)): Texto Azul Andino (oklch(0.45 0.15 240)) - Ratio 7.2:1 ✓
  - Primary Azul Andino: Texto Blanco (oklch(0.98 0.02 45)) - Ratio 8.1:1 ✓
  - Accent Oro Inca: Texto Azul Oscuro (oklch(0.25 0.1 240)) - Ratio 6.8:1 ✓

## Font Selection

Tipografía que combina legibilidad académica con calidez cultural, usando Inter para elementos modernos y manteniendo claridad en la presentación de contenido Kichua.

- **Typographic Hierarchy**: 
  - H1 (Títulos Principales): Inter Bold/32px/tracking tight
  - H2 (Secciones): Inter Semibold/24px/tracking normal  
  - Body (Contenido): Inter Regular/16px/leading relaxed
  - Kichua Text: Inter Medium/18px/tracking wide para legibilidad del idioma

## Animations

Movimientos sutiles inspirados en la filosofía del "Sumak Kawsay" (buen vivir), priorizando transiciones suaves que reflejen la armonía andina sin distraer del aprendizaje.

- **Purposeful Meaning**: Transiciones que evocan el flujo natural y la conexión espiritual andina
- **Hierarchy of Movement**: Énfasis en progreso de aprendizaje y logros culturales

## Component Selection

- **Components**: Cards para lecciones, Progress para avance, Tabs para explorador cultural, Button para interacciones, Badge para logros
- **Customizations**: Card con patrones sutiles andinos, Progress con colores temáticos
- **States**: Hover con elevación sutil, Active con tonos dorados, Focus con aura cultural
- **Icon Selection**: Iconos geométricos que referencien símbolos andinos cuando sea apropiado
- **Spacing**: Espaciado generoso que refleje la amplitud de los paisajes andinos
- **Mobile**: Diseño stack-first que prioriza accesibilidad en dispositivos móviles para alcance educativo amplio