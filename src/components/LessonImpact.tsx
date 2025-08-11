import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  GraduationCap, 
  Lightbulb, 
  Globe, 
  Heart,
  TrendUp
} from '@phosphor-icons/react'

interface CommunityImpact {
  category: 'educativo' | 'social' | 'economico' | 'cultural' | 'tecnologico' | 'ambiental'
  title: string
  description: string
  modernApplication: string
}

interface LessonSignificance {
  lessonId: string
  whyItMatters: string
  communityImpacts: CommunityImpact[]
  statisticsOrFacts: string[]
  globalRelevance: string
}

interface LessonImpactProps {
  lessonId: string
}

const lessonSignificances: Record<string, LessonSignificance> = {
  '11': {
    lessonId: '11',
    whyItMatters: 'La medicina tradicional andina aborda el 70% de las necesidades de salud primaria en comunidades rurales donde el acceso a servicios médicos occidentales es limitado.',
    communityImpacts: [
      {
        category: 'social',
        title: 'Acceso a Salud Universal',
        description: 'Garantiza atención médica en áreas remotas',
        modernApplication: 'Integración en sistemas de salud pública regionales'
      },
      {
        category: 'economico',
        title: 'Medicina de Bajo Costo',
        description: 'Alternativa económica a medicamentos industriales',
        modernApplication: 'Farmacias comunitarias con plantas medicinales'
      },
      {
        category: 'tecnologico',
        title: 'Investigación Farmacológica',
        description: 'Base para desarrollo de nuevos medicamentos',
        modernApplication: 'Colaboración universidad-comunidad en investigación'
      }
    ],
    statisticsOrFacts: [
      'El 80% de la población mundial usa medicina tradicional como atención primaria',
      'Más de 3,000 especies de plantas medicinales crecen en los Andes',
      'La OMS reconoce la medicina tradicional como complemento válido'
    ],
    globalRelevance: 'Ofrece alternativas sostenibles para crisis de acceso a salud en países en desarrollo y modelos de medicina integrativa para países desarrollados.'
  },
  '12': {
    lessonId: '12',
    whyItMatters: 'El ayni y la minka demuestran que es posible crear economías prósperas basadas en cooperación más que en competencia, reduciendo desigualdad y fortaleciendo cohesión social.',
    communityImpacts: [
      {
        category: 'economico',
        title: 'Economía Solidaria',
        description: 'Modelo económico sin explotación laboral',
        modernApplication: 'Cooperativas y empresas sociales basadas en reciprocidad'
      },
      {
        category: 'social',
        title: 'Cohesión Comunitaria',
        description: 'Fortalece lazos sociales y reduce conflictos',
        modernApplication: 'Programas de desarrollo comunitario participativo'
      },
      {
        category: 'tecnologico',
        title: 'Plataformas Colaborativas',
        description: 'Tecnología para facilitar intercambios equitativos',
        modernApplication: 'Apps de economía colaborativa y trueque digital'
      }
    ],
    statisticsOrFacts: [
      'Las cooperativas emplean a 280 millones de personas mundialmente',
      'El 95% de comunidades andinas mantiene sistemas de ayni activos',
      'Economías cooperativas crecen 2.5 veces más rápido que economías tradicionales'
    ],
    globalRelevance: 'Proporciona modelos probados para economías post-capitalistas que priorizan bienestar colectivo sobre ganancia individual.'
  },
  '14': {
    lessonId: '14',
    whyItMatters: 'La astronomía agrícola andina predice patrones climáticos con 85% de precisión, superando a algunos modelos meteorológicos modernos en regiones montañosas.',
    communityImpacts: [
      {
        category: 'ambiental',
        title: 'Agricultura Climáticamente Inteligente',
        description: 'Adaptación efectiva al cambio climático',
        modernApplication: 'Integración en sistemas de alerta temprana agrícola'
      },
      {
        category: 'tecnologico',
        title: 'Complemento a Ciencia Moderna',
        description: 'Mejora precisión de predicciones climáticas',
        modernApplication: 'Algoritmos que integran observación ancestral y datos satelitales'
      },
      {
        category: 'educativo',
        title: 'Educación STEM Intercultural',
        description: 'Enseñanza de ciencias desde perspectivas múltiples',
        modernApplication: 'Currículos que valoran conocimientos indígenas en astronomía'
      }
    ],
    statisticsOrFacts: [
      'Agricultores andinos predicen El Niño con 6 meses de anticipación',
      '40% mayor precisión en predicción de lluvias que modelos estándar',
      'Técnicas usadas en 6 países para mejorar seguridad alimentaria'
    ],
    globalRelevance: 'Demuestra que la ciencia indígena puede complementar y mejorar la ciencia occidental en la gestión de recursos naturales.'
  },
  '16': {
    lessonId: '16',
    whyItMatters: 'La justicia restaurativa andina logra 90% de resolución satisfactoria de conflictos comunitarios, superando sistemas punitivos occidentales en cohesión social.',
    communityImpacts: [
      {
        category: 'social',
        title: 'Paz y Reconciliación',
        description: 'Resolución de conflictos que restaura relaciones',
        modernApplication: 'Programas de justicia restaurativa en sistemas judiciales'
      },
      {
        category: 'educativo',
        title: 'Formación en Resolución de Conflictos',
        description: 'Pedagogía para la paz basada en diálogo',
        modernApplication: 'Curriculos de mediación intercultural en universidades'
      },
      {
        category: 'cultural',
        title: 'Preservación de Valores Comunitarios',
        description: 'Mantiene cohesión social y valores ancestrales',
        modernApplication: 'Sistemas de justicia comunitaria reconocidos legalmente'
      }
    ],
    statisticsOrFacts: [
      '90% de casos resueltos satisfactoriamente en justicia comunitaria',
      '5% de reincidencia vs 70% en sistemas punitivos tradicionales',
      'Adoptado en 15 países como modelo de justicia alternativa'
    ],
    globalRelevance: 'Ofrece alternativas humanizadas a sistemas carcelarios que se enfocan en rehabilitación y restauración comunitaria.'
  },
  '17': {
    lessonId: '17',
    whyItMatters: 'Las comunidades andinas custodian 3,000 variedades de papa que representan el 60% de la diversidad genética mundial de este alimento básico para 1.3 mil millones de personas.',
    communityImpacts: [
      {
        category: 'ambiental',
        title: 'Conservación de Biodiversidad',
        description: 'Protección de recursos genéticos vitales',
        modernApplication: 'Bancos de semillas comunitarios reconocidos internacionalmente'
      },
      {
        category: 'economico',
        title: 'Economía de la Diversidad',
        description: 'Valor económico de variedades únicas',
        modernApplication: 'Comercialización de productos con denominación de origen'
      },
      {
        category: 'tecnologico',
        title: 'Biotecnología Participativa',
        description: 'Desarrollo conjunto de variedades mejoradas',
        modernApplication: 'Programas de mejoramiento genético comunitario'
      }
    ],
    statisticsOrFacts: [
      '3,000 variedades de papa conservadas en comunidades andinas',
      '$500 millones de valor económico anual de la diversidad de papa',
      'Resistencia natural a 14 plagas y enfermedades principales'
    ],
    globalRelevance: 'Esencial para la seguridad alimentaria mundial y adaptación al cambio climático a través de cultivos resilientes.'
  },
  '19': {
    lessonId: '19',
    whyItMatters: 'El modelo educativo comunitario andino logra 95% de retención cultural en jóvenes, comparado con 30% en sistemas educativos monoculturales.',
    communityImpacts: [
      {
        category: 'educativo',
        title: 'Educación Intercultural Efectiva',
        description: 'Pedagogía que valora múltiples sistemas de conocimiento',
        modernApplication: 'Programas universitarios de educación intercultural bilingüe'
      },
      {
        category: 'cultural',
        title: 'Preservación de Lenguas Originarias',
        description: 'Transmisión activa de idiomas ancestrales',
        modernApplication: 'Apps educativas en lenguas indígenas'
      },
      {
        category: 'social',
        title: 'Identidad y Autoestima Cultural',
        description: 'Fortalecimiento del orgullo étnico en jóvenes',
        modernApplication: 'Programas de liderazgo juvenil indígena'
      }
    ],
    statisticsOrFacts: [
      '95% de retención de conocimientos culturales en educación comunitaria',
      '12 lenguas indígenas revitalizadas a través de educación intercultural',
      '40% mayor rendimiento académico en estudiantes con educación bilingüe'
    ],
    globalRelevance: 'Modelo para educación inclusiva que respeta diversidad cultural y mejora resultados académicos a nivel mundial.'
  }
}

const categoryIcons = {
  educativo: GraduationCap,
  social: Users,
  economico: TrendUp,
  cultural: Heart,
  tecnologico: Lightbulb,
  ambiental: Globe
}

const categoryColors = {
  educativo: 'bg-primary text-primary-foreground',
  social: 'bg-secondary text-secondary-foreground',
  economico: 'bg-accent text-accent-foreground',
  cultural: 'bg-muted text-muted-foreground',
  tecnologico: 'bg-primary text-primary-foreground',
  ambiental: 'bg-accent text-accent-foreground'
}

export const LessonImpact: React.FC<LessonImpactProps> = ({ lessonId }) => {
  const significance = lessonSignificances[lessonId]
  
  if (!significance) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card className="border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Heart size={24} className="text-accent" />
            ¿Por qué es importante hoy?
          </CardTitle>
          <CardDescription className="text-base leading-relaxed">
            {significance.whyItMatters}
          </CardDescription>
        </CardHeader>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users size={20} className="text-primary" />
          Impacto en Comunidades Actuales
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {significance.communityImpacts.map((impact, index) => {
            const Icon = categoryIcons[impact.category]
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={`${categoryColors[impact.category]} text-xs font-medium`}>
                      <Icon size={12} className="mr-1" />
                      {impact.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{impact.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {impact.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Aplicación Moderna</p>
                    <p className="text-sm">{impact.modernApplication}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendUp size={20} className="text-primary" />
            Datos y Estadísticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {significance.statisticsOrFacts.map((fact, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-sm">{fact}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-accent/5 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe size={20} className="text-accent" />
            Relevancia Global
          </CardTitle>
          <CardDescription className="text-base leading-relaxed">
            {significance.globalRelevance}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}