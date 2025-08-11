import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Sparkle, Trophy, Calendar } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

export const Dashboard: React.FC = () => {
  const [completedLessons] = useKV<string[]>('completed-lessons', [])
  const [exploredTopics] = useKV<string[]>('explored-topics', [])
  
  const totalLessons = 3
  const totalTopics = 4
  const completionRate = (completedLessons.length / totalLessons) * 100
  const explorationRate = (exploredTopics.length / totalTopics) * 100

  const stats = [
    {
      title: 'Lecciones Completadas',
      value: completedLessons.length,
      total: totalLessons,
      progress: completionRate,
      icon: BookOpen,
      color: 'text-primary'
    },
    {
      title: 'Temas Explorados',
      value: exploredTopics.length,
      total: totalTopics,
      progress: explorationRate,
      icon: Sparkle,
      color: 'text-accent'
    }
  ]

  const achievements = [
    {
      id: 'first-lesson',
      title: 'Primer Paso',
      description: 'Completaste tu primera lección',
      unlocked: completedLessons.length >= 1,
      icon: '🌱'
    },
    {
      id: 'cultural-explorer',
      title: 'Explorador Cultural',
      description: 'Exploraste 2 temas culturales',
      unlocked: exploredTopics.length >= 2,
      icon: '🗺️'
    },
    {
      id: 'dedicated-learner',
      title: 'Estudiante Dedicado',
      description: 'Completaste todas las lecciones básicas',
      unlocked: completedLessons.length >= 2,
      icon: '📚'
    },
    {
      id: 'wisdom-keeper',
      title: 'Guardián de la Sabiduría',
      description: 'Exploraste todos los temas culturales',
      unlocked: exploredTopics.length >= 4,
      icon: '🏔️'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full border border-border/30">
          <Trophy size={20} className="text-accent" />
          <h1 className="text-2xl font-bold tracking-tight">Tu Progreso</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Sigue tu camino de aprendizaje del Kichua y descubrimiento de la cultura andina ancestral.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">{stat.title}</CardTitle>
                  <Icon size={24} className={stat.color} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{stat.value}</span>
                  <span className="text-muted-foreground">de {stat.total}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progreso</span>
                    <span>{Math.round(stat.progress)}%</span>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy size={20} />
            Logros Culturales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-lg border transition-all ${
                  achievement.unlocked 
                    ? 'bg-accent/10 border-accent/30 text-accent-foreground' 
                    : 'bg-muted/30 border-border/30 text-muted-foreground'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </span>
                  <div className="space-y-1 flex-1">
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm leading-relaxed">{achievement.description}</p>
                    {achievement.unlocked && (
                      <Badge className="bg-accent text-accent-foreground text-xs font-medium mt-2">
                        Desbloqueado
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar size={20} />
            Próximos Pasos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedLessons.length < totalLessons && (
              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <h4 className="font-semibold text-primary mb-1">Continúa tu aprendizaje</h4>
                <p className="text-sm text-muted-foreground">
                  Te quedan {totalLessons - completedLessons.length} lecciones por completar
                </p>
              </div>
            )}
            
            {exploredTopics.length < totalTopics && (
              <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                <h4 className="font-semibold text-accent mb-1">Explora la cultura andina</h4>
                <p className="text-sm text-muted-foreground">
                  Descubre {totalTopics - exploredTopics.length} temas culturales más
                </p>
              </div>
            )}
            
            {completedLessons.length === totalLessons && exploredTopics.length === totalTopics && (
              <div className="p-4 bg-secondary/10 border border-secondary/30 rounded-lg text-center">
                <h4 className="font-semibold text-secondary mb-1">¡Felicitaciones!</h4>
                <p className="text-sm text-muted-foreground">
                  Has completado todo el contenido disponible. Sigue practicando para fortalecer tu conocimiento.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}