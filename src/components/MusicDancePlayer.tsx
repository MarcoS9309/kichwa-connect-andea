import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, PlayCircle, PauseCircle, MusicNote, PersonArmsSpread, Heart, Sparkle } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

interface MusicDanceLesson {
  id: string
  title: string
  titleKichua: string
  culturalContext: string
  type: 'music' | 'dance'
  vocabulary: Array<{
    kichua: string
    spanish: string
    context: string
  }>
}

interface MusicDancePlayerProps {
  lesson: MusicDanceLesson
  onComplete: () => void
  onBack: () => void
}

export const MusicDancePlayer: React.FC<MusicDancePlayerProps> = ({ lesson, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'theory' | 'practice' | 'completed'>('intro')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [completedLessons, setCompletedLessons] = useKV<string[]>('completed-lessons', [])

  const musicSections = [
    { 
      title: "Introducción Melódica", 
      description: "Escucha los tonos pentatónicos característicos",
      duration: "2:30" 
    },
    { 
      title: "Ritmo Base", 
      description: "Comprende el patrón rítmico fundamental",
      duration: "1:45" 
    },
    { 
      title: "Instrumentación", 
      description: "Identifica cada instrumento y su rol",
      duration: "3:15" 
    },
    { 
      title: "Práctica Vocal", 
      description: "Canta junto con la melodía",
      duration: "2:00" 
    }
  ]

  const danceSteps = [
    { 
      title: "Posición Inicial", 
      description: "Aprende la postura básica andina",
      movement: "Pies paralelos, brazos suaves" 
    },
    { 
      title: "Paso Base", 
      description: "Movimiento fundamental del baile",
      movement: "Paso lateral izquierdo, derecho, centro" 
    },
    { 
      title: "Giros Rituales", 
      description: "Los giros que representan los ciclos naturales",
      movement: "Giro en sentido horario, brazos al cielo" 
    },
    { 
      title: "Formación Grupal", 
      description: "Cómo se organiza la danza comunitaria",
      movement: "Círculo sagrado, movimiento sincronizado" 
    }
  ]

  const sections = lesson.type === 'music' ? musicSections : danceSteps

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    // Simular reproducción de audio
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000)
    }
  }

  const handleStepComplete = () => {
    if (currentStep === 'intro') {
      setCurrentStep('theory')
    } else if (currentStep === 'theory') {
      setCurrentStep('practice')
    } else if (currentStep === 'practice') {
      setCurrentStep('completed')
      // Marcar lección como completada
      if (!completedLessons.includes(lesson.id)) {
        setCompletedLessons(prev => [...prev, lesson.id])
      }
    }
  }

  const renderIntroStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
          {lesson.type === 'music' ? (
            <MusicNote size={24} className="text-accent" />
          ) : (
            <PersonArmsSpread size={24} className="text-accent" />
          )}
          <h2 className="text-xl font-bold">{lesson.title}</h2>
        </div>
        <p className="text-lg text-muted-foreground italic">{lesson.titleKichua}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkle size={20} className="text-primary" />
            Contexto Cultural
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{lesson.culturalContext}</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {lesson.vocabulary.slice(0, 4).map((item, index) => (
          <Card key={index} className="border-accent/20">
            <CardContent className="pt-4">
              <div className="space-y-2">
                <p className="font-semibold text-accent">{item.kichua}</p>
                <p className="text-sm text-muted-foreground">{item.spanish}</p>
                <p className="text-xs text-muted-foreground/80 italic">{item.context}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button onClick={handleStepComplete} size="lg" className="gap-2">
          Comenzar Aprendizaje
          <Heart size={16} />
        </Button>
      </div>
    </div>
  )

  const renderTheoryStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          {lesson.type === 'music' ? 'Fundamentos Musicales' : 'Elementos de la Danza'}
        </h3>
        <Progress value={33} className="w-full max-w-md mx-auto" />
      </div>

      <div className="grid gap-4">
        {sections.map((section, index) => (
          <Card key={index} className={`${currentSection === index ? 'border-accent bg-accent/5' : ''}`}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">{section.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                  {lesson.type === 'dance' && 'movement' in section && (
                    <p className="text-xs text-accent mt-2 italic">{section.movement}</p>
                  )}
                </div>
                {lesson.type === 'music' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{'duration' in section ? section.duration : ''}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCurrentSection(index)
                        togglePlayback()
                      }}
                    >
                      {isPlaying && currentSection === index ? (
                        <PauseCircle size={20} />
                      ) : (
                        <PlayCircle size={20} />
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button onClick={handleStepComplete} size="lg" className="gap-2">
          Practicar
          {lesson.type === 'music' ? <MusicNote size={16} /> : <PersonArmsSpread size={16} />}
        </Button>
      </div>
    </div>
  )

  const renderPracticeStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Práctica Interactiva</h3>
        <Progress value={66} className="w-full max-w-md mx-auto" />
      </div>

      <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            {lesson.type === 'music' ? (
              <>
                <MusicNote size={24} className="text-accent" />
                Sesión Musical
              </>
            ) : (
              <>
                <PersonArmsSpread size={24} className="text-accent" />
                Práctica de Danza
              </>
            )}
          </CardTitle>
          <CardDescription>
            {lesson.type === 'music' 
              ? "Reproduce y practica junto con los ritmos andinos" 
              : "Sigue los movimientos tradicionales de la danza"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-4">
            <Button
              variant="outline"
              size="lg"
              onClick={togglePlayback}
              className="gap-2 w-full max-w-md"
            >
              {isPlaying ? (
                <>
                  <PauseCircle size={24} />
                  Pausar
                </>
              ) : (
                <>
                  <PlayCircle size={24} />
                  {lesson.type === 'music' ? 'Reproducir Música' : 'Iniciar Danza'}
                </>
              )}
            </Button>
            
            {isPlaying && (
              <div className="bg-muted/50 rounded-lg p-4 border border-border/30">
                <p className="text-sm text-muted-foreground mb-2">
                  {lesson.type === 'music' ? '🎵 Reproduciendo...' : '💃 Siguiendo el ritmo...'}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-accent/20 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full w-1/3 transition-all duration-1000" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-2 text-sm">
            {lesson.vocabulary.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                <span className="font-medium text-accent">{item.kichua}</span>
                <span className="text-muted-foreground">{item.spanish}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={handleStepComplete} size="lg" className="gap-2">
          Completar Lección
          <Sparkle size={16} />
        </Button>
      </div>
    </div>
  )

  const renderCompletedStep = () => (
    <div className="space-y-6 text-center">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-3 bg-accent/10 px-6 py-3 rounded-full border border-accent/20">
          <Sparkle size={24} className="text-accent" weight="fill" />
          <h2 className="text-xl font-bold text-accent">¡Lección Completada!</h2>
        </div>
        <p className="text-muted-foreground">
          Has completado exitosamente la lección de {lesson.type === 'music' ? 'música' : 'danza'} andina
        </p>
        <Progress value={100} className="w-full max-w-md mx-auto" />
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Conocimiento Adquirido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Vocabulario aprendido:</span>
              <span className="font-semibold">{lesson.vocabulary.length} palabras</span>
            </div>
            <div className="flex justify-between">
              <span>Contexto cultural:</span>
              <span className="font-semibold">Explorado</span>
            </div>
            <div className="flex justify-between">
              <span>Práctica completada:</span>
              <span className="font-semibold">✓</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft size={16} />
          Volver a Lecciones
        </Button>
        <Button onClick={onComplete} className="gap-2">
          Continuar Aprendiendo
          <Heart size={16} />
        </Button>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft size={16} />
          Volver
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">{lesson.title}</h1>
          <p className="text-muted-foreground italic">{lesson.titleKichua}</p>
        </div>
        <Badge variant={lesson.type === 'music' ? 'default' : 'secondary'} className="gap-1">
          {lesson.type === 'music' ? <MusicNote size={14} /> : <PersonArmsSpread size={14} />}
          {lesson.type === 'music' ? 'Música' : 'Danza'}
        </Badge>
      </div>

      {currentStep === 'intro' && renderIntroStep()}
      {currentStep === 'theory' && renderTheoryStep()}
      {currentStep === 'practice' && renderPracticeStep()}
      {currentStep === 'completed' && renderCompletedStep()}
    </div>
  )
}