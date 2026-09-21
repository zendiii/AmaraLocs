import { Link } from 'react-router-dom'
import BookButton from '../components/BookButton.tsx'
import MediaTile from '../components/MediaTile.tsx'
import { GALLERY } from '../data/portfolio'

export default function Gallery() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Portfolio</p>
      <h1 className="mt-2 text-5xl">Gallery</h1>
      <p className="mt-4 max-w-xl text-mocha">A look at recent work. See something you love? Book it.</p>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {GALLERY.map((item) => (
          <figure key={item.src}>
            <MediaTile item={item} className="aspect-[3/4]" />
            <figcaption className="mt-2 flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
              <span className="font-medium">{item.label}</span>
              {item.service && (
                <Link to={`/book?service=${item.service}`} className="text-xs font-semibold text-clay hover:text-clay-hover">
                  Book this style →
                </Link>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-12 text-center">
        <BookButton>Book your style</BookButton>
      </div>
    </div>
  )
}
