
import React from 'react';

function News(props) {
  const ht = window.innerHeight - 130
  return (
    <div style={{height: `${ht}px`, overflow: 'scroll'}}>
      <a
        className="twitter-timeline"
        href="https://twitter.com/stella0chaos/lists/space-and-science?ref_src=twsrc%5Etfw"
      >
        A Twitter List by stella0chaos
      </a>
    </div>
  );
}

export default News;
