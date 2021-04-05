import { useState, useEffect } from 'react'
import card from '../styles/CharacterCard.module.css'
import Link from 'next/link'
import '@fortawesome/fontawesome-free/css/all.min.css'
const defaultEndpoint = 'https://rickandmortyapi.com/api/character'

export default function Home({ data }) {
  const { info, results: defaultResults = [] } = data
  const [results, updateResults] = useState(defaultResults)
  const [page, updatePage] = useState({ ...info, current: defaultEndpoint })
  const { current } = page

  useEffect(() => {
    if (current === defaultEndpoint) return

    async function request() {
      const res = await fetch(current)
      const nextData = await res.json()
      const { info: nextInfo, results: nextResults = [] } = nextData

      updatePage((prev) => {
        return {
          ...prev,
          ...nextInfo,
        }
      })

      if (!nextInfo?.prev) {
        updateResults(nextResults)
        return
      }

      updateResults((prev) => {
        return [...prev, ...nextResults]
      })
    }
    request()
  }, [current])

  function handleLoadMore() {
    updatePage((prev) => {
      return {
        ...prev,
        current: page?.next,
      }
    })
  }

  function handleOnSubmitSearch(e) {
    e.preventDefault()

    const { currentTarget = {} } = e
    const fields = Array.from(currentTarget?.elements)
    const fieldQuery = fields.find((field) => field.name === 'query')

    const value = fieldQuery.value || ''
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`

    updatePage({
      current: endpoint,
    })
  }

  return (
    <div className={card.cardContainer}>
      <div className={card.wrap}>
        <form className={card.search} onSubmit={handleOnSubmitSearch}>
          <input
            name='query'
            type='search'
            placeholder='Search Character'
            className={card.searchTerm}
          />
          <button className={card.searchButton}>
            <i className='fa fa-search'></i>
          </button>
        </form>
      </div>
      <div className={card.row}>
        {results.map((result) => {
          const { id, name, image, status, gender } = result
          return (
            <div>
              <article key={id} className={card.column}>
                <img src={image} alt={name} />
                <div className={card.cardBody}>
                  <div className={card.section}>
                    <h3 className={card.title}>{name}</h3>
                    <Link href='/character/[id]' as={`/character/${id}`}>
                      <a className={card.profileBtn}>Info</a>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          )
        })}
      </div>
      <a className={card.loadBtn} onClick={handleLoadMore}>
        Load more
      </a>
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(defaultEndpoint)
  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}
