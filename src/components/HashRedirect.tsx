import {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Props = {
  /**
   * Old heading anchor (decoded, without `#`) -> new doc path relative to the
   * site root of the current locale, optionally with `#anchor`.
   * Example: {"роли": "workspace/roles"}.
   */
  map: Record<string, string>;
};

/**
 * Keeps old in-page anchors working after a section moved to its own page.
 * `/settings/workspace#roles` is first redirected to `/workspace` by
 * plugin-client-redirects (the hash is kept), then this component sends the
 * reader to `/workspace/roles`. Unknown anchors stay on the current page.
 */
export default function HashRedirect({map}: Props): null {
  const location = useLocation();
  const base = useBaseUrl('/');
  useEffect(() => {
    if (!location.hash) {
      return;
    }
    let key = location.hash.slice(1);
    try {
      key = decodeURIComponent(key);
    } catch {
      // Keep the raw value.
    }
    const target = map[key];
    if (target) {
      // A full load: an in-app replace during hydration of a page opened
      // with a hash left the next page unrendered.
      window.location.replace(`${base}${target}`);
    }
  }, [location.hash, map, base]);
  return null;
}
