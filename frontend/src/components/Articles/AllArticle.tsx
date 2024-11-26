import React, { FunctionComponent } from 'react';
import { useArticles } from '../../hooks/useArticles';
import FilterComponent from './FilterComponent';
import { newsProviders } from '../../utils';
import ArticleLoopCard from "./ArticleLoopCard";
import { SingleValue } from "react-select";

interface IAllArticleProps {
   type?: 'general' | 'personalized';
}
const AllArticle: FunctionComponent<IAllArticleProps> = ({ type = 'general' }) => {
   const {
      allArticles,
      loading,
      currentPage,
      totalPages,
      keyword,
      setKeyword,
      filterDate,
      setFilterDate,
      providerFilter,
      setProviderFilter,
      handlePageChange,
      monthAgoDate,
      currentDate,
   } = useArticles(type);

   const onKeywordKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter') {
         return;
      }
   };

   const onDateChange = (date: Date | null) => {
      if (date) {
         setFilterDate(date.toISOString().split('T')[0]);
      } else {
         setFilterDate('');
      }
   };

   const onProviderSelection = (newValue: SingleValue<string | { value: string | null; label: string | null; }>) => {
      if (newValue === null) {
         setProviderFilter({ value: null, label: null });
      } else if (typeof newValue === 'string') {
         setProviderFilter({ value: newValue, label: newValue });
      } else {
         setProviderFilter(newValue);
      }
      //setProviderFilter(source);
   };

   return (
      <div>

         <FilterComponent
            keyword={keyword}
            onKeywordChange={(e) => setKeyword(e.target.value)}
            onKeywordKeyDown={onKeywordKeyDown}
            filterDate={filterDate}
            onDateChange={onDateChange}
            providerFilter={providerFilter}
            onProviderSelection={onProviderSelection}
            loading={loading}
            newsProviders={newsProviders()}
            monthAgoDate={monthAgoDate}
            currentDate={currentDate}
         />
         <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!allArticles.length ? 'No posts found.' : allArticles.map((article) => {

               return (
                  <ArticleLoopCard article={article}  key={article.uuid}/>
               );
            })}
         </ul>
         <div className="flex justify-center mt-10">
            <button className="relative inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
               Previous
            </button>
            <div className="hidden sm:flex items-center px-4">
               <p className="text-sm text-gray-500">
                  Showing Page <span className="font-medium">{currentPage}</span> of{' '}
                  <span className="font-medium">{totalPages}</span> pages
               </p>
            </div>
            <button
               className="relative inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
               onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
               Next
            </button>
         </div>
      </div>
   );
};

export default AllArticle;
