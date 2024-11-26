import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../redux/calls/article/getArticles';
import { AppDispatch, RootState } from '../redux/store';
import { defaultSearchDate } from '../utils';
import {fetchPersonalizedArticles} from "../redux/calls/Users/fetchPersonalizedArticles";

export const useArticles = (source: 'general' | 'personalized' = 'general') => {
  const dispatch: AppDispatch = useDispatch();
  const { monthAgoDate, currentDate } = defaultSearchDate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>('');
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<{ value: string | null; label: string | null }>({
    value: '',
    label: '',
  });
  const [providerFilter, setProviderFilter] = useState<{ value: string | null; label: string | null }>({
    value: '',
    label: '',
  });

  // const { all: allArticles, loading, meta } = useSelector((state: RootState) => state.article);
  //
  // useEffect(() => {
  //   dispatch(fetchArticles(currentPage, keyword, filterDate, providerFilter.value));
  // }, [dispatch, currentPage, keyword, filterDate, providerFilter.value]);

   const { all: allArticles, loading, meta } = useSelector((state: RootState) =>
    source === 'general' ? state.article : state.userArticle
  );

  useEffect(() => {
    if (source === 'general') {
      dispatch(fetchArticles(currentPage, keyword, filterDate, providerFilter.value));
    } else {
      dispatch(fetchPersonalizedArticles(currentPage, keyword, filterDate, providerFilter.value));
    }
  }, [dispatch, currentPage, keyword, filterDate, providerFilter.value, source]);


  useEffect(() => {
    if (meta) {
      setCurrentPage(meta.current_page || 1);
    }
  }, [meta]);

  const handlePageChange = useCallback((newPage: number) => {
    if (!loading) setCurrentPage(newPage);
  }, [loading]);

  return {
    allArticles,
    loading,
    currentPage,
    totalPages: meta?.last_page || 1,
    keyword,
    setKeyword,
    filterDate,
    setFilterDate,
    filterCategory,
    setFilterCategory,
    providerFilter,
    setProviderFilter,
    handlePageChange,
    monthAgoDate,
    currentDate,
  };
};
