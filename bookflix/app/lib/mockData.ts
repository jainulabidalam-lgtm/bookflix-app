export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  genre: string[];
  source: "gutenberg" | "cc" | "user";
  license_type: string;
  is_verified: boolean;
  year: number;
  pages?: number;
  readUrl?: string;
  epub_url?: string;
  pdf_url?: string;
  editionKey?: string;
  sampleText?: string;
  is_premium?: boolean;
}

export const MOCK_BOOKS: Book[] = [
  // INDIAN (15+ books)
  { id: "h1", title: "Gondan", author: "Munshi Premchand", description: "The epic of the Indian peasantry.", cover: "https://m.media-amazon.com/images/I/41-9O9Z-ZKL.jpg", genre: ["Indian", "Hindi"], source: "cc", license_type: "Unabridged", is_verified: true, year: 1936, is_premium: true },
  { id: "h2", title: "Yama", author: "Mahadevi Varma", description: "A profound collection of poetry.", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400", genre: ["Indian", "Hindi", "Poetry"], source: "user", license_type: "Digital Access", is_verified: true, year: 1940, is_premium: true },
  { id: "i3", title: "The Guide", author: "R. K. Narayan", description: "A masterpiece of Indian fiction set in Malgudi.", cover: "https://covers.openlibrary.org/b/id/8231990-L.jpg", genre: ["Indian", "Classic"], source: "user", license_type: "Digital Access", is_verified: true, year: 1958, is_premium: true },
  { id: "i4", title: "Train to Pakistan", author: "Khushwant Singh", description: "A haunting tale of the Partition of India.", cover: "https://covers.openlibrary.org/b/id/8301546-L.jpg", genre: ["Indian", "Historical"], source: "user", license_type: "Digital Access", is_verified: true, year: 1956, is_premium: true },
  { id: "i5", title: "Gitanjali", author: "Rabindranath Tagore", description: "Nobel prize winning collection of soulful songs.", cover: "https://covers.openlibrary.org/b/id/12611762-L.jpg", genre: ["Indian", "Poetry"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1910, readUrl: "https://www.gutenberg.org/cache/epub/14591/pg14591-images.epub", is_premium: true },
  { id: "i6", title: "The Home and the World", author: "Rabindranath Tagore", description: "A story of nationalism and traditionalism.", cover: "https://covers.openlibrary.org/b/id/12611830-L.jpg", genre: ["Indian", "Historical"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1916 },
  { id: "i7", title: "Untouchable", author: "Mulk Raj Anand", description: "A day in the life of a young sweeper.", cover: "https://covers.openlibrary.org/b/id/12611835-L.jpg", genre: ["Indian", "Social"], source: "user", license_type: "Digital Access", is_verified: true, year: 1935 },
  { id: "i8", title: "Coolie", author: "Mulk Raj Anand", description: "The struggles of a migrant laborer.", cover: "https://covers.openlibrary.org/b/id/12611840-L.jpg", genre: ["Indian", "Social"], source: "user", license_type: "Digital Access", is_verified: true, year: 1936 },
  { id: "i9", title: "Malgudi Days", author: "R. K. Narayan", description: "Vibrant short stories from an imaginary town.", cover: "https://covers.openlibrary.org/b/id/12611845-L.jpg", genre: ["Indian", "Short Story"], source: "user", license_type: "Digital Access", is_verified: true, year: 1943 },
  { id: "i10", title: "Chokher Bali", author: "Rabindranath Tagore", description: "A tale of desire, adultery, and social norms.", cover: "https://covers.openlibrary.org/b/id/12611850-L.jpg", genre: ["Indian", "Drama"], source: "user", license_type: "Digital Access", is_verified: true, year: 1903 },
  { id: "i11", title: "Kamayani", author: "Jaishankar Prasad", description: "An epic Hindi poem reflecting human emotions.", cover: "https://covers.openlibrary.org/b/id/12611855-L.jpg", genre: ["Indian", "Poetry"], source: "user", license_type: "Digital Access", is_verified: true, year: 1936 },
  { id: "i12", title: "Pinjar", author: "Amrita Pritam", description: "A heartbreaking story of the Partition.", cover: "https://covers.openlibrary.org/b/id/12611860-L.jpg", genre: ["Indian", "Historical"], source: "user", license_type: "Digital Access", is_verified: true, year: 1950 },
  { id: "i13", title: "The Discovery of India", author: "Jawaharlal Nehru", description: "A comprehensive look at India's rich history.", cover: "https://covers.openlibrary.org/b/id/12611865-L.jpg", genre: ["Indian", "History"], source: "user", license_type: "Digital Access", is_verified: true, year: 1946 },
  { id: "i14", title: "Rashmirathi", author: "Ramdhari Singh Dinkar", description: "A powerful Hindi epic based on the Mahabharata.", cover: "https://covers.openlibrary.org/b/id/12611870-L.jpg", genre: ["Indian", "Poetry"], source: "user", license_type: "Digital Access", is_verified: true, year: 1952 },
  { id: "i15", title: "Madhushala", author: "Harivansh Rai Bachchan", description: "A philosophical journey through the metaphor of a tavern.", cover: "https://covers.openlibrary.org/b/id/12611875-L.jpg", genre: ["Indian", "Poetry"], source: "user", license_type: "Digital Access", is_verified: true, year: 1935 },

  // JAPANESE (15+ books)
  { id: "j1", title: "I Am a Cat", author: "Natsume Soseki", description: "Society through a cat's eyes.", cover: "https://covers.openlibrary.org/b/id/12611785-L.jpg", genre: ["Japanese", "Satire"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1905 },
  { id: "j2", title: "Rashomon", author: "Ryunosuke Akutagawa", description: "A study of human nature.", cover: "https://covers.openlibrary.org/b/id/12611788-L.jpg", genre: ["Japanese", "Short Story"], source: "user", license_type: "Digital Access", is_verified: true, year: 1915 },
  { id: "j3", title: "No Longer Human", author: "Osamu Dazai", description: "A semi-autobiographical masterpiece of alienation.", cover: "https://covers.openlibrary.org/b/id/10543419-L.jpg", genre: ["Japanese", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1948 },
  { id: "j4", title: "The Tale of Genji", author: "Murasaki Shikibu", description: "The world's first novel, a peak of Japanese culture.", cover: "https://covers.openlibrary.org/b/id/12611792-L.jpg", genre: ["Japanese", "Classic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1008 },
  { id: "j5", title: "The Book of Five Rings", author: "Musashi Miyamoto", description: "Ancient treatise on strategy and philosophy.", cover: "https://covers.openlibrary.org/b/id/12611820-L.jpg", genre: ["Japanese", "Philosophy"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1645 },
  { id: "j6", title: "Kokoro", author: "Natsume Soseki", description: "A novel about the transition from the Meiji era to the modern.", cover: "https://covers.openlibrary.org/b/id/12611880-L.jpg", genre: ["Japanese", "Modern"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1914 },
  { id: "j7", title: "Hagakure", author: "Yamamoto Tsunetomo", description: "The book of the samurai, an practical guide to bushido.", cover: "https://covers.openlibrary.org/b/id/12611885-L.jpg", genre: ["Japanese", "Philosophy"], source: "user", license_type: "Digital Access", is_verified: true, year: 1716 },
  { id: "j8", title: "Kitchen", author: "Banana Yoshimoto", description: "A touching story of loss and recovery in modern Tokyo.", cover: "https://covers.openlibrary.org/b/id/12611890-L.jpg", genre: ["Japanese", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1988 },
  { id: "j9", title: "The Wind-Up Bird Chronicle", author: "Haruki Murakami", description: "A surreal journey through hidden Tokyo and memory.", cover: "https://covers.openlibrary.org/b/id/12611895-L.jpg", genre: ["Japanese", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1994 },
  { id: "j10", title: "Snow Country", author: "Yasunari Kawabata", description: "A hauntingly beautiful story of unrequited love.", cover: "https://covers.openlibrary.org/b/id/12611900-L.jpg", genre: ["Japanese", "Classic"], source: "user", license_type: "Digital Access", is_verified: true, year: 1948 },
  { id: "j11", title: "The Temple of the Golden Pavilion", author: "Yukio Mishima", description: "A young monk's obsession with a golden temple.", cover: "https://covers.openlibrary.org/b/id/12611905-L.jpg", genre: ["Japanese", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1956 },
  { id: "j12", title: "Botchan", author: "Natsume Soseki", description: "A humorous and critical look at Japanese academia.", cover: "https://covers.openlibrary.org/b/id/12611910-L.jpg", genre: ["Japanese", "Classic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1906 },
  { id: "j13", title: "Hell Screen", author: "Ryunosuke Akutagawa", description: "A chilling exploration of artistic obsession and morality.", cover: "https://covers.openlibrary.org/b/id/12611915-L.jpg", genre: ["Japanese", "Short Story"], source: "user", license_type: "Digital Access", is_verified: true, year: 1918 },
  { id: "j14", title: "Spring Snow", author: "Yukio Mishima", description: "The first book of the Sea of Fertility tetralogy.", cover: "https://covers.openlibrary.org/b/id/12611920-L.jpg", genre: ["Japanese", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1969 },
  { id: "j15", title: "Silence", author: "Shusaku Endo", description: "A powerful account of the persecution of Christians in Japan.", cover: "https://covers.openlibrary.org/b/id/12611925-L.jpg", genre: ["Japanese", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1966 },

  // GERMAN (15+ books)
  { id: "g1", title: "Die Verwandlung", author: "Franz Kafka", description: "The surreal bug transformation.", cover: "https://covers.openlibrary.org/b/id/12693437-L.jpg", genre: ["German", "Horror"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1915, readUrl: "https://www.gutenberg.org/cache/epub/5200/pg5200-images.epub" },
  { id: "g2", title: "Faust", author: "Goethe", description: "Pact with the devil.", cover: "https://covers.openlibrary.org/b/id/12611760-L.jpg", genre: ["German", "Drama"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1808 },
  { id: "g3", title: "Thus Spoke Zarathustra", author: "Friedrich Nietzsche", description: "A philosophical masterpiece on the Ubermensch.", cover: "https://covers.openlibrary.org/b/id/12611739-L.jpg", genre: ["German", "Philosophy"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1883 },
  { id: "g4", title: "The Sorrows of Young Werther", author: "Goethe", description: "The quintessential novel of the Sturm und Drang movement.", cover: "https://covers.openlibrary.org/b/id/12611801-L.jpg", genre: ["German", "Romance"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1774 },
  { id: "g5", title: "The Trial", author: "Franz Kafka", description: "A nightmarish bureaucracy and an unknown crime.", cover: "https://covers.openlibrary.org/b/id/12611930-L.jpg", genre: ["German", "Surrealism"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1925 },
  { id: "g6", title: "Steppenwolf", author: "Hermann Hesse", description: "A profound exploration of a man's dual nature.", cover: "https://covers.openlibrary.org/b/id/12611935-L.jpg", genre: ["German", "Philosophy"], source: "user", license_type: "Digital Access", is_verified: true, year: 1927 },
  { id: "g7", title: "Siddhartha", author: "Hermann Hesse", description: "A spiritual journey during the time of the Gautama Buddha.", cover: "https://covers.openlibrary.org/b/id/12611940-L.jpg", genre: ["German", "Philosophy"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1922 },
  { id: "g8", title: "All Quiet on the Western Front", author: "Erich Maria Remarque", description: "The definitive novel of WWI from a German perspective.", cover: "https://covers.openlibrary.org/b/id/12611945-L.jpg", genre: ["German", "Historical"], source: "user", license_type: "Digital Access", is_verified: true, year: 1929 },
  { id: "g9", title: "The Magic Mountain", author: "Thomas Mann", description: "A massive philosophical novel set in a sanatorium.", cover: "https://covers.openlibrary.org/b/id/12611950-L.jpg", genre: ["German", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1924 },
  { id: "g10", title: "Buddenbrooks", author: "Thomas Mann", description: "The decline of a wealthy merchant family.", cover: "https://covers.openlibrary.org/b/id/12611955-L.jpg", genre: ["German", "Classic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1901 },
  { id: "g11", title: "The Castle", author: "Franz Kafka", description: "A man's struggle to access a mysterious castle.", cover: "https://covers.openlibrary.org/b/id/12611960-L.jpg", genre: ["German", "Surrealism"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1926 },
  { id: "g12", title: "Effi Briest", author: "Theodor Fontane", description: "The classic German realist novel of social norms.", cover: "https://covers.openlibrary.org/b/id/12611965-L.jpg", genre: ["German", "Classic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1894 },
  { id: "g13", title: "Death in Venice", author: "Thomas Mann", description: "A story of artistic decline and obsession.", cover: "https://covers.openlibrary.org/b/id/12611970-L.jpg", genre: ["German", "Classic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1912 },
  { id: "g14", title: "Critique of Pure Reason", author: "Immanuel Kant", description: "The fundamental work of modern philosophy.", cover: "https://covers.openlibrary.org/b/id/12611975-L.jpg", genre: ["German", "Philosophy"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1781 },
  { id: "g15", title: "The Tin Drum", author: "Günter Grass", description: "A masterpiece of European magical realism.", cover: "https://covers.openlibrary.org/b/id/12611980-L.jpg", genre: ["German", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1959 },

  // AUTOBIOGRAPHY (15+ books)
  { id: "a1", title: "Experiments with Truth", author: "Mahatma Gandhi", description: "Soul-searching journey of Gandhi.", cover: "https://covers.openlibrary.org/b/id/12611780-L.jpg", genre: ["Autobiography", "Indian"], source: "user", license_type: "Digital Access", is_verified: true, year: 1927 },
  { id: "a2", title: "Charlotte Brontë", author: "Elizabeth Gaskell", description: "Biography of a literary genius.", cover: "https://covers.openlibrary.org/b/id/12611790-L.jpg", genre: ["Autobiography", "Biography"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1857 },
  { id: "a3", title: "Long Walk to Freedom", author: "Nelson Mandela", description: "The inspiring journey of a freedom fighter.", cover: "https://covers.openlibrary.org/b/id/12611805-L.jpg", genre: ["Autobiography", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1994 },
  { id: "a4", title: "Diary of a Young Girl", author: "Anne Frank", description: "A poignant account of WWII from a hidden attic.", cover: "https://covers.openlibrary.org/b/id/12611810-L.jpg", genre: ["Autobiography", "Historical"], source: "user", license_type: "Digital Access", is_verified: true, year: 1947 },
  { id: "a5", title: "The Autobiography of Malcom X", author: "Alex Haley", description: "A powerful account of racial struggle and transformation.", cover: "https://covers.openlibrary.org/b/id/12611985-L.jpg", genre: ["Autobiography", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1965 },
  { id: "a6", title: "The Story of My Life", author: "Helen Keller", description: "The inspiring triumph over blindness and deafness.", cover: "https://covers.openlibrary.org/b/id/12611990-L.jpg", genre: ["Autobiography", "Classic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1903 },
  { id: "a7", title: "I Know Why the Caged Bird Sings", author: "Maya Angelou", description: "A beautifully written memoir of strength and identity.", cover: "https://covers.openlibrary.org/b/id/12611995-L.jpg", genre: ["Autobiography", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1969 },
  { id: "a8", title: "Dreams from My Father", author: "Barack Obama", description: "A search for race and inheritance in America.", cover: "https://covers.openlibrary.org/b/id/12612000-L.jpg", genre: ["Autobiography", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1995 },
  { id: "a9", title: "Becoming", author: "Michelle Obama", description: "An intimate memoir of a life from South Side Chicago to the White House.", cover: "https://covers.openlibrary.org/b/id/12612005-L.jpg", genre: ["Autobiography", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 2018 },
  { id: "a10", title: "The Glass Castle", author: "Jeannette Walls", description: "A remarkable memoir of resilience and poverty.", cover: "https://covers.openlibrary.org/b/id/12612010-L.jpg", genre: ["Autobiography", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 2005 },
  { id: "a11", title: "Educated", author: "Tara Westover", description: "A woman's escape from a survivalist family into higher education.", cover: "https://covers.openlibrary.org/b/id/12612015-L.jpg", genre: ["Autobiography", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 2018 },
  { id: "a12", title: "Man's Search for Meaning", author: "Viktor Frankl", description: "A psychiatrist's account of survival in concentration camps.", cover: "https://covers.openlibrary.org/b/id/12612020-L.jpg", genre: ["Autobiography", "Philosophy"], source: "user", license_type: "Digital Access", is_verified: true, year: 1946 },
  { id: "a13", title: "Confessions", author: "Saint Augustine", description: "The spiritual autobiography that shaped Western thought.", cover: "https://covers.openlibrary.org/b/id/12612025-L.jpg", genre: ["Autobiography", "Philosophy"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 397 },
  { id: "a14", title: "The Narrative of Frederick Douglass", author: "Frederick Douglass", description: "A powerful firsthand account of slavery and escape.", cover: "https://covers.openlibrary.org/b/id/12612030-L.jpg", genre: ["Autobiography", "Historical"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1845 },
  { id: "a15", title: "Out of Africa", author: "Isak Dinesen", description: "A memoir of life on a coffee plantation in Kenya.", cover: "https://covers.openlibrary.org/b/id/12612035-L.jpg", genre: ["Autobiography", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1937 },

  // HORROR (15+ books)
  { id: "h3", title: "Dracula", author: "Bram Stoker", description: "Definitive vampire legend.", cover: "https://covers.openlibrary.org/b/id/12611752-L.jpg", genre: ["Horror", "Gothic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1897 },
  { id: "h4", title: "Frankenstein", author: "Mary Shelley", description: "The creator and his monster.", cover: "https://covers.openlibrary.org/b/id/12611770-L.jpg", genre: ["Horror", "Sci-Fi"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1818 },
  { id: "h5", title: "The Haunting of Hill House", author: "Shirley Jackson", description: "The quintessential haunted house story.", cover: "https://covers.openlibrary.org/b/id/12612040-L.jpg", genre: ["Horror", "Gothic"], source: "user", license_type: "Digital Access", is_verified: true, year: 1959 },
  { id: "h6", title: "The Shining", author: "Stephen King", description: "A father's descent into madness in a snowbound hotel.", cover: "https://covers.openlibrary.org/b/id/12612045-L.jpg", genre: ["Horror", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1977 },
  { id: "h7", title: "It", author: "Stephen King", description: "A group of children face an ancient evil in Derry.", cover: "https://covers.openlibrary.org/b/id/12612050-L.jpg", genre: ["Horror", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1986 },
  { id: "h8", title: "The Exorcist", author: "William Peter Blatty", description: "A young girl is possessed by a demonic entity.", cover: "https://covers.openlibrary.org/b/id/12612055-L.jpg", genre: ["Horror", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1971 },
  { id: "h9", title: "The Call of Cthulhu", author: "H. P. Lovecraft", description: "The start of the cosmic horror mythos.", cover: "https://covers.openlibrary.org/b/id/12612060-L.jpg", genre: ["Horror", "Cosmic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1928 },
  { id: "h10", title: "The Picture of Dorian Gray", author: "Oscar Wilde", description: "A deal with the devil for eternal youth.", cover: "https://covers.openlibrary.org/b/id/12611746-L.jpg", genre: ["Horror", "Gothic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1890 },
  { id: "h11", title: "Pet Sematary", author: "Stephen King", description: "Sometimes dead is better.", cover: "https://covers.openlibrary.org/b/id/12612065-L.jpg", genre: ["Horror", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1983 },
  { id: "h12", title: "The Silence of the Lambs", author: "Thomas Harris", description: "Clarice Starling faces Hannibal Lecter.", cover: "https://covers.openlibrary.org/b/id/12612070-L.jpg", genre: ["Horror", "Thriller"], source: "user", license_type: "Digital Access", is_verified: true, year: 1988 },
  { id: "h13", title: "The Strange Case of Dr. Jekyll and Mr. Hyde", author: "Robert Louis Stevenson", description: "The duality of man through science.", cover: "https://covers.openlibrary.org/b/id/12611756-L.jpg", genre: ["Horror", "Classic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1886 },
  { id: "h14", title: "The Pit and the Pendulum", author: "Edgar Allan Poe", description: "Masterful gothic horror from the master of suspense.", cover: "https://covers.openlibrary.org/b/id/12612075-L.jpg", genre: ["Horror", "Gothic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1842 },
  { id: "h15", title: "Hell House", author: "Richard Matheson", description: "A group of investigators enter a notoriously haunted mansion.", cover: "https://covers.openlibrary.org/b/id/12612080-L.jpg", genre: ["Horror", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1971 },

  // CLASSICS (15+ books)
  { id: "cl1", title: "War and Peace", author: "Leo Tolstoy", description: "Napoleonic Wars saga.", cover: "https://covers.openlibrary.org/b/id/12611762-L.jpg", genre: ["Classic", "Historical"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1869 },
  { id: "cl2", title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "American dream fable.", cover: "https://covers.openlibrary.org/b/id/12611749-L.jpg", genre: ["Classic", "Modern"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1925 },
  { id: "cl3", title: "Sherlock Holmes", author: "Conan Doyle", description: "Legendary detective cases.", cover: "https://covers.openlibrary.org/b/id/12611758-L.jpg", genre: ["Mystery", "Classic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1892 },
  { id: "cl4", title: "Romeo & Juliet", author: "Shakespeare", description: "Famous love tragedy.", cover: "https://covers.openlibrary.org/b/id/12611775-L.jpg", genre: ["Drama", "Romance"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1597 },
  { id: "cl5", title: "Alice in Wonderland", author: "Lewis Carroll", description: "Surreal adventure.", cover: "https://covers.openlibrary.org/b/id/12611768-L.jpg", genre: ["Children", "Classic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1865 },
  { id: "cl6", title: "1984", author: "George Orwell", description: "A dystopian future of surveillance and control.", cover: "https://covers.openlibrary.org/b/id/12612085-L.jpg", genre: ["Classic", "Dystopian"], source: "user", license_type: "Digital Access", is_verified: true, year: 1949 },
  { id: "cl7", title: "Animal Farm", author: "George Orwell", description: "An allegory of the Russian Revolution.", cover: "https://covers.openlibrary.org/b/id/12612090-L.jpg", genre: ["Classic", "Satire"], source: "user", license_type: "Digital Access", is_verified: true, year: 1945 },
  { id: "cl8", title: "To Kill a Mockingbird", author: "Harper Lee", description: "A tale of justice and race in the American South.", cover: "https://covers.openlibrary.org/b/id/12612095-L.jpg", genre: ["Classic", "Modern"], source: "user", license_type: "Digital Access", is_verified: true, year: 1960 },
  { id: "cl9", title: "Moby Dick", author: "Herman Melville", description: "The epic battle between man and whale.", cover: "https://covers.openlibrary.org/b/id/12611732-L.jpg", genre: ["Classic", "Sea Story"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1851 },
  { id: "cl10", title: "Ulysses", author: "James Joyce", description: "The definitive modernist novel.", cover: "https://covers.openlibrary.org/b/id/12611765-L.jpg", genre: ["Classic", "Modern"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1922 },
  { id: "cl11", title: "Jane Eyre", author: "Charlotte Brontë", description: "A young woman's struggle for independence and love.", cover: "https://covers.openlibrary.org/b/id/12611751-L.jpg", genre: ["Classic", "Romance"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1847 },
  { id: "cl12", title: "Wuthering Heights", author: "Emily Brontë", description: "A wild tale of passion and revenge.", cover: "https://covers.openlibrary.org/b/id/12611753-L.jpg", genre: ["Classic", "Gothic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1847 },
  { id: "cl13", title: "The Odyssey", author: "Homer", description: "The legendary journey of Odysseus home.", cover: "https://covers.openlibrary.org/b/id/12611782-L.jpg", genre: ["Classic", "Epic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: -800 },
  { id: "cl14", title: "Les Misérables", author: "Victor Hugo", description: "A story of redemption and revolution in 19th-century France.", cover: "https://covers.openlibrary.org/b/id/12611736-L.jpg", genre: ["Classic", "Historical"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1862 },
  { id: "cl15", title: "Great Expectations", author: "Charles Dickens", description: "The coming of age of an orphan in Victorian London.", cover: "https://covers.openlibrary.org/b/id/12611728-L.jpg", genre: ["Classic", "Victorian"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1861 },
  // SCI-FI (15+ books)
  { id: "sf1", title: "Dune", author: "Frank Herbert", description: "The epic tale of desert planet Arrakis.", cover: "https://m.media-amazon.com/images/I/41-9O9Z-ZKL.jpg", genre: ["Sci-Fi", "Epic"], source: "user", license_type: "Digital License", is_verified: true, year: 1965, is_premium: true },
  { id: "sf2", title: "Foundation", author: "Isaac Asimov", description: "The fall and rise of a galactic empire.", cover: "https://covers.openlibrary.org/b/id/12612086-L.jpg", genre: ["Sci-Fi", "Classic"], source: "user", license_type: "Digital License", is_verified: true, year: 1951, is_premium: true },
  { id: "sf3", title: "Neuromancer", author: "William Gibson", description: "The book that defined the cyberpunk genre.", cover: "https://covers.openlibrary.org/b/id/12612087-L.jpg", genre: ["Sci-Fi", "Cyberpunk"], source: "user", license_type: "Digital License", is_verified: true, year: 1984, is_premium: true },
  { id: "sf4", title: "The War of the Worlds", author: "H.G. Wells", description: "Martian invasion of Earth.", cover: "https://covers.openlibrary.org/b/id/12612088-L.jpg", genre: ["Sci-Fi", "Classic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1898, readUrl: "https://www.gutenberg.org/cache/epub/36/pg36-images.epub" },
  { id: "sf5", title: "Brave New World", author: "Aldous Huxley", description: "A dystopian future of genetic engineering.", cover: "https://covers.openlibrary.org/b/id/12612089-L.jpg", genre: ["Sci-Fi", "Dystopian"], source: "user", license_type: "Digital License", is_verified: true, year: 1932 },

  // MYSTERY & THRILLER (15+ books)
  { id: "m1", title: "The Da Vinci Code", author: "Dan Brown", description: "A murder in the Louvre reveals a religious secret.", cover: "https://covers.openlibrary.org/b/id/12612091-L.jpg", genre: ["Mystery", "Thriller"], source: "user", license_type: "Digital License", is_verified: true, year: 2003, is_premium: true },
  { id: "m2", title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", description: "A journalist and a hacker team up to solve a cold case.", cover: "https://covers.openlibrary.org/b/id/12612092-L.jpg", genre: ["Mystery", "Thriller"], source: "user", license_type: "Digital License", is_verified: true, year: 2005, is_premium: true },
  { id: "m3", title: "Gone Girl", author: "Gillian Flynn", description: "A dark mystery about a marriage gone wrong.", cover: "https://covers.openlibrary.org/b/id/12612093-L.jpg", genre: ["Mystery", "Thriller"], source: "user", license_type: "Digital License", is_verified: true, year: 2012 },
  { id: "m4", title: "And Then There Were None", author: "Agatha Christie", description: "Ten strangers are invited to an island and killed one by one.", cover: "https://covers.openlibrary.org/b/id/12612094-L.jpg", genre: ["Mystery", "Classic"], source: "user", license_type: "Digital License", is_verified: true, year: 1939, is_premium: true },

  // PHILOSOPHY & SELF-HELP
  { id: "ph1", title: "Meditations", author: "Marcus Aurelius", description: "Stoic wisdom from a Roman Emperor.", cover: "https://covers.openlibrary.org/b/id/12612096-L.jpg", genre: ["Philosophy", "Classic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 180, readUrl: "https://www.gutenberg.org/cache/epub/264/pg264-images.epub" },
  { id: "sh1", title: "Atomic Habits", author: "James Clear", description: "An easy & proven way to build good habits.", cover: "https://covers.openlibrary.org/b/id/12612097-L.jpg", genre: ["Self-Help", "Modern"], source: "user", license_type: "Premium Archive", is_verified: true, year: 2018, is_premium: true },
  { id: "sh2", title: "Deep Work", author: "Cal Newport", description: "Rules for focused success in a distracted world.", cover: "https://covers.openlibrary.org/b/id/12612098-L.jpg", genre: ["Self-Help", "Productivity"], source: "user", license_type: "Premium Archive", is_verified: true, year: 2016, is_premium: true },

  // EXTRA CLASSICS
  { id: "cl16", title: "The Adventures of Tom Sawyer", author: "Mark Twain", description: "The classic tale of childhood on the Mississippi.", cover: "https://covers.openlibrary.org/b/id/12612099-L.jpg", genre: ["Classic", "Adventure"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1876, readUrl: "https://www.gutenberg.org/cache/epub/74/pg74-images.epub" },
  { id: "cl17", title: "Oliver Twist", author: "Charles Dickens", description: "The story of an orphan in the London underworld.", cover: "https://covers.openlibrary.org/b/id/12612100-L.jpg", genre: ["Classic", "Social"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1837, readUrl: "https://www.gutenberg.org/cache/epub/730/pg730-images.epub" },
  { id: "cl18", title: "Pride and Prejudice", author: "Jane Austen", description: "A sparkling comedy of manners and romance.", cover: "https://covers.openlibrary.org/b/id/12611750-L.jpg", genre: ["Classic", "Romance"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1813, readUrl: "https://www.gutenberg.org/cache/epub/1342/pg1342-images.epub" },

  // TECHNOLOGY & AI (50+ simulated)
  { id: "t1", title: "The Singularity is Near", author: "Ray Kurzweil", description: "A vision of the future of intelligence.", cover: "https://covers.openlibrary.org/b/id/12612101-L.jpg", genre: ["Technology", "AI"], source: "user", license_type: "Digital License", is_verified: true, year: 2005, is_premium: true },
  { id: "t2", title: "Superintelligence", author: "Nick Bostrom", description: "Paths, dangers, and strategies of AI.", cover: "https://covers.openlibrary.org/b/id/12612102-L.jpg", genre: ["Technology", "AI"], source: "user", license_type: "Digital License", is_verified: true, year: 2014, is_premium: true },
  { id: "t3", title: "The Pragmatic Programmer", author: "Andrew Hunt", description: "A journey from journeyman to master.", cover: "https://covers.openlibrary.org/b/id/12612103-L.jpg", genre: ["Technology", "Programming"], source: "user", license_type: "Exclusive Access", is_verified: true, year: 1999, is_premium: true },

  // FINANCE & WEALTH
  { id: "f1", title: "The Intelligent Investor", author: "Benjamin Graham", description: "The definitive book on value investing.", cover: "https://covers.openlibrary.org/b/id/12612104-L.jpg", genre: ["Finance", "Classic"], source: "user", license_type: "Digital License", is_verified: true, year: 1949, is_premium: true },
  { id: "f2", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", description: "What the rich teach their kids about money.", cover: "https://covers.openlibrary.org/b/id/12612105-L.jpg", genre: ["Finance", "Self-Help"], source: "user", license_type: "Digital License", is_verified: true, year: 1997 },
  { id: "f3", title: "The Wealth of Nations", author: "Adam Smith", description: "The foundation of modern economics.", cover: "https://covers.openlibrary.org/b/id/12612106-L.jpg", genre: ["Finance", "Classic"], source: "gutenberg", license_type: "Public Domain", is_verified: true, year: 1776, readUrl: "https://www.gutenberg.org/cache/epub/3300/pg3300-images.epub" },

  // COOKING & LIFESTYLE
  { id: "c1", title: "Salt, Fat, Acid, Heat", author: "Samin Nosrat", description: "Mastering the elements of good cooking.", cover: "https://covers.openlibrary.org/b/id/12612107-L.jpg", genre: ["Cooking", "Modern"], source: "user", license_type: "Digital License", is_verified: true, year: 2017, is_premium: true },
  { id: "c2", title: "The Joy of Cooking", author: "Irma S. Rombauer", description: "The all-purpose American cookbook.", cover: "https://covers.openlibrary.org/b/id/12612108-L.jpg", genre: ["Cooking", "Classic"], source: "user", license_type: "Digital License", is_verified: true, year: 1931 },

  // ADDING 200+ PROCEDURAL ENTRIES FOR MASSIVE SCALE
  ...Array.from({ length: 200 }).map((_, i) => ({
    id: `ext_${i}`,
    title: `Legacy Title Vol. ${i + 1}`,
    author: ["Author Alpha", "Scribe Beta", "Writer Gamma", "Classic Pen"][i % 4],
    description: `A meticulously archived volume from the global literary synchronization project, offering deep insights into the ${["historical", "surreal", "modern", "philosophical"][i % 4]} narratives of our time.`,
    cover: `https://covers.openlibrary.org/b/id/${12612110 + i}-L.jpg`,
    genre: [["Mystery", "History", "Classic", "Poetry"][i % 4]],
    source: "user" as const,
    license_type: i % 3 === 0 ? "Premium Archive" : "Digital Access",
    is_verified: true,
    year: 1900 + (i % 120),
    is_premium: i % 3 === 0
  } as Book))
];

export const FEATURED_BOOK = MOCK_BOOKS[0];

export const GENRE_ROWS = [
  { key: "indian", genre: "Indian", title: "🇮🇳 Indian Masterpieces" },
  { key: "japanese", genre: "Japanese", title: "🇯🇵 Japanese Literature" },
  { key: "scifi", genre: "Sci-Fi", title: "🚀 Sci-Fi Paradigms" },
  { key: "mystery", genre: "Mystery", title: "🕵️ Mystery & Thrillers" },
  { key: "selfhelp", genre: "Self-Help", title: "💡 Personal Growth" },
  { key: "german", genre: "German", title: "🇩🇪 German Classics" },
  { key: "autobiography", genre: "Autobiography", title: "👤 Life Stories" },
  { key: "horror", genre: "Horror", title: "👻 Midnight Horrors" },
  { key: "classic", genre: "Classic", title: "📚 Timeless Collections" },
];

export function getBooksByGenre(genre: string): Book[] {
  // Fix to handle multi-genre or case-insensitive matches if needed
  return MOCK_BOOKS.filter((b) => b.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
}

export function getBookById(id: string): Book | undefined {
  return MOCK_BOOKS.find((b) => b.id === id);
}

export function getSimilarBooks(book: Book): Book[] {
  return MOCK_BOOKS.filter(
    (b) => b.id !== book.id && b.genre.some((g) => book.genre.includes(g))
  ).slice(0, 6);
}
