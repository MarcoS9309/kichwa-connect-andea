import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Leaf, Sun, Users, Sparkle, MusicNote, PersonArmsSpread } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

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

interface TopicCardProps {
  topic: CulturalTopic
  onExplore: (topic: CulturalTopic) => void
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onExplore }) => {
  const categoryIcons = {
    tradiciones: Users,
    ceremonias: Sparkle,
    agricultura: Leaf,
    cosmovision: Sun,
    musica: MusicNote,
    danza: PersonArmsSpread
  }

  const categoryColors = {
    tradiciones: 'bg-secondary text-secondary-foreground',
    ceremonias: 'bg-accent text-accent-foreground',
    agricultura: 'bg-muted text-muted-foreground',
    cosmovision: 'bg-primary text-primary-foreground',
    musica: 'bg-accent text-accent-foreground',
    danza: 'bg-secondary text-secondary-foreground'
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
    },
    {
      id: '5',
      title: 'Instrumentos Ancestrales',
      titleKichua: 'Ñawpa Takina Wakanaykuna',
      category: 'musica',
      description: 'Los instrumentos musicales sagrados y su significado espiritual en la cultura andina.',
      content: 'Los instrumentos andinos trascienden su función musical para convertirse en objetos sagrados que conectan los mundos. La quena imita el viento de las montañas, el charango evoca el canto de las aves, y los tambores replican el latido del corazón de la Pachamama. Cada instrumento tiene su momento ritual específico y su poder de comunicación con las deidades.',
      vocabulary: [
        { kichua: 'Kena', spanish: 'Quena', context: 'Flauta vertical que canaliza el viento sagrado' },
        { kichua: 'Charango', spanish: 'Charango', context: 'Instrumento de cuerdas del altiplano' },
        { kichua: 'Pinkullu', spanish: 'Pinkullo', context: 'Flauta traversa de ceremonias' },
        { kichua: 'Wankara', spanish: 'Tambor grande', context: 'Percusión ceremonial mayor' },
        { kichua: 'Antara', spanish: 'Zampoña', context: 'Flauta de pan andina' }
      ],
      explored: exploredTopics.includes('5')
    },
    {
      id: '6',
      title: 'Huayno: El Alma Musical Andina',
      titleKichua: 'Wayno: Andean Animapa Takinan',
      category: 'musica',
      description: 'El género musical más representativo de los Andes, expresión del sentir popular.',
      content: 'El huayno es el corazón musical de los Andes, un género que expresa las emociones más profundas del pueblo andino: el amor, la nostalgia, la celebración y el dolor. Sus melodías pentatónicas y ritmos característicos han perdurado desde épocas precolombinas, adaptándose a cada región pero manteniendo su esencia espiritual. Es la música del cortejo, del trabajo comunitario y de las festividades sagradas.',
      vocabulary: [
        { kichua: 'Wayno', spanish: 'Huayno', context: 'Género musical tradicional andino' },
        { kichua: 'Takiy', spanish: 'Cantar', context: 'Acto sagrado de entonar melodías' },
        { kichua: 'Kusisqa takiy', spanish: 'Canto alegre', context: 'Música de celebración' },
        { kichua: 'Munasqa', spanish: 'Amado/a', context: 'Tema central del huayno romántico' },
        { kichua: 'Llaqta takiy', spanish: 'Canto del pueblo', context: 'Música de identidad regional' }
      ],
      explored: exploredTopics.includes('6')
    },
    {
      id: '7',
      title: 'Danzas Rituales Andinas',
      titleKichua: 'Hatun Tusuy',
      category: 'danza',
      description: 'Las danzas sagradas que conectan el mundo terrenal con el espiritual.',
      content: 'Las danzas rituales andinas son oraciones corporales que establecen comunicación directa con las deidades y fuerzas naturales. Cada movimiento tiene significado cósmico: los saltos imitan el vuelo del cóndor, los giros representan los ciclos naturales, y las formaciones grupales recrean las constelaciones. Estas danzas se ejecutan en momentos específicos del calendario ceremonial, siendo fundamentales para mantener el equilibrio entre los mundos.',
      vocabulary: [
        { kichua: 'Hatun tusuy', spanish: 'Danza sagrada', context: 'Baile ceremonial de gran importancia' },
        { kichua: 'Qhapaq tusuy', spanish: 'Danza real', context: 'Baile de la nobleza incaica' },
        { kichua: 'Apu tusuy', spanish: 'Danza de los apus', context: 'Baile de veneración a las montañas' },
        { kichua: 'Chakana tusuy', spanish: 'Danza de la cruz andina', context: 'Baile del orden cósmico' },
        { kichua: 'Inti tusuy', spanish: 'Danza del sol', context: 'Baile de adoración solar' }
      ],
      explored: exploredTopics.includes('7')
    },
    {
      id: '8',
      title: 'La Marinera Andina',
      titleKichua: 'Marinera Andina',
      category: 'danza',
      description: 'Danza de cortejo que fusiona elementos indígenas, españoles y criollos.',
      content: 'La marinera andina representa la síntesis cultural del mestizaje, donde los movimientos indígenas del cortejo ritual se fusionan con elementos españoles y africanos. Esta danza de galanteo cuenta una historia de seducción donde el varón corteja a la mujer con movimientos que evocan el vuelo del cóndor y la gracia de la vicuña. El uso del pañuelo simboliza la comunicación sutil entre los danzantes, mientras que los pasos recrean los rituales ancestrales de fertilidad.',
      vocabulary: [
        { kichua: 'Marinera', spanish: 'Marinera', context: 'Danza de cortejo mestiza' },
        { kichua: 'Sipas tusuy', spanish: 'Danza de la doncella', context: 'Movimientos femeninos de coqueteo' },
        { kichua: 'Qhari tusuy', spanish: 'Danza del varón', context: 'Movimientos masculinos de galanteo' },
        { kichua: 'Pañuelo tusuy', spanish: 'Danza del pañuelo', context: 'Comunicación a través del textil' },
        { kichua: 'Zapateo', spanish: 'Zapateo', context: 'Percusión con los pies' }
      ],
      explored: exploredTopics.includes('8')
    },
    {
      id: '9',
      title: 'Cantos de Trabajo Comunitario',
      titleKichua: 'Ayni Takiykuna',
      category: 'musica',
      description: 'La música que acompaña las faenas comunales y fortalece los lazos sociales.',
      content: 'Los cantos de trabajo comunitario son expresiones musicales que sincronizan las labores colectivas y fortalecen la cohesión social. Durante la siembra, la cosecha, la construcción de casas o la limpieza de acequias, estos cantos marcan el ritmo del trabajo, narran historias ancestrales y mantienen el espíritu comunitario. La música transforma el esfuerzo físico en celebración espiritual, recordando que el trabajo es sagrado cuando se realiza en armonía con la comunidad y la naturaleza.',
      vocabulary: [
        { kichua: 'Ayni takiy', spanish: 'Canto de reciprocidad', context: 'Música del trabajo comunitario' },
        { kichua: 'Minka takiy', spanish: 'Canto de la minga', context: 'Música de la faena colectiva' },
        { kichua: 'Tarpuy takiy', spanish: 'Canto de siembra', context: 'Música del tiempo de sembrar' },
        { kichua: 'Pallay takiy', spanish: 'Canto de cosecha', context: 'Música del tiempo de cosechar' },
        { kichua: 'Ruway takiy', spanish: 'Canto de hacer', context: 'Música del trabajo manual' }
      ],
      explored: exploredTopics.includes('9')
    },
    {
      id: '10',
      title: 'Danzas de los Animales Sagrados',
      titleKichua: 'Hatun Uywakunap Tusuynin',
      category: 'danza',
      description: 'Danzas que honran y representan a los animales considerados sagrados en la cultura andina.',
      content: 'Las danzas de animales sagrados son representaciones coreográficas que honran a las criaturas que los andinos consideran intermediarios entre los mundos. La danza del cóndor imita al mensajero de los apus, la danza de la llama celebra al animal que carga las ofrendas a los dioses, y la danza del puma representa la fuerza y sabiduría del felino sagrado. Estas danzas no solo imitan movimientos animales, sino que invocan sus espíritus protectores y sus cualidades especiales.',
      vocabulary: [
        { kichua: 'Kuntur tusuy', spanish: 'Danza del cóndor', context: 'Baile del ave sagrada de las alturas' },
        { kichua: 'Llama tusuy', spanish: 'Danza de la llama', context: 'Baile del animal sagrado de carga' },
        { kichua: 'Puma tusuy', spanish: 'Danza del puma', context: 'Baile del felino de poder' },
        { kichua: 'Vicuña tusuy', spanish: 'Danza de la vicuña', context: 'Baile del animal de fibra sagrada' },
        { kichua: 'Uywakuna', spanish: 'Animales', context: 'Seres vivientes sagrados' }
      ],
      explored: exploredTopics.includes('10')
    }
  ]

  const categories = [
    { key: 'tradiciones', label: 'Tradiciones', icon: Users },
    { key: 'ceremonias', label: 'Ceremonias', icon: Sparkle },
    { key: 'agricultura', label: 'Agricultura', icon: Leaf },
    { key: 'cosmovision', label: 'Cosmovisión', icon: Sun },
    { key: 'musica', label: 'Música', icon: MusicNote },
    { key: 'danza', label: 'Danza', icon: PersonArmsSpread }
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
        <TabsList className="grid w-full grid-cols-7 mb-6">
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