project from https://www.youtube.com/watch?v=9DDX3US3kss

redux toolkit 
- for getting api to the store - get query -> https://redux-toolkit.js.org/tutorials/rtk-query
- import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
- useGetCryptosQuery with number count (how many item to get) adding by 
query: (count) => createRequest(`/coins?limit=${count}`)

Get window size and react for that except media query in css

``` javascript
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if(screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  ```
