import LRU from 'lru-cache';

const REPO_CACHE = new LRU({ maxAge: 1000 * 60 * 60 });

export function cache(repo) {
  console.log('repo', repo);
  const full_name = repo.full_name;
  REPO_CACHE.set(full_name, repo);
}

export function get(full_name) {
  return REPO_CACHE.get(full_name);
}

export function cacheArray(repos) {
  repos.forEach((repo) => REPO_CACHE.set(repo));
}
