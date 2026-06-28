import AddUser from './AddUser'
import CreatePosts from './CreatePosts'
import Login from './Login'
import ArticleViewer from './ArticleViewer'
import './App.css'
function App() {
  return (
    <>
      <h1>BACKEND TESTING</h1>
      <p>WILL BE REPLACED WITH ACTUAL FRONTEND MATTER</p>
      <p>Defualts: {"{"}email: john.doe@example.com; password: 1234567890{"}"}</p>
      <AddUser />
      <CreatePosts />
      <Login />
      <ArticleViewer />
    </>
  )
}

export default App
