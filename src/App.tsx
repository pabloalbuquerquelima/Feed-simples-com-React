import { Header } from './components/Header/Header.js';
import { Sidebar } from './components/Sidebar/Sidebar.js';
import { Post, PostType } from './components/Post/Post.js';


import "./styles/global.css"
import styles from "./App.module.css"


const posts:PostType[] = [
  {
  id: 1,
  author: {
    avatarUrl: "https://github.com/pabloalbuquerquelima.png",
    name: 'Pablo Albuquerque',
    role: 'Web Developer',
  },
  content: [
    { type: 'paragraph', content: 'Fala galera 👋' },
    { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
    { type: 'link', content: 'jane.design/doctorcare' },
  ],
  publishedAt: new Date('2022-05-03 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator @Rocketseat'
    },
    content: [
      { type: 'paragraph', content: 'Fala galera 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-05-10 20:00:00'),
  },

]

export function App() {
  return (
    <div>
      <Header/>

      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          {posts.map(post => {
            return (
              <Post
              key={post.id}
              post={post}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}
