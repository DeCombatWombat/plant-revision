const cards = [
    {
        id: 1,
        images: ["lupine1.jpeg", "lupine2.jpg", "lupine3.jpg"],
        spelling: "Lupinus cv",
        category: "Herbaceous Perennial",
        answer: {
            commonName: "Lupine",
            latinName: "Lupinus cv",
            comments: ""
        }
    },
    {
        id: 2,
        images: ["carex1.jpg", "carex2.jpg", "carex3.webp"],
        spelling: "Carex buchananii",
        category: "Herbaceous Perennial",
        answer: {
            commonName: "Buchanan's Sedge",
            latinName: "Carex buchananii",
            comments: "An evergreen sedge forming mounds of upright to arching, thin, flat leaves with twisted tips and coloured orange to reddish-bronze. Threadlike stems in summer carry brown flower spikes."
        }
    },
    {
        id: 3,
        images: ["pampas1.webp", "pampas2.webp", "pampas3.jpg"],
        spelling: "Cortaderia selloana",
        category: "Herbaceous Perennial",
        answer: {
            commonName: "Pampas grass",
            latinName: "Cortaderia selloana",
            comments: "A densely tufted, clump-forming, perennial grass, 2.5-3m high and 1.8m or more wide, with evergreen, arching, sharply toothed, blue-green leaves, to 2.5m or more long, and erect stems with pyramidal to oblong plume-like panicles, 45-90cm long, of glistening silver-white spikelets about 15mm long and often flushed with pink or purple, in late summer and early autumn."
        }
    },
    {
        id: 4,
        images: ["glm1.webp", "glm2.webp", "glm3.webp"],
        spelling: "Alchemilla mollis",
        category: "Herbaceous Perennial",
        answer: {
            commonName: "Garden Lady's-mantle",
            latinName: "Alchemilla mollis",
            comments: "An herbaceous perennial forming a clump of softly hairy, light green leaves with scalloped and toothed edges. Small, bright yellow flowers are borne in large sprays just above the foliage."
        }
    },
    {
        id: 5,
        images: ["iris1.webp", "iris3.jpg"],
        spelling: "Iris germanica",
        category: "Herbaceous Perennial",
        answer: {
            commonName: "Bearded iris",
            latinName: "Iris germanica",
            comments: "A species of evergreen perennial with sword-shaped, grey-green leaves. Large, showy, fragrant flowers come in a wide range of colours and shades and appear from May to June."
        }
    },
    {
        id: 6,
        images: ["aqui1.webp", "aqui2.webp", "aqui3.webp"],
        spelling: "Aquilegia vulgaris",
        category: "Herbaceous Perennial",
        answer: {
            commonName: "Common columbine",
            latinName: "Aquilegia vulgaris",
            comments: "The wild species is usually blue, with nodding 'bonnets', but many purple, mauve, pink and white colour variants have developed in gardens during its long history in cultivation."
        }
    },
    {
        id: 7,
        images: ["primrose1.webp", "primrose2.webp", "primrose3.webp",],
        spelling: "Primula vulgaris",
        category: "Herbaceous Perennial",
        answer: {
            commonName: "Primrose",
            latinName: "Primula vulgaris",
            comments: "A rosette-forming evergreen or semi-evergreen perennial about 20cm tall, with tongue-shaped, deeply veined, bright green leaves, with scented, usually primrose-yellow flowers 2.5-3.5cm across, in early spring."
        }
    },
        {
        id: 8,
        images: ["rose1.webp", "rose2.webp", "rose3.webp", "rose4.webp", ],
        spelling: "Helleborus x hybridus",
        category: "Herbaceous Perennial",
        answer: {
            commonName: "Hybrid Lenten Rose",
            latinName: "Helleborus x hybridus",
            comments: "A semi-evergreen perennial with divided, glossy, dark green leaves and branched stems bearing bowl-shaped flowers in a range of colours, including white, pink, green, yellow, and purple, sometimes spotted within."
        }
    },
        {
        id: 9,
        images: ["birch1.webp", "birch2.jpg", "birch3.jpg"],
        spelling: "Betula pendula",
        category: "Deciduous Tree",
        answer: {
            commonName: "Silver Birch",
            latinName: "Betula pendula",
            comments: "Elegant, narrowly conical, deciduous tree up to 25m in height, with slender drooping twigs. Peeling white bark, becomes black and rugged at the base. Diamond-shaped, toothed, mid-green leaves, turn yellow in autumn. Flowers in catkins are yellow-brown and appear in early spring."
        }
    },
    {
        id: 10,
        images: ["hornbeam1.jpg", "hornbeam2.webp", "hornbeam3.webp", "hornbeam4.webp"],
        spelling: "Carpinus betulus",
        category: "Deciduous Tree",
        answer: {
            commonName: "European hornbeam",
            latinName: "Carpinus betulus",
            comments: "A large deciduous tree developing a fluted grey trunk. Leaves 5-8cm long, ovate, conspicuously ribbed, turning yellow in autumn. Catkins open in spring, followed by hop-like fruiting catkins to 8cm. Good for woodland settings."
        }
    },
    {
        id: 11,
        images: ["quicksilver1.webp", "quicksilver2.webp"],
        spelling: "Elaeagnus angustifolia",
        category: "Deciduous Tree",
        answer: {
            commonName: "Oleaster 'Quicksilver'",
            latinName: "Elaeagnus angustifolia 'Quick Silver'",
            comments: "A large, deciduous, suckering shrub with silvery shoots, silvery-scaly, ovate leaves and small, fragrant creamy-yellow flowers from silvery buds in summer."
        }
    },
    {
        id: 12,
        images: ["bay1.webp", "bay2.webp", "bay3.webp"],
        spelling: "Laurus nobilis",
        category: "Evergreen Tree",
        answer: {
            commonName: "Bay Tree",
            latinName: "Laurus nobilis",
            comments: "A large, erect, evergreen shrub with aromatic, narrowly ovate, leathery, glossy leaves up to 10cm long and 2-4cm wide. Dried or fresh leaves are popular flavouring in meal preparation. Flowers are 5mm small, pale greenish-yellow, in dense clusters. Fruits are oval berries 1.5 cm in diameter, glossy black when ripe."
        }
    },
    {
        id: 13,
        images: ["olive1.webp", "olive2.webp", "olive3.webp", "olive4.webp", "olive5.webp"],
        spelling: "Olea europaea",
        category: "Evergreen Tree",
        answer: {
            commonName: "Common Olive",
            latinName: "Olea europaea",
            comments: "Has a rugged, much-branched habit and slow growth, eventually 4.5-9m. Leaves are narrowly obovate or oval, to 7.5cm long, leathery, silvery beneath. Very small white flowers are borne in axillary racemes to 5cm long. Many cultivated varieties have been developed from this species, some of which may fruit in UK under favourable conditions."
        }
    },
    {
        id: 14,
        images: ["lavender1.webp", "lavender2.webp"],
        spelling: "Lavandula angustifolia",
        category: "Woody Shrub",
        answer: {
            commonName: "English Lavender",
            latinName: "Lavandula angustifolia",
            comments: "A compact, bushy shrub to 1m tall and rather more wide, with narrow, aromatic, grey-green leaves. In mid- and late summer it produces long, unbranched stalks carrying short, dense spikes of fragrant, pale to deep purple flowers."
        }
    },
        {
        id: 15,
        images: ["box1.webp", "box2.webp", "box3.webp",],
        spelling: "Buxus sempervirens",
        category: "Woody Shrub",
        answer: {
            commonName: "Common Box",
            latinName: "Buxus sempervirens",
            comments: "A large, evergreen shrub or small tree to 5m tall, with glossy, dark green leaves to 3cm long, and small, yellowish flowers in clusters, produced in the leaf axils during spring."
        }
    },
    {
        id: 16,
        images: ["dogwood1.webp", "dogwood2.webp", "dogwood3.webp"],
        spelling: "Cornus sanguinea",
        category: "Woody Shrub",
        answer: {
            commonName: "Common Dogwood",
            latinName: "Cornus sanguinea 'Midwinter Fire",
            comments: "Deciduous shrub about 3m tall, of upright habit, with young shoots reddish-green in winter, ovate mid-green leaves turning deep red in autumn, and in summer, small white flowers in flat clusters, followed by black berries."
        }
    },
    {
        id: 17,
        images: ["japan1.webp", "japan2.webp", "japan3.webp", "japan4.webp"],
        spelling: "Fatsia Japonica",
        category: "Woody Shrub",
        answer: {
            commonName: "Japanese Aralia",
            latinName: "Fatsia Japonica",
            comments: "A medium-sized evergreen shrub of open, spreading habit, with palmately-lobed leaves to 45cm in width and clusters of small, white, globose flowers followed by small, black fruits."
        }
    },
    {
        id: 18,
        images: ["spurge1.webp", "spurge2.webp", "spurge3.webp"],
        spelling: "Euphorbia mellifera",
        category: "Woody Shrub",
        answer: {
            commonName: "Canary Spurge",
            latinName: "Euphorbia mellifera",
            comments: "A dome-shaped evergreen shrub with narrow, bright green leaves with a pale mid-vein, and honey-scented, brownish flower-heads in late spring."
        }
    },
    {
        id: 19,
        images: ["jasmine1.webp", "jasmine2.webp"],
        spelling: "Jasminum nudiflorum",
        category: "Woody Shrub",
        answer: {
            commonName: "Winter Jasmine",
            latinName: "Jasminum nudiflorum",
            comments: "A medium-sized deciduous shrub with long, arching branches. Leaves small, trifoliate. Flowers to 2.5cm in width, bright yellow in winter and spring."
        }
    },
    {
        id: 20,
        images: ["daisy1.webp"],
        spelling: "Bellis perennis",
        category: "Woody Shrub",
        answer: {
            commonName: "Daisy",
            latinName: "Bellis perennis",
            comments: "An evergreen perennial forming rosettes of dark green, spoon-shaped leaves, with small, solitary, yellow-centred, pink-tinged, white daisies in late spring and summer."
        }
    },
    {
        id: 21,
        images: ["buttercup1.webp"],
        spelling: "Ranunculus repens",
        category: "Weed",
        answer: {
            commonName: "Creeping Buttercup",
            latinName: "Ranunculus repens",
            comments: "A native wildflower, spreading by stems that root at the nodes. Leaves are hairy, rough-edged and sometimes have white markings. They are three-lobed, with the central lobe being stalked. Flowers of five-petalled, glossy, yellow cups are borne in summer."
        }
    },
    {
        id: 22,
        images: ["dandelion1.webp", "dandelion2.webp", "dandelion3.webp"],
        spelling: "Taraxacum officinale",
        category: "Weed",
        answer: {
            commonName: "Common Dandelion",
            latinName: "Taraxacum officinale",
            comments: "An evergreen herbaceous perennial with upright purple stems and upright or horizontal dark green basal foliage growing from a main taproot. Yellow flower heads change into silvery, wispy, tufted seed heads or 'dandelion clocks' which disperse in the wind. Considered a weed in some situations, the leaves, flowers and roots can be used in herbal medicine or as food, and the flowers attract pollinators."
        }
    },
    {
        id: 23,
        images: ["nettle1.webp", "nettle2.webp", "nettle3.webp"],
        spelling: "Urtica dioica",
        category: "Weed",
        answer: {
            commonName: "Common Nettle",
            latinName: "Urtica dioica",
            comments: "A herbaceous perennial with spreading roots and creeping horizontal stems able to form large, patches of upright stems, to 1.5m tall, with dark green foliage. Leaves and stems are covered in stinging and non-stinging hairs. Cream or brownish-green, catkin-like flowers are produced from the leaf axils from late spring to early autumn."
        }
    },
    {
        id: 24,
        images: ["ivy1.webp", "ivy2.jpg"],
        spelling: "Hedera colchica",
        category: "Climbing Shrub",
        answer: {
            commonName: "Persian Ivy",
            latinName: "Hedera colchica 'Sulphur Heart'",
            comments: "A vigorous, self-clinging large evergreen climber with leathery, dark green ovate leaves to 20cm in length. Flowers small, yellow-green, inconspicuous, followed by black berries."
        }
    },
    {
        id: 25,
        images: ["hop1.webp", "hop2.webp"],
        spelling: "Humulus lupulus",
        category: "Climbing Shrub",
        answer: {
            commonName: "Common Hop",
            latinName: "Humulus lupulus 'Aureus'",
            comments: "A strong-growing climber bearing yellow, deeply lobed leaves to 15cm in length, and drooping cone-like, greenish-yellow, aromatic female flower clusters followed by attractive hops."
        }
    },
];