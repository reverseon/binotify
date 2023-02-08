import { useState, useEffect } from 'react';

const useFetch = (url: string, method: string, headers: HeadersInit | undefined, body?: any, refreshControl?: boolean) => {
  const [response, setResponse] = useState<any[] | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const abortController = new AbortController();
    fetch(url, {
        method: method,
        headers: {
            ...headers
        },
        body: body,
        signal: abortController.signal
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw Error(res.statusText);
        }
    }).then(res => {
        setResponse(res);
        setLoading(false);
        setError(null);
    }).catch(err => {
        if (err.name === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            setResponse(null);
            setError(err.message);
            setLoading(false);
        }
    });
  }, [refreshControl]);

  return { response, error, loading };
}

export default useFetch;