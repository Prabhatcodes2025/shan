import { useEffect } from 'react';
import { company } from '../data/siteContent';

function usePageMeta(pageTitle) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${company.name}` : company.name;
  }, [pageTitle]);
}

export default usePageMeta;
