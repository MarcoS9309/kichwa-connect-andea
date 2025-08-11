import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Leaf, Sun, Users, Sparkle } from '@phosphor-icons/react'
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
  explored: boolean
}

interface TopicCardProps {
  topic: CulturalTopic
  onExplore: (topic: CulturalTopic) => void
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onExplore }) => {
  const categoryIcons = {
    tradiciones: Users,
    ceremonias: Sparkle,
    agricultura: Leaf,
    cosmovision: Sun
  }

  const categoryColors = {
    tradiciones: 'bg-secondary text-secondary-foreground',
    ceremonias: 'bg-accent text-accent-foreground',
    agricultura: 'bg-muted text-muted-foreground',
    cosmovision: 'bg-primary text-primary-foreground'
  }

  const Icon = categoryIcons[topic.category]

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg font-semibold tracking-tight">{topic.title}</CardTitle>
            <p className="text-sm font-medium text-muted-foreground italic">{topic.titleKichua}</p>
          </div>
          <Badge className={`ml-2 ${categoryColors[topic.category]} text-xs font-medium`}>
            <Icon size={12} className="mr-1" />
            {topic.category}
          </Badge>
        </div>
        <CardDescription className="text-sm leading-relaxed pt-1">
          {topic.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon size={16} />
              <span>{topic.vocabulary.length} conceptos</span>
            </div>
            
            <Button 
              onClick={() => onExplore(topic)}
              size="sm"
              className="gap-2 font-medium"
              variant={topic.explored ? "secondary" : "default"}
            >
              {topic.explored ? 'Revisitar' : 'Explorar'}
            </Button>
          </div>
          
          {topic.explored && (
            <div className="flex items-center gap-2 text-accent">
              <Sparkle size={16} weight="fill" />
              <span className="text-sm font-medium">Explorado</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface CulturalExplorerProps {
  onExploreTopic: (topic: CulturalTopic) => void
}

export const CulturalExplorer: React.FC<CulturalExplorerProps> = ({ onExploreTopic }) => {
  const [exploredTopics, setExploredTopics] = useKV<string[]>('explored-topics', [])

  const topics: CulturalTopic[] = [
    {
      id: '1',
      title: 'Tejidos Tradicionales',
      titleKichua: 'Ñawiy',
      category: 'tradiciones',
      description: 'El arte ancestral del tejido como expresión cultural y medio de comunicación.',
      content: 'Los tejidos andinos son mucho más que vestimenta; son libros de historia que narran la cosmología, geografía y tradiciones familiares. Cada patrón, color y técnica tiene un significado profundo conectado con la identidad cultural.',
      vocabulary: [
        { kichua: 'Ñawiy', spanish: 'Tejer', context: 'Arte ancestral de crear textiles' },
        { kichua: 'Away', spanish: 'Tejido', context: 'Producto final del arte textil' },
        { kichua: 'Pallana', spanish: 'Recoger/Seleccionar', context: 'Proceso de selección de fibras' },
        { kichua: 'Millma', spanish: 'Lana', context: 'Fibra principal para tejidos' }
      ],
      explored: exploredTopics.includes('1')
    },
    {
      id: '2',
      title: 'Inti Raymi - Fiesta del Sol',
      titleKichua: 'Inti Raymi',
      category: 'ceremonias',
      description: 'La ceremonia más importante del calendario andino en honor al Sol.',
      content: 'El Inti Raymi marca el solsticio de invierno y celebra la renovación cósmica. Esta ceremonia ancestral fortalece la conexión entre la comunidad, la naturaleza y las deidades, siendo fundamental para el equilibrio espiritual andino.',
      vocabulary: [
        { kichua: 'Inti', spanish: 'Sol', context: 'Deidad principal del panteón andino' },
        { kichua: 'Raymi', spanish: 'Fiesta/Celebración', context: 'Ceremonia sagrada' },
        { kichua: 'Qapaq', spanish: 'Rico/Poderoso', context: 'Referencia a la magnificencia solar' },
        { kichua: 'Chakana', spanish: 'Cruz Andina', context: 'Símbolo sagrado de ordenamiento cósmico' }
      ],
      explored: exploredTopics.includes('2')
    },
    {
      id: '3',
      title: 'Agricultura en Terrazas',
      titleKichua: 'Andenes',
      category: 'agricultura',
      description: 'Sistema milenario de cultivo que maximiza el uso del terreno montañoso.',
      content: 'Los andenes representan la ingeniería agrícola más sofisticada del mundo andino, permitiendo cultivar en laderas pronunciadas mientras controlan la erosión y optimizan el riego. Esta tecnología ancestral es un ejemplo de sostenibilidad.',
      vocabulary: [
        { kichua: 'Andenes', spanish: 'Terrazas agrícolas', context: 'Tecnología ancestral de cultivo' },
        { kichua: 'Tarpuy', spanish: 'Sembrar', context: 'Acto sagrado de plantar' },
        { kichua: 'Papa', spanish: 'Papa/Patata', context: 'Tubérculo sagrado originario' },
        { kichua: 'Yaku', spanish: 'Agua', context: 'Elemento vital para la agricultura' }
      ],
      explored: exploredTopics.includes('3')
    },
    {
      id: '4',
      title: 'Los Tres Mundos',
      titleKichua: 'Kimsa Pacha',
      category: 'cosmovision',
      description: 'La concepción andina del universo dividido en tres planos de existencia.',
      content: 'La cosmovisión andina organiza el universo en Hanaq Pacha (mundo de arriba), Kay Pacha (mundo de aquí) y Uray Pacha (mundo de abajo). Esta estructura cosmológica guía la vida espiritual, social y práctica de las comunidades.',
      vocabulary: [
        { kichua: 'Hanaq Pacha', spanish: 'Mundo de arriba', context: 'Plano celestial de las deidades' },
        { kichua: 'Kay Pacha', spanish: 'Mundo de aquí', context: 'Plano terrenal donde vivimos' },
        { kichua: 'Uray Pacha', spanish: 'Mundo de abajo', context: 'Plano subterráneo de los ancestros' },
        { kichua: 'Pacha', spanish: 'Mundo/Tiempo/Espacio', context: 'Concepto integral de realidad' }
      ],
      explored: exploredTopics.includes('4')
    }
  ]

  const categories = [
    { key: 'tradiciones', label: 'Tradiciones', icon: Users },
    { key: 'ceremonias', label: 'Ceremonias', icon: Sparkle },
    { key: 'agricultura', label: 'Agricultura', icon: Leaf },
    { key: 'cosmovision', label: 'Cosmovisión', icon: Sun }
  ] as const

  const getTopicsByCategory = (category: string) => 
    topics.filter(topic => category === 'all' || topic.category === category)

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full border border-border/30">
          <Sparkle size={20} className="text-accent" />
          <h1 className="text-2xl font-bold tracking-tight">Explorador Cultural</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Descubre la riqueza de las tradiciones andinas y su profunda conexión con la naturaleza y la comunidad.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="all" className="gap-2">
            <Sparkle size={16} />
            Todos
          </TabsTrigger>
          {categories.map(({ key, label, icon: Icon }) => (
            <TabsTrigger key={key} value={key} className="gap-2">
              <Icon size={16} />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <TopicCard 
                key={topic.id} 
                topic={topic} 
                onExplore={onExploreTopic}
              />
            ))}
          </div>
        </TabsContent>

        {categories.map(({ key }) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getTopicsByCategory(key).map((topic) => (
                <TopicCard 
                  key={topic.id} 
                  topic={topic} 
                  onExplore={onExploreTopic}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}