import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { BookOpen, Mountain, Star, Play } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

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

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg font-semibold tracking-tight">{lesson.title}</CardTitle>
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
  const [completedLessons, setCompletedLessons] = useKV<string[]>('completed-lessons', [])
  
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
    }
  ]

  const completionRate = (completedLessons.length / lessons.length) * 100

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full border border-border/30">
          <Mountain size={20} className="text-primary" />
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