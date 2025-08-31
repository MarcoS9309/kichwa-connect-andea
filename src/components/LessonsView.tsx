import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { BookOpen, Mountains, Star, Play, MusicNote, PersonArmsSpread } from '@phosphor-icons/react'
import { useKV } from '@/spark/hooks'

interface Lesson {
  id: string
  title: string
  titleKichua: string
  description: string
  culturalContext: string
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado'
  completed: boolean
  vocabulary: Array<{
    kichua: string
    spanish: string
    context: string
  }>
}

interface LessonCardProps {
  lesson: Lesson
  onStart: (lesson: Lesson) => void
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onStart }) => {
  const difficultyColors = {
    'Básico': 'bg-accent text-accent-foreground',
    'Intermedio': 'bg-secondary text-secondary-foreground', 
    'Avanzado': 'bg-primary text-primary-foreground'
  }

  // Check if it's a music or dance lesson
  const isMusicLesson = ['4', '6', '7', '9'].includes(lesson.id)
  const isDanceLesson = ['5', '8', '10'].includes(lesson.id)
  const isInteractiveLesson = isMusicLesson || isDanceLesson
  
  // Check if it's a community-focused lesson (lessons 11-20)
  const isCommunityLesson = parseInt(lesson.id) >= 11

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 ${
      isInteractiveLesson ? 'ring-1 ring-accent/20' : ''
    } ${
      isCommunityLesson ? 'ring-1 ring-primary/20 bg-gradient-to-br from-background to-primary/5' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold tracking-tight">{lesson.title}</CardTitle>
              {isMusicLesson && <MusicNote size={16} className="text-accent" />}
              {isDanceLesson && <PersonArmsSpread size={16} className="text-accent" />}
            </div>
            <p className="text-sm font-medium text-muted-foreground italic">{lesson.titleKichua}</p>
          </div>
          <Badge className={`ml-2 ${difficultyColors[lesson.difficulty]} text-xs font-medium`}>
            {lesson.difficulty}
          </Badge>
        </div>
        <CardDescription className="text-sm leading-relaxed pt-1">
          {lesson.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="p-3 bg-muted/50 rounded-lg border border-border/30">
            <p className="text-xs font-medium text-muted-foreground mb-1">Contexto Cultural</p>
            <p className="text-sm leading-relaxed">{lesson.culturalContext}</p>
          </div>
          
          {isInteractiveLesson && (
            <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
              <p className="text-xs font-medium text-accent mb-1">
                {isMusicLesson ? '🎵 Lección Musical Interactiva' : '💃 Lección de Danza Interactiva'}
              </p>
              <p className="text-xs text-muted-foreground">
                {isMusicLesson 
                  ? 'Incluye práctica con instrumentos y cantos tradicionales'
                  : 'Incluye movimientos y coreografías tradicionales'
                }
              </p>
            </div>
          )}
          
          {isCommunityLesson && (
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-xs font-medium text-primary mb-1">
                🏛️ Lección de Impacto Comunitario
              </p>
              <p className="text-xs text-muted-foreground">
                Incluye conexiones con la importancia actual y aplicaciones modernas
              </p>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen size={16} />
              <span>{lesson.vocabulary.length} palabras</span>
            </div>
            
            <Button 
              onClick={() => onStart(lesson)}
              size="sm"
              className="gap-2 font-medium"
              variant={lesson.completed ? "secondary" : "default"}
            >
              <Play size={16} />
              {lesson.completed ? 'Revisar' : 'Comenzar'}
            </Button>
          </div>
          
          {lesson.completed && (
            <div className="flex items-center gap-2 text-accent">
              <Star size={16} weight="fill" />
              <span className="text-sm font-medium">Completado</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface LessonsViewProps {
  onStartLesson: (lesson: Lesson) => void
}

export const LessonsView: React.FC<LessonsViewProps> = ({ onStartLesson }) => {
  const [completedLessons] = useKV<string[]>('completed-lessons', [])
  
  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Saludos y Presentación',
      titleKichua: 'Napaykullay hinaspa Riqsichikuy',
      description: 'Aprende los saludos tradicionales y cómo presentarte en Kichua.',
      culturalContext: 'En la cultura andina, los saludos van más allá de las palabras, incluyendo gestos de respeto hacia la Pachamama y las personas mayores.',
      difficulty: 'Básico',
      completed: completedLessons.includes('1'),
      vocabulary: [
        { kichua: 'Napaykullay', spanish: 'Hola / Saludos', context: 'Saludo formal respetuoso' },
        { kichua: 'Imaynalla kashkanki', spanish: '¿Cómo estás?', context: 'Pregunta por el bienestar' },
        { kichua: 'Allinmi kashkani', spanish: 'Estoy bien', context: 'Respuesta positiva' },
        { kichua: 'Noqapa sutiyqa... kan', spanish: 'Mi nombre es...', context: 'Presentación personal' }
      ]
    },
    {
      id: '2', 
      title: 'La Familia Andina',
      titleKichua: 'Ayllu',
      description: 'Descubre la estructura familiar extendida y los roles en la comunidad andina.',
      culturalContext: 'El ayllu es la base de la organización social andina, donde la familia extendida incluye no solo parientes consanguíneos sino también la relación con la naturaleza.',
      difficulty: 'Básico',
      completed: completedLessons.includes('2'),
      vocabulary: [
        { kichua: 'Ayllu', spanish: 'Familia extendida', context: 'Núcleo social fundamental' },
        { kichua: 'Tayta', spanish: 'Padre', context: 'Figura de autoridad y sabiduría' },
        { kichua: 'Mama', spanish: 'Madre', context: 'Protectora y transmisora de tradiciones' },
        { kichua: 'Churin', spanish: 'Hijo', context: 'Continuador del linaje' },
        { kichua: 'Ususi', spanish: 'Hija', context: 'Guardiana de la cultura' }
      ]
    },
    {
      id: '3',
      title: 'Ceremonia de la Pachamama',
      titleKichua: 'Pachamama Raymi',
      description: 'Aprende sobre las ceremonias de agradecimiento a la Madre Tierra.',
      culturalContext: 'Las ceremonias a la Pachamama son expresiones de reciprocidad y gratitud hacia la naturaleza, fundamentales en el calendario ritual andino.',
      difficulty: 'Intermedio',
      completed: completedLessons.includes('3'),
      vocabulary: [
        { kichua: 'Pachamama', spanish: 'Madre Tierra', context: 'Deidad protectora de la naturaleza' },
        { kichua: 'Ayni', spanish: 'Reciprocidad', context: 'Principio de equilibrio y intercambio' },
        { kichua: 'Despacho', spanish: 'Ofrenda', context: 'Ritual de agradecimiento' },
        { kichua: 'Challa', spanish: 'Libación', context: 'Ofrenda líquida sagrada' }
      ]
    },
    {
      id: '4',
      title: 'Instrumentos Musicales Andinos',
      titleKichua: 'Takina Wakanaykuna',
      description: 'Conoce los instrumentos tradicionales y su rol en la música ancestral.',
      culturalContext: 'Los instrumentos andinos no son solo herramientas musicales, sino objetos sagrados que conectan el mundo terrenal con el espiritual, cada uno con su propio simbolismo cósmico.',
      difficulty: 'Básico',
      completed: completedLessons.includes('4'),
      vocabulary: [
        { kichua: 'Takina', spanish: 'Música / Cantar', context: 'Arte sonoro sagrado' },
        { kichua: 'Kena', spanish: 'Quena', context: 'Flauta de caña que imita el viento' },
        { kichua: 'Charango', spanish: 'Charango', context: 'Instrumento de cuerdas del altiplano' },
        { kichua: 'Pinkullu', spanish: 'Pinkullo', context: 'Flauta traversa ritual' },
        { kichua: 'Tinya', spanish: 'Tambor', context: 'Percusión que marca el corazón de la Pachamama' }
      ]
    },
    {
      id: '5',
      title: 'Danzas de la Cosecha',
      titleKichua: 'Pallay Taki',
      description: 'Explora las danzas tradicionales relacionadas con los ciclos agrícolas.',
      culturalContext: 'Las danzas de cosecha son ceremonias de agradecimiento que marcan los tiempos sagrados del cultivo, donde cada movimiento representa la conexión entre el ser humano y la fertilidad de la tierra.',
      difficulty: 'Intermedio',
      completed: completedLessons.includes('5'),
      vocabulary: [
        { kichua: 'Pallay', spanish: 'Cosecha', context: 'Acto sagrado de recolección' },
        { kichua: 'Taki', spanish: 'Danza / Canción', context: 'Expresión corporal ritual' },
        { kichua: 'Qashwa', spanish: 'Danza festiva', context: 'Baile comunitario de celebración' },
        { kichua: 'Wayno', spanish: 'Huayno', context: 'Danza del cortejo y la alegría' },
        { kichua: 'Sara taki', spanish: 'Canción del maíz', context: 'Himno al alimento sagrado' }
      ]
    },
    {
      id: '6',
      title: 'Cantos Ceremoniales',
      titleKichua: 'Hatun Takikuna',
      description: 'Aprende los cantos sagrados utilizados en ceremonias ancestrales.',
      culturalContext: 'Los cantos ceremoniales son oraciones musicales que invocan la protección de los apus (montañas sagradas) y mantienen el equilibrio cósmico durante rituales importantes.',
      difficulty: 'Avanzado',
      completed: completedLessons.includes('6'),
      vocabulary: [
        { kichua: 'Hatun taki', spanish: 'Canto sagrado', context: 'Oración musical ceremonial' },
        { kichua: 'Apu', spanish: 'Montaña sagrada', context: 'Espíritu protector de las alturas' },
        { kichua: 'Sumak kausay', spanish: 'Buen vivir', context: 'Armonía integral con la naturaleza' },
        { kichua: 'Inti taki', spanish: 'Canto al sol', context: 'Himno al padre celestial' },
        { kichua: 'Killa taki', spanish: 'Canto a la luna', context: 'Alabanza a la madre nocturna' }
      ]
    },
    {
      id: '7',
      title: 'El Yaraví: Música del Alma',
      titleKichua: 'Yaraví: Animapa Takinan',
      description: 'Descubre este género musical melancólico que expresa los sentimientos profundos.',
      culturalContext: 'El yaraví es la expresión musical del alma andina, donde se plasman las emociones más íntimas: el amor, la nostalgia y la conexión espiritual con los ancestros.',
      difficulty: 'Intermedio',
      completed: completedLessons.includes('7'),
      vocabulary: [
        { kichua: 'Yaraví', spanish: 'Yaraví', context: 'Género musical melancólico' },
        { kichua: 'Anima', spanish: 'Alma', context: 'Esencia espiritual' },
        { kichua: 'Llaki', spanish: 'Tristeza', context: 'Melancolía profunda' },
        { kichua: 'Munay', spanish: 'Amor', context: 'Sentimiento del corazón' },
        { kichua: 'Waqay', spanish: 'Llorar', context: 'Expresión de dolor o alegría' }
      ]
    },
    {
      id: '8',
      title: 'Danzas de los Apus',
      titleKichua: 'Apu Tusuy',
      description: 'Conoce las danzas dedicadas a las montañas sagradas y su simbolismo.',
      culturalContext: 'Las danzas de los apus son representaciones corporales del poder y la majestuosidad de las montañas, donde los danzantes se convierten en intermediarios entre los mundos.',
      difficulty: 'Avanzado',
      completed: completedLessons.includes('8'),
      vocabulary: [
        { kichua: 'Tusuy', spanish: 'Danzar', context: 'Movimiento ritual sagrado' },
        { kichua: 'Apu tusuy', spanish: 'Danza de las montañas', context: 'Ritual de veneración' },
        { kichua: 'Maskay', spanish: 'Máscara', context: 'Transformación espiritual' },
        { kichua: 'Llama tusuy', spanish: 'Danza de la llama', context: 'Honra al animal sagrado' },
        { kichua: 'Inka tusuy', spanish: 'Danza imperial', context: 'Tradición del tiempo incaico' }
      ]
    },
    {
      id: '9',
      title: 'Música para la Pachamama',
      titleKichua: 'Pachamama Takina',
      description: 'Aprende los ritmos y melodías dedicados a la Madre Tierra.',
      culturalContext: 'La música dedicada a la Pachamama sigue patrones rítmicos que imitan los ciclos naturales: el latido del corazón de la tierra, el fluir del agua y el susurro del viento.',
      difficulty: 'Intermedio',
      completed: completedLessons.includes('9'),
      vocabulary: [
        { kichua: 'Pachamama takina', spanish: 'Música de la Madre Tierra', context: 'Composiciones telúricas' },
        { kichua: 'Yakana', spanish: 'Ritmo del agua', context: 'Cadencia que fluye' },
        { kichua: 'Wayrana', spanish: 'Sonido del viento', context: 'Melodía etérea' },
        { kichua: 'Allpana', spanish: 'Canto de la tierra', context: 'Himno a la fertilidad' },
        { kichua: 'Nina takina', spanish: 'Música del fuego', context: 'Ritmo purificador' }
      ]
    },
    {
      id: '10',
      title: 'Festival del Inti Raymi Musical',
      titleKichua: 'Inti Raymi Takina Raymi',
      description: 'Explora la música y danzas del festival más importante del calendario andino.',
      culturalContext: 'El Inti Raymi combina música, danza y teatro en una grandiosa celebración que recrea la conexión cósmica entre el pueblo andino y el padre sol, manteniendo vivas las tradiciones milenarias.',
      difficulty: 'Avanzado',
      completed: completedLessons.includes('10'),
      vocabulary: [
        { kichua: 'Inti Raymi', spanish: 'Fiesta del Sol', context: 'Celebración del solsticio' },
        { kichua: 'Qapaq', spanish: 'Noble / Real', context: 'Dignidad ancestral' },
        { kichua: 'Kusay', spanish: 'Alegría', context: 'Gozo espiritual' },
        { kichua: 'Hatun raymi', spanish: 'Gran festividad', context: 'Ceremonia mayor' },
        { kichua: 'Tahuantinsuyu', spanish: 'Imperio de los cuatro suyos', context: 'Territorio ancestral unificado' }
      ]
    },
    {
      id: '11',
      title: 'Medicina Tradicional y Plantas Sagradas',
      titleKichua: 'Hampiy hinaspa Hatun Yuyakuna',
      description: 'Conoce el sistema de medicina ancestral y el uso ritual de plantas medicinales.',
      culturalContext: 'La medicina andina integra el equilibrio físico, emocional y espiritual. Las comunidades actuales mantienen estos conocimientos como alternativa vital de salud, especialmente en zonas rurales donde el acceso a medicina occidental es limitado.',
      difficulty: 'Intermedio',
      completed: completedLessons.includes('11'),
      vocabulary: [
        { kichua: 'Hampiy', spanish: 'Medicina / Curar', context: 'Arte de sanar integralmente' },
        { kichua: 'Yachak', spanish: 'Sabio / Curandero', context: 'Conocedor de medicina ancestral' },
        { kichua: 'Koka', spanish: 'Coca', context: 'Planta sagrada energizante' },
        { kichua: 'Muña', spanish: 'Muña', context: 'Hierba digestiva y purificadora' },
        { kichua: 'Retama', spanish: 'Retama', context: 'Planta para limpias espirituales' },
        { kichua: 'Unquy', spanish: 'Enfermedad', context: 'Desequilibrio del ser' }
      ]
    },
    {
      id: '12',
      title: 'Economía Solidaria: Ayni y Minka',
      titleKichua: 'Ayni hinaspa Minka Qullqi',
      description: 'Comprende los sistemas económicos ancestrales basados en reciprocidad y trabajo comunitario.',
      culturalContext: 'Los principios de ayni (reciprocidad) y minka (trabajo comunitario) son modelos económicos sostenibles que las comunidades modernas están redescubriendo como alternativas al capitalismo, promoviendo equidad y cohesión social.',
      difficulty: 'Intermedio',
      completed: completedLessons.includes('12'),
      vocabulary: [
        { kichua: 'Ayni', spanish: 'Reciprocidad', context: 'Intercambio equitativo de favores' },
        { kichua: 'Minka', spanish: 'Trabajo comunitario', context: 'Faena colectiva para beneficio común' },
        { kichua: 'Wasi ruway', spanish: 'Construcción de casa', context: 'Trabajo comunitario de edificación' },
        { kichua: 'Rantiykuy', spanish: 'Intercambio', context: 'Trueque de productos' },
        { kichua: 'Llamkay', spanish: 'Trabajar', context: 'Labor como servicio comunitario' },
        { kichua: 'Mitay', spanish: 'Turno / Vez', context: 'Sistema de rotación de responsabilidades' }
      ]
    },
    {
      id: '13',
      title: 'Comunicación Ancestral: Los Quipus',
      titleKichua: 'Ñawpa Rimay: Quipukuna',
      description: 'Descubre el sistema de escritura a través de nudos que utilizó el Imperio Incaico.',
      culturalContext: 'Los quipus representan un sistema de información complejo que las universidades estudian hoy como ejemplo de tecnología de la información no occidental. Su comprensión ayuda a revalorar los sistemas de conocimiento indígenas.',
      difficulty: 'Avanzado',
      completed: completedLessons.includes('13'),
      vocabulary: [
        { kichua: 'Quipu', spanish: 'Quipu', context: 'Sistema de registros con nudos' },
        { kichua: 'Quipukamayuq', spanish: 'Contador de quipus', context: 'Especialista en lectura de quipus' },
        { kichua: 'Watana', spanish: 'Atar / Anudar', context: 'Acción de crear información' },
        { kichua: 'Yupay', spanish: 'Contar', context: 'Registrar cantidades o datos' },
        { kichua: 'Amawta', spanish: 'Sabio', context: 'Maestro del conocimiento' },
        { kichua: 'Ñawinchasqa', spanish: 'Bordado / Diseño', context: 'Patrón visual comunicativo' }
      ]
    },
    {
      id: '14',
      title: 'Astronomía Andina y Agricultura',
      titleKichua: 'Quyllur Yachay hinaspa Chakra',
      description: 'Aprende cómo las comunidades usan las constelaciones para guiar la agricultura.',
      culturalContext: 'El conocimiento astronómico andino sigue siendo utilizado por agricultores contemporáneos para predecir el clima y planificar siembras. Este saber ancestral es reconocido por la ciencia moderna como complemento valioso para la agricultura sostenible.',
      difficulty: 'Avanzado',
      completed: completedLessons.includes('14'),
      vocabulary: [
        { kichua: 'Quyllur', spanish: 'Estrella', context: 'Guía celestial para la agricultura' },
        { kichua: 'Chakana', spanish: 'Cruz del Sur', context: 'Constelación guía principal' },
        { kichua: 'Qatachillay', spanish: 'Llama celestial', context: 'Constelación de la llama' },
        { kichua: 'Tarpuy pacha', spanish: 'Tiempo de siembra', context: 'Período determinado por astros' },
        { kichua: 'Para chiri', spanish: 'Lluvia y frío', context: 'Predicción climática ancestral' },
        { kichua: 'Wata', spanish: 'Año', context: 'Ciclo agrícola completo' }
      ]
    },
    {
      id: '15',
      title: 'Textiles como Identidad Comunitaria',
      titleKichua: 'Away Llaqta Kaqninpa',
      description: 'Comprende cómo los patrones textiles identifican comunidades y transmiten historia.',
      culturalContext: 'Los textiles andinos funcionan como códigos de identidad que permiten identificar la procedencia, estatus social y tradiciones familiares. En el mundo globalizado, estos textiles se han convertido en símbolos de resistencia cultural y orgullo identitario.',
      difficulty: 'Intermedio',
      completed: completedLessons.includes('15'),
      vocabulary: [
        { kichua: 'Away', spanish: 'Tejido', context: 'Texto cultural en fibras' },
        { kichua: 'Pallay', spanish: 'Patrón / Diseño', context: 'Código visual de identidad' },
        { kichua: 'Ñawiy', spanish: 'Tejer', context: 'Acto de crear cultura material' },
        { kichua: 'Akana', spanish: 'Vestido / Ropa', context: 'Identidad vestida' },
        { kichua: 'Saya', spanish: 'Zona / Región', context: 'Territorio de origen identificable' },
        { kichua: 'Kani', spanish: 'Soy / Identidad', context: 'Expresión del ser colectivo' }
      ]
    },
    {
      id: '16',
      title: 'Justicia Comunitaria Andina',
      titleKichua: 'Hatun Kamachiy',
      description: 'Conoce el sistema de justicia ancestral basado en la restauración y la armonía comunitaria.',
      culturalContext: 'La justicia comunitaria andina busca restaurar el equilibrio social más que castigar. Este modelo es estudiado actualmente como alternativa a sistemas punitivos, especialmente efectivo en comunidades rurales donde prevalece la cohesión social.',
      difficulty: 'Avanzado',
      completed: completedLessons.includes('16'),
      vocabulary: [
        { kichua: 'Kamachiy', spanish: 'Ordenar / Justicia', context: 'Establecer equilibrio social' },
        { kichua: 'Kuraq', spanish: 'Autoridad / Mayor', context: 'Líder respetado de la comunidad' },
        { kichua: 'Pantay', spanish: 'Error / Falta', context: 'Desequilibrio que debe corregirse' },
        { kichua: 'Allinyay', spanish: 'Reparar / Mejorar', context: 'Restaurar la armonía' },
        { kichua: 'Rimanakuy', spanish: 'Diálogo', context: 'Conversación restaurativa' },
        { kichua: 'Ayllumanta', spanish: 'De la comunidad', context: 'Perspectiva colectiva' }
      ]
    },
    {
      id: '17',
      title: 'Conservación de Semillas Ancestrales',
      titleKichua: 'Ñawpa Muhu Waqaychay',
      description: 'Aprende sobre la preservación de variedades nativas y su importancia para la biodiversidad.',
      culturalContext: 'Las comunidades andinas custodian miles de variedades de papa, quinoa y otros cultivos que son vitales para la seguridad alimentaria mundial. Su trabajo es reconocido internacionalmente como esencial frente al cambio climático y la pérdida de biodiversidad.',
      difficulty: 'Intermedio',
      completed: completedLessons.includes('17'),
      vocabulary: [
        { kichua: 'Muhu', spanish: 'Semilla', context: 'Vida futura guardada' },
        { kichua: 'Waqaychay', spanish: 'Guardar / Conservar', context: 'Proteger para el futuro' },
        { kichua: 'Papa', spanish: 'Papa', context: 'Tubérculo sagrado originario' },
        { kichua: 'Kinwa', spanish: 'Quinoa', context: 'Grano madre andino' },
        { kichua: 'Sara', spanish: 'Maíz', context: 'Cereal sagrado americano' },
        { kichua: 'Yuraq', spanish: 'Blanco', context: 'Color de variedad específica' },
        { kichua: 'Puka', spanish: 'Rojo', context: 'Color de variedad ancestral' }
      ]
    },
    {
      id: '18',
      title: 'Tecnología Ancestral: Andenes y Sostenibilidad',
      titleKichua: 'Ñawpa Yachay: Andenes hinaspa Wiñay',
      description: 'Descubre cómo la ingeniería agrícola ancestral inspira soluciones modernas sostenibles.',
      culturalContext: 'Los andenes andinos son reconocidos mundialmente como ejemplo de agricultura sostenible que previene erosión, conserva agua y maximiza producción. Ingenieros actuales estudian estas técnicas para aplicarlas en proyectos modernos de agricultura climáticamente inteligente.',
      difficulty: 'Avanzado',
      completed: completedLessons.includes('18'),
      vocabulary: [
        { kichua: 'Andenes', spanish: 'Terrazas agrícolas', context: 'Ingeniería ancestral sostenible' },
        { kichua: 'Qochaykuna', spanish: 'Lagunas artificiales', context: 'Sistema de reserva hídrica' },
        { kichua: 'Waru waru', spanish: 'Camellones', context: 'Agricultura en zonas inundables' },
        { kichua: 'Suyu', spanish: 'Canal', context: 'Sistema de irrigación' },
        { kichua: 'Allpa', spanish: 'Tierra', context: 'Suelo conservado' },
        { kichua: 'Wiñay', spanish: 'Eterno / Sostenible', context: 'Duradero a través del tiempo' }
      ]
    },
    {
      id: '19',
      title: 'Educación Comunitaria y Transmisión Cultural',
      titleKichua: 'Ayllu Yachachiy hinaspa Kawsay Quy',
      description: 'Comprende cómo las comunidades andinas transmiten conocimientos de generación en generación.',
      culturalContext: 'El sistema educativo comunitario andino, basado en el aprendizaje práctico y la participación intergeneracional, ofrece modelos pedagógicos alternativos que universidades y organizaciones internacionales estudian para mejorar la educación intercultural.',
      difficulty: 'Intermedio',
      completed: completedLessons.includes('19'),
      vocabulary: [
        { kichua: 'Yachachiy', spanish: 'Enseñar', context: 'Transmitir sabiduría ancestral' },
        { kichua: 'Yachakuq', spanish: 'Estudiante', context: 'Aprendiz de la vida' },
        { kichua: 'Amawta', spanish: 'Maestro sabio', context: 'Guardián del conocimiento' },
        { kichua: 'Willakuy', spanish: 'Narrar / Contar', context: 'Transmisión oral' },
        { kichua: 'Ruway yachay', spanish: 'Aprender haciendo', context: 'Pedagogía práctica' },
        { kichua: 'Machay', spanish: 'Caverna / Lugar de aprendizaje', context: 'Espacio sagrado educativo' }
      ]
    },
    {
      id: '20',
      title: 'Liderazgo Femenino en las Comunidades Andinas',
      titleKichua: 'Warmi Kamachiq Ayllu Ukhupi',
      description: 'Conoce el papel fundamental de las mujeres en la dirección y preservación cultural comunitaria.',
      culturalContext: 'Las mujeres andinas ejercen liderazgos únicos en la preservación cultural, gestión de recursos naturales y toma de decisiones comunitarias. Su modelo de liderazgo horizontal y consensual inspira movimientos feministas contemporáneos y estudios de género.',
      difficulty: 'Intermedio',
      completed: completedLessons.includes('20'),
      vocabulary: [
        { kichua: 'Warmi', spanish: 'Mujer', context: 'Fuerza creativa y preservadora' },
        { kichua: 'Mama', spanish: 'Madre / Señora', context: 'Autoridad femenina respetada' },
        { kichua: 'Kamachiq', spanish: 'Quien dirige', context: 'Liderazgo responsable' },
        { kichua: 'Ayllu mama', spanish: 'Madre de la comunidad', context: 'Lideresa comunal' },
        { kichua: 'Willaq warmi', spanish: 'Mujer que habla', context: 'Portavoz autorizada' },
        { kichua: 'Yachaq mama', spanish: 'Madre sabia', context: 'Guardiana del conocimiento' }
      ]
    }
  ]

  const completionRate = (completedLessons.length / lessons.length) * 100

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full border border-border/30">
          <Mountains size={20} className="text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Lecciones de Kichua</h1>
        </div>
        
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progreso General</span>
            <span>{Math.round(completionRate)}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <LessonCard 
            key={lesson.id} 
            lesson={lesson} 
            onStart={onStartLesson}
          />
        ))}
      </div>
    </div>
  )
}