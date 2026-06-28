import { useState, useEffect } from 'react'
import { getAllPosts } from './services/ArticleService'
import type { ArticleProps } from './models/Article'
import './App.css'

function ArticleViewer() {
  const [articles, setArticles] = useState<ArticleProps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getAllPosts()
        setArticles(data as ArticleProps[])
      } catch (e) {
        setError(`Failed to load articles: ${e}`)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  const formatDate = (ts: unknown) => {
    if (ts && typeof ts === 'object' && 'toDate' in ts && typeof (ts as { toDate: () => Date }).toDate === 'function') {
      return (ts as { toDate: () => Date }).toDate().toLocaleString()
    }
    return '—'
  }

  if (loading) return (
    <div className="article-viewer">
      <h2>Articles:</h2>
      <p className="article-status">Loading...</p>
    </div>
  )

  if (error) return (
    <div className="article-viewer">
      <h2>Articles:</h2>
      <p className="article-status error">{error}</p>
    </div>
  )

  return (
    <div className="article-viewer">
      <h2>Articles:</h2>
      {articles.length === 0 && <p className="article-status">No articles found.</p>}
      {articles.map(article => (
        <div key={article.id} className="article-card">
          <h3>{article.title}</h3>
          <p className="article-meta">
            Status: {article.status} | Creator: {article.creatorId} | {formatDate(article.createdAt)}
          </p>
          <p className="article-content">{article.content}</p>
          {article.tags?.length > 0 && (
            <p className="article-tags">Tags: {article.tags.join(', ')}</p>
          )}
          <div className="replies-placeholder">Replies — coming soon</div>
        </div>
      ))}
    </div>
  )
}

export default ArticleViewer
