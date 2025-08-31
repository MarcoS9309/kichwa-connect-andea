import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  GraduationCap, 
  Globe, 
  Lightbulb, 
  Users, 
  Heart, 
  TrendUp,
  BookOpen,
  Sparkle
} from '@phosphor-icons/react'

interface EducationalContent {
  id: string
  title: string
  subtitle: string
  description: string
  modernApplications: string[]
  globalExamples: string[]
  universityPrograms: string[]
  communityBenefits: string[]
}

const educationalContents: EducationalContent[] = [
  {
    id: 'cultural-preservation',
    title: 'Preservación Cultural en la Era Digital',
    subtitle: 'Cómo la tecnología ayuda a mantener vivas las tradiciones andinas',
    description: 'Las universidades y organizaciones internacionales están utilizando tecnologías digitales para documentar, preservar y transmitir el conocimiento ancestral andino. Este proceso no solo conserva las tradiciones, sino que las hace accesibles a nuevas generaciones y al mundo entero.',
    modernApplications: [
      'Aplicaciones móviles para aprender Kichua con IA conversacional',
      'Realidad virtual para experimentar ceremonias andinas inmersivamente',
      'Blockchain para proteger la propiedad intelectual de conocimientos ancestrales',
      'Plataformas de e-learning que integran metodologías pedagógicas ancestrales'
    ],
    globalExamples: [
      'Universidad de Toronto: Programa de Lenguas Indígenas Digitales',
      'MIT: Laboratorio de Medios para Comunidades Indígenas',
      'UNESCO: Archivo Digital de Patrimonio Cultural Inmaterial',
      'Google Arts & Culture: Exposiciones de Culturas Originarias'
    ],
    universityPrograms: [
      'Maestría en Educación Intercultural Bilingüe - Universidad Mayor de San Andrés',
      'Doctorado en Estudios Andinos - Pontificia Universidad Javeriana',
      'Especialización en Medicina Tradicional - Universidad del Cauca',
      'Programa de Lenguas Originarias - Universidad de Chile'
    ],
    communityBenefits: [
      'Fortalecimiento de la identidad cultural en jóvenes',
      'Generación de ingresos a través del turismo cultural responsable',
      'Mejora en la transmisión intergeneracional de conocimientos',
      'Reconocimiento internacional de saberes ancestrales'
    ]
  },
  {
    id: 'sustainable-development',
    title: 'Desarrollo Sostenible Basado en Sabiduría Ancestral',
    subtitle: 'Modelos andinos para enfrentar desafíos globales',
    description: 'Los principios andinos de armonía con la naturaleza, reciprocidad social y gestión sostenible de recursos ofrecen soluciones comprobadas para los desafíos actuales de sostenibilidad, cambio climático y cohesión social.',
    modernApplications: [
      'Agricultura regenerativa inspirada en técnicas de andenes y rotación',
      'Sistemas de agua potable comunitarios basados en gestión ancestral',
      'Modelos de economía circular que eliminan el concepto de "desperdicio"',
      'Gobernanza participativa en organizaciones modernas y ciudades'
    ],
    globalExamples: [
      'Perú: Sistema Nacional de Áreas Naturales Protegidas con gestión indígena',
      'Ecuador: Constitución que reconoce los Derechos de la Naturaleza',
      'Bolivia: Modelo de Vivir Bien (Suma Qamaña) como política de Estado',
      'Colombia: Consulta previa a pueblos indígenas en proyectos de desarrollo'
    ],
    universityPrograms: [
      'Maestría en Desarrollo Sostenible - Universidad Andina Simón Bolívar',
      'Ingeniería Ambiental con enfoque intercultural - Universidad del Valle',
      'Economía Ecológica y Buen Vivir - FLACSO Ecuador',
      'Gestión de Recursos Naturales Comunitarios - Universidad de La Paz'
    ],
    communityBenefits: [
      'Conservación efectiva de ecosistemas por comunidades locales',
      'Seguridad alimentaria a través de diversidad de cultivos nativos',
      'Resistencia comunitaria ante efectos del cambio climático',
      'Modelos económicos que reducen desigualdad y fortalecen cohesión'
    ]
  },
  {
    id: 'innovation-tradition',
    title: 'Innovación Tecnológica con Raíces Ancestrales',
    subtitle: 'Cómo startups y universidades integran conocimiento tradicional',
    description: 'Empresas emergentes y centros de investigación están desarrollando innovaciones tecnológicas que se inspiran en principios ancestrales andinos, creando soluciones que son tanto tecnológicamente avanzadas como culturalmente arraigadas.',
    modernApplications: [
      'Sensores IoT que monitorean cultivos usando patrones de observación ancestral',
      'Algoritmos de predicción climática que integran conocimiento astronómico andino',
      'Materiales de construcción inspirados en técnicas de arquitectura inca',
      'Sistemas de distribución de recursos basados en principios de ayni'
    ],
    globalExamples: [
      'Startup chilena desarrolla textiles inteligentes inspirados en tejidos andinos',
      'Universidad de Berkeley estudia resistencia sísmica de construcciones incas',
      'IBM investiga sistemas de almacenamiento inspirados en quipus',
      'NASA analiza técnicas agrícolas andinas para cultivos en Marte'
    ],
    universityPrograms: [
      'Innovación Tecnológica Intercultural - Pontificia Universidad Católica del Perú',
      'Bioingeniería con Enfoque Ancestral - Universidad de los Andes',
      'Diseño Industrial Sustentable - Universidad Jorge Tadeo Lozano',
      'Arquitectura Vernácula Contemporánea - Universidad Central del Ecuador'
    ],
    communityBenefits: [
      'Transferencia tecnológica que respeta y fortalece culturas locales',
      'Creación de empleos especializados en comunidades rurales',
      'Desarrollo de productos con identidad cultural propia',
      'Protección de conocimientos tradicionales contra apropiación'
    ]
  }
]

interface ContentCardProps {
  content: EducationalContent
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-tight">{content.title}</CardTitle>
        <CardDescription className="text-base font-medium">{content.subtitle}</CardDescription>
        <p className="text-sm leading-relaxed pt-2">{content.description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={18} className="text-accent" />
              <h4 className="font-semibold text-sm">Aplicaciones Modernas</h4>
            </div>
            <ul className="space-y-2">
              {content.modernApplications.map((app, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe size={18} className="text-primary" />
              <h4 className="font-semibold text-sm">Ejemplos Globales</h4>
            </div>
            <ul className="space-y-2">
              {content.globalExamples.map((example, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap size={18} className="text-secondary" />
              <h4 className="font-semibold text-sm">Programas Universitarios</h4>
            </div>
            <ul className="space-y-2">
              {content.universityPrograms.map((program, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span>{program}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users size={18} className="text-muted-foreground" />
              <h4 className="font-semibold text-sm">Beneficios Comunitarios</h4>
            </div>
            <ul className="space-y-2">
              {content.communityBenefits.map((benefit, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-muted-foreground font-bold">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const EducationalHub: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full border border-border/30">
          <BookOpen size={20} className="text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Centro Educativo</h1>
        </div>
        <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Descubre cómo el conocimiento ancestral andino está transformando la educación superior, 
          la investigación científica y el desarrollo tecnológico en universidades de todo el mundo.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {educationalContents.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Sparkle size={24} className="text-accent" />
            ¿Por qué es importante para las universidades?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendUp size={20} className="text-accent" />
                <h3 className="font-semibold">Innovación Académica</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Metodologías pedagógicas holísticas que mejoran el aprendizaje</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Investigación interdisciplinaria que conecta ciencias y humanidades</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Soluciones tecnológicas inspiradas en sabiduría milenaria</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart size={20} className="text-primary" />
                <h3 className="font-semibold">Impacto Social</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Formación de profesionales con consciencia intercultural</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Desarrollo de comunidades rurales a través de educación superior</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Preservación activa del patrimonio cultural inmaterial</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-4">
            <Badge className="bg-accent text-accent-foreground text-base font-medium px-6 py-3">
              El futuro de la educación es intercultural e inclusivo
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}