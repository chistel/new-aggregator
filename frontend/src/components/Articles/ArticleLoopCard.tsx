import React, { FunctionComponent } from 'react';
import { formattedDate, formatToDateTime } from '../../utils';
import { Link } from 'react-router-dom';
import { Article } from '../../types';

interface IArticleLoopCardProps {
  article: Article;
}

const ArticleLoopCard: FunctionComponent<IArticleLoopCardProps> = ({ article }) => {
  const { published_at, title, description, uuid, image_url } = article;

  return (
    <li className="py-12">
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 gap-x-7">
          <div>
            <img src={image_url as string} className="h-auto max-w-full" alt={title} />
          </div>
          <div className="space-y-5 xl:col-span-3">
            <h2 className="text-2xl font-bold leading-8 tracking-tight">
              <a href={`/article/single/${uuid}`} className="text-gray-900 dark:text-gray-100" dangerouslySetInnerHTML={{ __html: title }} />
            </h2>
            <div className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={published_at as string}>{formatToDateTime(published_at as string)}</time>
            </div>
            <div className="prose max-w-none text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: description }} />
            <div className="text-base font-medium leading-6">
              <Link to={`/article/single/${uuid}`} className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                Read more &rarr;
              </Link>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};

export default ArticleLoopCard;
