import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, CheckCircle, Volume2, RotateCounterClockwise, Heart } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { LessonImpact } from '@/components/LessonImpact'

interface LessonContent {
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

interface Exercise {
  id: string
  type: 'translation' | 'matching' | 'context'
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

interface LessonPlayerProps {
  lesson: LessonContent
  onComplete: () => void
  onBack: () => void
}

export const LessonPlayer: React.FC<LessonPlayerProps> = ({ lesson, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'vocabulary' | 'exercise' | 'completed'>('intro')
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [showExplanation, setShowExplanation] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [completedLessons, setCompletedLessons] = useKV<string[]>('completed-lessons', [])

  const exercises: Exercise[] = [
    {
      id: '1',
      type: 'translation',
      question: `¿Cómo se dice "Hola" en Kichua?`,
      options: ['Napaykullay', 'Allinmi', 'Sutiyqa', 'Kashkani'],
      correctAnswer: 'Napaykullay',
      explanation: 'Napaykullay es el saludo formal y respetuoso en Kichua, usado especialmente con personas mayores y en contextos ceremoniales.'
    },
    {
      id: '2', 
      type: 'context',
      question: 'En la cultura andina, ¿qué representa el "ayllu"?',
      options: ['Una casa', 'La familia extendida', 'Un animal sagrado', 'Una ceremonia'],
      correctAnswer: 'La familia extendida',
      explanation: 'El ayllu es la base de la organización social andina, incluyendo no solo la familia consanguínea sino también la relación espiritual con la naturaleza y los ancestros.'
    },
    {
      id: '3',
      type: 'matching',
      question: '¿Cuál es el significado de "Pachamama"?',
      options: ['Padre Sol', 'Madre Tierra', 'Hermano Viento', 'Hermana Luna'],
      correctAnswer: 'Madre Tierra',
      explanation: 'Pachamama es la deidad central andina que representa la Madre Tierra, protectora de la naturaleza y fuente de vida para todas las criaturas.'
    }
  ]

  const totalSteps = 2 + lesson.vocabulary.length + exercises.length
  const currentStepNumber = (() => {
    switch (currentStep) {
      case 'intro': return 1
      case 'vocabulary': return 2 + currentVocabIndex
      case 'exercise': return 2 + lesson.vocabulary.length + currentExerciseIndex
      case 'completed': return totalSteps
      default: return 1
    }
  })()

  const handleVocabularyNext = () => {
    if (currentVocabIndex < lesson.vocabulary.length - 1) {
      setCurrentVocabIndex(currentVocabIndex + 1)
    } else {
      setCurrentStep('exercise')
    }
  }

  const handleExerciseSubmit = () => {
    if (selectedAnswer === exercises[currentExerciseIndex].correctAnswer) {
      setCorrectAnswers(correctAnswers + 1)
    }
    setShowExplanation(true)
  }

  const handleExerciseNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
      setSelectedAnswer('')
      setShowExplanation(false)
    } else {
      setCurrentStep('completed')
      // Use functional update to avoid stale closure issues
      setCompletedLessons((currentLessons) => {
        if (!currentLessons.includes(lesson.id)) {
          return [...currentLessons, lesson.id]
        }
        return currentLessons
      })

  const handleComplete = () => {
    onComplete()
  }

  const resetLesson = () => {
    setCurrentStep('intro')
    setCurrentVocabIndex(0)
    setCurrentExerciseIndex(0)
    setSelectedAnswer('')
    setShowExplanation(false)
    setCorrectAnswers(0)
  }

  // Lessons with community impact information
  const hasImpactInfo = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'].includes(lesson.id)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          onClick={onBack} 
          variant="outline" 
          size="sm"
          className="gap-2"
        >
          <ArrowLeft size={16} />
          Volver
        </Button>
        
        <div className="flex-1 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progreso de la lección</span>
            <span>{currentStepNumber} de {totalSteps}</span>
          </div>
          <Progress value={(currentStepNumber / totalSteps) * 100} className="h-2" />
        </div>
      </div>

      {currentStep === 'intro' && (
        <Card className="border-border/50">
          <CardHeader className="text-center space-y-4">
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight">{lesson.title}</CardTitle>
              <CardDescription className="text-lg font-medium text-muted-foreground italic mt-2">
                {lesson.titleKichua}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {hasImpactInfo ? (
              <Tabs defaultValue="context" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="context">Contexto Cultural</TabsTrigger>
                  <TabsTrigger value="impact" className="gap-2">
                    <Heart size={16} />
                    Importancia Actual
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="context">
                  <div className="bg-muted/50 p-6 rounded-lg border border-border/30">
                    <h3 className="font-semibold mb-3 text-primary">Contexto Cultural</h3>
                    <p className="leading-relaxed">{lesson.culturalContext}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="impact">
                  <LessonImpact lessonId={lesson.id} />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="bg-muted/50 p-6 rounded-lg border border-border/30">
                <h3 className="font-semibold mb-3 text-primary">Contexto Cultural</h3>
                <p className="leading-relaxed">{lesson.culturalContext}</p>
              </div>
            )}
            
            <div className="text-center">
              <Button 
                onClick={() => setCurrentStep('vocabulary')} 
                size="lg"
                className="gap-2 font-medium"
              >
                Comenzar Lección
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 'vocabulary' && (
        <Card className="border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Vocabulario</CardTitle>
            <CardDescription>
              Palabra {currentVocabIndex + 1} de {lesson.vocabulary.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold text-primary tracking-wide">
                  {lesson.vocabulary[currentVocabIndex].kichua}
                </h2>
                <p className="text-xl text-muted-foreground">
                  {lesson.vocabulary[currentVocabIndex].spanish}
                </p>
              </div>
              
              <Button variant="outline" size="sm" className="gap-2">
                <Volume2 size={16} />
                Escuchar pronunciación
              </Button>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg border border-border/30">
              <h4 className="font-medium mb-2 text-sm text-muted-foreground">Contexto Cultural</h4>
              <p className="text-sm leading-relaxed">{lesson.vocabulary[currentVocabIndex].context}</p>
            </div>
            
            <div className="text-center">
              <Button onClick={handleVocabularyNext} size="lg" className="gap-2 font-medium">
                {currentVocabIndex < lesson.vocabulary.length - 1 ? 'Siguiente Palabra' : 'Ir a Ejercicios'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 'exercise' && (
        <Card className="border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Ejercicio</CardTitle>
            <CardDescription>
              Pregunta {currentExerciseIndex + 1} de {exercises.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-center">
                {exercises[currentExerciseIndex].question}
              </h3>
              
              <div className="grid gap-3">
                {exercises[currentExerciseIndex].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === option ? "default" : "outline"}
                    onClick={() => setSelectedAnswer(option)}
                    disabled={showExplanation}
                    className="justify-start h-auto p-4 text-left"
                  >
                    {option}
                  </Button>
                ))}
              </div>
              
              {showExplanation && (
                <div className={`p-4 rounded-lg border ${
                  selectedAnswer === exercises[currentExerciseIndex].correctAnswer 
                    ? 'bg-accent/20 border-accent text-accent-foreground' 
                    : 'bg-destructive/20 border-destructive text-destructive-foreground'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={16} weight="fill" />
                    <span className="font-medium">
                      {selectedAnswer === exercises[currentExerciseIndex].correctAnswer ? '¡Correcto!' : 'Incorrecto'}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{exercises[currentExerciseIndex].explanation}</p>
                </div>
              )}
            </div>
            
            <div className="text-center">
              {!showExplanation ? (
                <Button 
                  onClick={handleExerciseSubmit} 
                  disabled={!selectedAnswer}
                  size="lg"
                  className="gap-2 font-medium"
                >
                  Verificar Respuesta
                </Button>
              ) : (
                <Button 
                  onClick={handleExerciseNext} 
                  size="lg"
                  className="gap-2 font-medium"
                >
                  {currentExerciseIndex < exercises.length - 1 ? 'Siguiente Pregunta' : 'Completar Lección'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 'completed' && (
        <Card className="border-border/50">
          <CardHeader className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mx-auto">
              <CheckCircle size={32} weight="fill" className="text-accent" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight">¡Lección Completada!</CardTitle>
              <CardDescription className="text-lg mt-2">
                Has terminado "{lesson.title}"
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg border border-border/30">
                <p className="text-lg font-medium">Resultados del ejercicio</p>
                <p className="text-3xl font-bold text-accent mt-2">
                  {correctAnswers} / {exercises.length}
                </p>
                <p className="text-sm text-muted-foreground mt-1">respuestas correctas</p>
              </div>
              
              <Badge className="bg-accent text-accent-foreground text-sm font-medium px-4 py-2">
                Lección Dominada
              </Badge>
            </div>
            
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={resetLesson} 
                variant="outline"
                className="gap-2"
              >
                <RotateCounterClockwise size={16} />
                Repetir Lección
              </Button>
              <Button 
                onClick={handleComplete}
                size="lg"
                className="gap-2 font-medium"
              >
                Continuar Aprendiendo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}