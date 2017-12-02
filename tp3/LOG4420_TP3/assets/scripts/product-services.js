'use strict';

var ProductServices = (function() {
    var self = {};
    var data;
    /**
     * obtenir la liste des produits. Il faut que le serveur soit fonctionnel
     */
    self.getRequest = function() {
        return [
            {
              "id": 1,
              "name": "Apple TV",
              "price": 249.99,
              "image": "apple-tv.png",
              "category": "computers",
              "description": "L'Apple TV est un appareil conçu par Apple qui permet la communication sans fil entre un ordinateur et un téléviseur. Il est disponible depuis fin mars 2007 dans sa première version.L'appareil ressemble alors par sa forme à un Mac mini, bien qu'il ne fasse que la moitié de sa hauteur. Il communique par réseau sans fil ou Ethernet, avec un appareil iOS ou avec un ordinateur (sous Mac OS X ou sous Windows) par le biais du logiciel iTunes, permettant ainsi de diffuser le contenu vidéo et audio sur le téléviseur, via éventuellement un amplificateur audio-vidéo. (<a href='https://fr.wikipedia.org/wiki/Apple_TV' target='_blank'>Wikipédia</a>)",
              "features": [
                "Processeur Apple A8",
                "Mémoire vide de 2Go",
                "Stockage de 32 ou 64 Go en mémoire flash",
                "Connectivités: USB Type-C, HDMI, récepteur infrarouge",
                "Réseau: Wi-Fi (802.11a/b/g/n/ac), 10/100 Ethernet, Bluetooth, AirPlay"
              ]
            },
            {
              "id": 2,
              "name": "Canon EOS 5D Mark II",
              "price": 2999.99,
              "image": "camera-1.png",
              "category": "cameras",
              "description": "Le Canon EOS 5D Mark II est un appareil photographique reflex numérique à objectif interchangeable équipé d'un capteur 24×36 de 21 mégapixels, annoncé le 17 septembre 2008 et retiré du catalogue Canon japonais à la fin décembre 2012 puis du catalogue français à la mi-mars 2013. Il permet, pour la première fois sur ce type d'appareil, de filmer en vidéo HD 1080p (1920×1080 pixels). Canon a reçu, pour ce boîtier, le prix TIPA (Technical Image Press Association) du meilleur reflex « expert » en 2009. (<a href='https://fr.wikipedia.org/wiki/Canon_EOS_5D_Mark_II' target='_blank'>Wikipédia</a>)",
              "features": [
                "Reflex numérique en alliage de magnésium à objectifs interchangeables de monture EF",
                "Capteur CMOS avec matrice de Bayer (RVB) de 35,8 × 23,9 mm (format 24×36)",
                "Processeur d'images DIGIC 4",
                "21 millions de pixels. L'information de couleur est codée sur 14 bits",
                "Ratio image 3:2"
              ]
            },
            {
              "id": 3,
              "name": "Nikon D7000",
              "price": 549.99,
              "image": "camera-2.png",
              "category": "cameras",
              "description": "Le Nikon D7000 est un appareil photographique reflex numérique, présenté par Nikon le 15 septembre 2010. Il remplace le D90 comme reflex de milieu de gamme. (<a href='https://fr.wikipedia.org/wiki/Nikon_D7000' target='_blank'>Wikipédia</a>)",
              "features": [
                "Capteur CMOS 16,2 mégapixels au format Nikon DX",
                "Processeur d'images Nikon EXPEED 2",
                "Vidéo full HD (1920x1080)",
                "Mise au point autofocus 39 points avec quatre modes zone AF, dont le suivi 3D",
                "Sensibilité ISO du capteur allant de 100 à 25600 ISO (position Hi2)"
              ]
            },
            {
              "id": 4,
              "name": "Canon PowerShot SD1300",
              "price": 299.99,
              "image": "camera-3.png",
              "category": "cameras",
              "description": "Tout est une question de puissance du contraste. Des couleurs qui défient les conventions. Des courbes douces et élégantes qui fusionnent l'art et la technologie en un appareil photo conçu pour être source d'inspiration. L'appareil photo PowerShot SD1300 IS Digital ELPH capte votre monde tout autant qu'il exprime votre originalité au moyen d'innovations audacieuses, dont un remarquable rendement par faible luminosité. Tout semble correct. Prenez-le en main… et tout semble effectivement bien. (<a href='http://canon.ca/inetCA/fr/products?m=gp&pid=3521#_010' target='_blank'>Canon Canada</a>)",
              "features": [
                "Fonction AUTO intelligente qui choisit les réglages appropriés parmi 18 situations de prise de vues prédéfinies.",
                "Résolution de 12,1 mégapixels simplifiant l'impression d'images grand format nettes et détaillées.",
                "Écran ACL clair et lumineux aux couleurs pures de 2,7 po pour prendre et visionner les images.",
                "Couleurs nettes et stylisées convenant à toute personnalité.",
                "Prise de vues en mode faible éclairage dans des conditions de faible luminosité."
              ]
            },
            {
              "id": 5,
              "name": "Portable",
              "price": 699.99,
              "image": "laptop-1.png",
              "category": "computers",
              "description": "Portable idéal pour un étudiant ou un joueur occasionnel. L'ordinateur dispose de plusieurs ports (HDMI, USB, Ethernet, etc.) pouvant accueillir plusieurs périphériques. Le portable est équipé d'un processus i5 de troisième génération, de 8 Go de mémoire et d'un disque dur SSD de 256 Go. De plus, ce portable est équipé d'une carte graphique NVIDIA GeForce GTX 660M.",
              "features": [
                "Processus i5 de troisième génération",
                "8 Go de RAM",
                "Disque SSD de 256 Go",
                "Ports HDMI, USB et Ethernet",
                "Carte graphique NVIDIA GeForce GTX 660M"
              ]
            },
            {
              "id": 6,
              "name": "Portable professionnel",
              "price": 599.99,
              "image": "laptop-2.png",
              "category": "computers",
              "description": "Portable professionnel idéal pour le travail à la maison ou dans une petite entreprise. L’ordinateur dispose d’un grand nombre de ports (HDMI, VGA, USB, Ethernet, etc.) ce qui facilite le branchement de différents périphériques. Le portable est équipé d’un processeur i5 de troisième génération, de 8 Go de RAM et d’un disque dur SSD de 256 Go.",
              "features": [
                "Processus i5 de troisième génération",
                "8 Go de RAM",
                "Disque SSD de 256 Go",
                "Ports HDMI, VGA, USB, Ethernet et Firewire",
                "Construction robuste"
              ]
            },
            {
              "id": 7,
              "name": "iMac 27\"",
              "price": 2299.99,
              "image": "mac.png",
              "category": "computers",
              "description": "L'iMac est la gamme d’ordinateurs tout-en-un grand public d’Apple depuis 1998. Les premiers modèles, à écran cathodique, ont relancé la marque Apple à la fin des années 1990. Six générations de cet ordinateur de bureau ont été commercialisées en quatorze ans, du premier modèle coloré aux formes rondes au tout-en-un à écran plat 16:9 (27 pouces) aujourd'hui en vente. Les appareils sont animés par les systèmes d'exploitations d'Apple : Mac OS 9 pour les premières générations, puis macOS. (<a href='https://fr.wikipedia.org/wiki/IMac' target='_blank'>Wikipédia</a>)",
              "features": [
                "Processeur quadricœur Intel Core i5 à 3,2 GHz (jusqu’à 3,6 GHz avec Turbo Boost)",
                "8 Go (2 x 4 Go) de mémoire DDR3 à 1 867 MHz",
                "Disque dur de 1 To à 7 200 tr/min",
                "Processeur graphique AMD Radeon R9 M380 avec 2 Go de mémoire GDDR5",
                "Caméra FaceTime HD"
              ]
            },
            {
              "id": 8,
              "name": "Moniteur 19\"",
              "price": 149.99,
              "image": "monitor.png",
              "category": "screens",
              "description": "Moniteur LCD de 19 pouces pouvant être branché via VGA, HDMI et DVI. Cet écran est facilement ajustable dans plusieurs positions, afin de maximiser le confort de l’utilisateur.",
              "features": [
                "Écran de 19\"",
                "Entrées VGA, HDMI et DVI",
                "Ajustable dans plusieurs positions",
                "Écran mat limitant les reflets",
                "Garantie 2 ans"
              ]
            },
            {
              "id": 9,
              "name": "Console PS3",
              "price": 349.99,
              "image": "ps3.png",
              "category": "consoles",
              "description": "La PlayStation 3 (abrégé officiellement PS3) est une console de jeux vidéo de septième génération commercialisée par Sony. Elle est sortie le 11 novembre 2006 au Japon, le 17 novembre 2006 en Amérique du Nord et le 23 mars 2007 en Europe. Elle succède à la PlayStation 2 et concurrence la Xbox 360, et indirectement la Wii. (<a href='https://fr.wikipedia.org/wiki/PlayStation_3' target='_blank'>Wikipédia</a>)",
              "features": [
                "Processeur Cell cadencé à 3.2 Ghz",
                "Processeur graphique Nvidia à 550 Mhz",
                "256 Mo de mémoire principale XDR à 3.2 Ghz / 256 Mo de mémoire vidéo GDDR3 à 700 Mhz",
                "Lecteur Blu-Ray (54 Go maximum)",
                "Disque dur détachable (2 pouces et demi)"
              ]
            },
            {
              "id": 10,
              "name": "Téléviseur 50\"",
              "price": 899.99,
              "image": "tv.png",
              "category": "screens",
              "description": "Téléviseur de 50\" possédant une résolution de 1080p. Ce téléviseur est parfait pour visionner vos séries préférées. De plus, cette télévision possède trois prises HDMI et un support natif pour la technologie <em>Chromecast</em>.",
              "features": [
                "Résolution de 1920 x 1080",
                "Rapport d'image de 16:9",
                "Trois ports HDMI",
                "Intègre la technologie <em>Chromecast</em>"
              ]
            },
            {
              "id": 11,
              "name": "Console Wii",
              "price": 199.99,
              "image": "wii.png",
              "category": "consoles",
              "description": "La Wii est une console de jeux vidéo de salon du fabricant japonais Nintendo. Console de la septième génération, tout comme la Xbox 360 et la PlayStation 3 avec lesquelles elle est en rivalité, elle est la console de salon la plus vendue de sa génération et a comme particularité d'utiliser un accéléromètre capable de détecter la position, l'orientation et les mouvements dans l'espace de la manette. (<a href='https://fr.wikipedia.org/wiki/Wii' target='_blank'>Wikipédia</a>)",
              "features": [
                "Microprocesseur Unit Broadway Power PC",
                "Processeur graphique (AMD) ATI Hollywood cadencé à 243 MHz",
                "Mémoire de 24 Mo de 1TSRAM + 64 Mo de 1TSRAM de MoSys Technology",
                "Lecteur DVD Panasonic Matsushita Electronic",
                "2 Prises USB 2.0, Sortie Vidéo/Audio YUV et Sortie RVB"
              ]
            },
            {
              "id": 12,
              "name": "Console Xbox One",
              "price": 399.99,
              "image": "xbox.png",
              "category": "consoles",
              "description": "La Xbox One est une console de jeux vidéo de huitième génération développée par Microsoft. Dévoilée le 21 mai 2013, elle succède à la Xbox 360 et se place en concurrence frontale avec la PlayStation 4 de Sony, et plus indirectement avec la Wii U de Nintendo. Elle est disponible depuis le 22 novembre 2013 dans treize pays et depuis septembre 2014 dans vingt-six autres pays. D'abord uniquement commercialisée avec Kinect, Microsoft propose la console seule à partir du 9 juin 2014. (<a href='https://fr.wikipedia.org/wiki/Xbox_One' target='_blank'>Wikipédia</a>)",
              "features": [
                "CPU : x86 AMD 8 coeurs (1,6 GHz d'après les estimations)",
                "GPU : 1,23 TFLOPS, a priori proche de l'AMD RADEON 7790",
                "8 Go de RAM DDR3 à 68,3 Go/s",
                "Lecteur Blu-ray",
                "Disque dur 500 Go"
              ]
            },
            {
              "id": 13,
              "name": "Manette Xbox 360",
              "price": 29.99,
              "image": "xbox-controller.png",
              "category": "consoles",
              "description": "Manette pouvant être branchée à une console Xbox 360 et un PC. Cette manette vous permettra de jouer à vos jeux vidéo préférés. De plus, cette manette est sans fil et comporte un port pour casque d'écoute.",
              "features": [
                "Manette sans fil 2.4GHz avec adapteur USB",
                "Compacte et ergonomique",
                "Port pour casque d'écoute pour Xbox Live"
              ]
            }
          ]
          
        // return $.get("./data/products.json");
    }
    /**
     * Initialiser notre data 
     */
    self.initData = function(d) {
        data = d;
    }
    /**
     * Obtenir un produit selon un id
     * @param {id} - parametre Id pour chercher un produit
     */
    self.getProduct = function(id) {
        var myProduct = null;
        data.some(product => {
            if (product.id == id) {
                myProduct = product;
                return true;
            }
        });
        return myProduct;
    }

    return self;
})();

ProductServices.Cart = (function() {
    var self = {};
    /**
     * Sauvgearder le produit et mettre a jour la quantite dans le panier
     * @param {id} - identifiant pour le produit
     * @param {quantity} - le nombre ditem interesse
     */
    self.saveAddedProduct = function(id, quantity) {
        var productToSave = _getProductToSave(id, quantity);
        _updateCart(productToSave);
        HeaderServices.addToCartCount(quantity);
    }
    /**
     * Obtenir le produit a sauvegarder
     * @param {id} - identifiant pour le produit
     * @param {quantity} - le nombre ditem interesse
     */
    function _getProductToSave(id, quantity) {
        var product = ProductServices.getProduct(id);

        return {
            id: parseInt(id),
            name: product.name || "",
            price: product.price.toFixed(2).replace(".", ",") || "",
            quantity: parseInt(quantity)
        };
    }
    /**
     * Mettre le panier a jour
     * @param {productToSave} - Produit a sauvegarder
     */
    function _updateCart(productToSave) {
        var cart = _getCart();
        _addToCart(cart, productToSave);
        localStorage['cart'] = JSON.stringify(cart);
    }
    /**
     * Obtenir le panier
     */
    function _getCart() {
        var localCartData = localStorage['cart'];
        if (localCartData == null || localCartData == []) {
            return [];
        } 
        return JSON.parse(localCartData);
    }
    /**
     * Mettre le panier a jour
     * @param {cart} - Le panier en question
     * @param {productToSave} - Produit a sauvegarder
     */
    function _addToCart(cart, productToSave) {
        var productPresent = false;
        cart.some(product => {
            if (product.id === productToSave.id) {
                productPresent = true;
                product.quantity += productToSave.quantity;
                return true;
            }
        });
        if (!productPresent) {
            cart.push(productToSave);
            cart.sort((a, b) => {
                return a.name > b.name;
            });
        }
    }

    return self;
})();
