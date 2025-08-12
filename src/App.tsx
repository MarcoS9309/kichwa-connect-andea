import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Sparkle, Trophy, Mountain, MusicNote, GraduationCap } from '@phosphor-icons/react'
import { LessonsView } from '@/components/LessonsView'
import { CulturalExplorer } from '@/components/CulturalExplorer'
import { LessonPlayer } from '@/components/LessonPlayer'
import { MusicDancePlayer } from '@/components/MusicDancePlayer'
import { TopicDetail } from '@/components/TopicDetail'
import { Dashboard } from '@/components/Dashboard'
import { EducationalHub } from '@/components/EducationalHub'

type ViewType = 'dashboard' | 'lessons' | 'cultural' | 'lesson-player' | 'music-dance-player' | 'topic-detail' | 'educational'

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

interface CulturalTopic {
  id: string
  title: string
  titleKichua: string
  category: 'tradiciones' | 'ceremonias' | 'agricultura' | 'cosmovision' | 'musica' | 'danza'
  description: string
  content: string
  vocabulary: Array<{
    kichua: string
    spanish: string
    context: string
  }>
  explored: boolean
}

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard')
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<CulturalTopic | null>(null)

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Trophy, view: 'dashboard' as ViewType },
    { id: 'lessons', label: 'Lecciones', icon: BookOpen, view: 'lessons' as ViewType },
    { id: 'cultural', label: 'Cultura', icon: Sparkle, view: 'cultural' as ViewType },
    { id: 'educational', label: 'Academia', icon: GraduationCap, view: 'educational' as ViewType },
  ]

  const handleStartLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson)
    // Check if it's a music or dance lesson (lessons 4-10)
    const musicDanceLessons = ['4', '5', '6', '7', '8', '9', '10']
    if (musicDanceLessons.includes(lesson.id)) {
      setCurrentView('music-dance-player')
    } else {
      setCurrentView('lesson-player')
    }
  }

  const handleExploreTopic = (topic: CulturalTopic) => {
    setSelectedTopic(topic)
    setCurrentView('topic-detail')
  }

  const handleLessonComplete = () => {
    setSelectedLesson(null)
    setCurrentView('lessons')
  }

  const handleBackFromLesson = () => {
    setSelectedLesson(null)
    setCurrentView('lessons')
  }

  const handleBackFromMusicDance = () => {
    setSelectedLesson(null)
    setCurrentView('lessons')
  }

  const handleBackFromTopic = () => {
    setSelectedTopic(null)
    setCurrentView('cultural')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-full border border-primary/20">
                <Mountain size={24} className="text-primary" />
                <h1 className="text-xl font-bold text-primary">Aprendizaje Intercultural</h1>
              </div>
              <Badge variant="secondary" className="text-xs font-medium">
                Universidad Digital
              </Badge>
            </div>
            
            {(currentView === 'dashboard' || currentView === 'lessons' || currentView === 'cultural' || currentView === 'educational') && (
              <nav className="flex items-center gap-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant={currentView === item.view ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentView(item.view)}
                      className="gap-2 font-medium"
                    >
                      <Icon size={16} />
                      {item.label}
                    </Button>
                  )
                })}
              </nav>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' && <Dashboard />}
        
        {currentView === 'lessons' && (
          <LessonsView onStartLesson={handleStartLesson} />
        )}
        
        {currentView === 'cultural' && (
          <CulturalExplorer onExploreTopic={handleExploreTopic} />
        )}
        
        {currentView === 'educational' && (
          <EducationalHub />
        )}
        
        {currentView === 'lesson-player' && selectedLesson && (
          <LessonPlayer 
            lesson={selectedLesson}
            onComplete={handleLessonComplete}
            onBack={handleBackFromLesson}
          />
        )}
        
        {currentView === 'music-dance-player' && selectedLesson && (
          <MusicDancePlayer 
            lesson={{
              ...selectedLesson,
              type: ['4', '6', '7', '9'].includes(selectedLesson.id) ? 'music' : 'dance'
            }}
            onComplete={handleLessonComplete}
            onBack={handleBackFromMusicDance}
          />
        )}
        
        {currentView === 'topic-detail' && selectedTopic && (
          <TopicDetail 
            topic={selectedTopic}
            onBack={handleBackFromTopic}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Mountain size={20} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground font-medium">
                Aprendizaje Intercultural - Preservando la sabiduría ancestral
              </p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Plataforma educativa innovadora para el aprendizaje del Kichua y la cultura andina, 
              desarrollada con metodologías académicas modernas para la preservación del patrimonio cultural.
              Esta iniciativa constituye un modelo experimental de aprendizaje intercultural que integra 
              tecnologías digitales contemporáneas con conocimientos ancestrales, permitiendo validar 
              nuevas metodologías pedagógicas para la revitalización de lenguas originarias y la 
              transmisión de saberes tradicionales en contextos universitarios modernos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App