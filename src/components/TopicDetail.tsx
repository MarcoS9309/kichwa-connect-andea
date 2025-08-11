import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, BookOpen, CheckCircle, Volume2 } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

interface CulturalTopic {
  id: string
  title: string
  titleKichua: string
  category: 'tradiciones' | 'ceremonias' | 'agricultura' | 'cosmovision'
  description: string
  content: string
  vocabulary: Array<{
    kichua: string
    spanish: string
    context: string
  }>
}

interface TopicDetailProps {
  topic: CulturalTopic
  onBack: () => void
}

export const TopicDetail: React.FC<TopicDetailProps> = ({ topic, onBack }) => {
  const [exploredTopics, setExploredTopics] = useKV<string[]>('explored-topics', [])
  
  const markAsExplored = () => {
    const newExploredTopics = [...exploredTopics]
    if (!newExploredTopics.includes(topic.id)) {
      newExploredTopics.push(topic.id)
      setExploredTopics(newExploredTopics)
    }
  }

  const categoryColors = {
    tradiciones: 'bg-secondary text-secondary-foreground',
    ceremonias: 'bg-accent text-accent-foreground',
    agricultura: 'bg-muted text-muted-foreground',
    cosmovision: 'bg-primary text-primary-foreground'
  }

  const isExplored = exploredTopics.includes(topic.id)

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
          Volver al Explorador
        </Button>
        
        <Badge className={`${categoryColors[topic.category]} text-sm font-medium`}>
          {topic.category}
        </Badge>
        
        {isExplored && (
          <Badge className="bg-accent/20 text-accent border-accent text-sm font-medium gap-1">
            <CheckCircle size={14} weight="fill" />
            Explorado
          </Badge>
        )}
      </div>

      <Card className="border-border/50">
        <CardHeader className="text-center space-y-4">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">{topic.title}</CardTitle>
            <CardDescription className="text-xl font-medium text-muted-foreground italic mt-2">
              {topic.titleKichua}
            </CardDescription>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            {topic.description}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="bg-muted/50 p-6 rounded-lg border border-border/30">
            <h3 className="font-semibold mb-4 text-primary flex items-center gap-2">
              <BookOpen size={20} />
              Conocimiento Ancestral
            </h3>
            <p className="leading-relaxed text-foreground">{topic.content}</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center">Vocabulario Cultural</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              {topic.vocabulary.map((item, index) => (
                <Card key={index} className="border-border/30 hover:shadow-md transition-shadow">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <h4 className="text-lg font-semibold text-primary tracking-wide">
                          {item.kichua}
                        </h4>
                        <p className="text-muted-foreground font-medium">
                          {item.spanish}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-60 hover:opacity-100">
                        <Volume2 size={16} />
                      </Button>
                    </div>
                    
                    <div className="bg-muted/30 p-3 rounded border border-border/20">
                      <p className="text-sm leading-relaxed">{item.context}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center pt-4">
            {!isExplored ? (
              <Button 
                onClick={markAsExplored}
                size="lg"
                className="gap-2 font-medium"
              >
                <CheckCircle size={20} />
                Marcar como Explorado
              </Button>
            ) : (
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full border border-accent/30">
                <CheckCircle size={16} weight="fill" />
                <span className="font-medium">Tema Explorado</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}