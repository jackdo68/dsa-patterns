// List of all pattern files for random selection (excluding wiki/concept files)
const patternFiles = [
  'notes/two-sum.md',
  'notes/3sum.md',
  'notes/container-with-most-water.md',
  'notes/trapping-rain-water.md',
  'notes/fixed-size-find-all-anagrams-in-a-string.md',
  'notes/variable-size-longest-substring-without-repeatin.md',
  'notes/prefix-sum.md',
  'notes/product-except-self.md',
  'notes/kadane-s-algorithm-sub-array-max-sum.md',
  'notes/string-reversal-reverse-string-in-place.md',
  'notes/string-matching-rabin-karp.md',
  'notes/string-to-integer-ascii-to-integer-atoi.md',
  'notes/expanding-from-center-longest-palindrome-substri.md',
  'notes/group-anagrams.md',
  'notes/top-k-frequent-elements.md',
  'notes/longest-consecutive-sequence.md',
  'notes/set-matrix-zeroes.md',
  'notes/spiral-traversal.md',
  'notes/rotate-image-matrix.md',
  'notes/in-place-rotation.md',
  'notes/move-zeroes.md',
  'notes/merge-sorted-array.md',
  'notes/cyclic-sort-find-the-duplicate-number.md',
  'notes/fast-slow-floyd-s-algorithm-cycle-detection.md',
  'notes/in-place-reversal-reverse-linked-list-ii.md',
  'notes/remove-nth-node-from-end-of-list.md',
  'notes/merge-two-sorted-lists.md',
  'notes/reordering-partitioning-rotate-list.md',
  'notes/intersection-detection.md',
  'notes/valid-parentheses.md',
  'notes/min-stack.md',
  'notes/daily-temperatures.md',
  'notes/monotonic-stack-remove-k-digits.md',
  'notes/monotonic-queue-stack-sliding-window-maximum.md',
  'notes/monotonic-deque-disk-space-analysis.md',
  'notes/expression-evaluation-basic-calculator.md',
  'notes/find-min-max-search-in-rotated-sorted-array.md',
  'notes/find-k-closest-elements.md',
  'notes/median-of-2-sorted-arrays.md',
  'notes/dfs-preorder-traversal-same-tree.md',
  'notes/dfs-in-order-traversal-validate-binary-search-tr.md',
  'notes/dfs-postorder-traversal-max-depth.md',
  'notes/path-sum.md',
  'notes/path-sum-ii.md',
  'notes/diameter-of-binary-tree.md',
  'notes/balanced-binary-tree.md',
  'notes/lowest-common-ancestor-lca.md',
  'notes/construct-tree-from-traversals.md',
  'notes/serialize-and-deserialize-binary-tree.md',
  'notes/bfs-binary-tree-level-order-traversal.md',
  'notes/binary-tree-right-side-view.md',
  'notes/bfs-rotting-oranges.md',
  'notes/dfs-number-of-islands.md',
  'notes/dfs-cycle-detection-course-schedule-ii.md',
  'notes/clone-graph.md',
  'notes/word-ladder.md',
  'notes/topological-sort-kahn-algorithm-course-schedul.md',
  'notes/union-find-disjoint-set-number-of-operations-to.md',
  'notes/shortest-path-dijkstra-algorithm-network-delay.md',
  'notes/shortest-path-bellman-ford-algorithm-cheapest.md',
  'notes/shortest-path-floy-warshall-algorithm-minimum.md',
  'notes/minimum-spanning-tree-kruskal-algorithm.md',
  'notes/min-heap.md',
  'notes/merge-k-sorted-lists.md',
  'notes/find-median-from-data-stream.md',
  'notes/kth-largest-element-quick-select.md',
  'notes/task-scheduling.md',
  'notes/subset.md',
  'notes/permutations-unique.md',
  'notes/pruning-combination-sum.md',
  'notes/generate-parentheses-backtracking.md',
  'notes/word-search-grid-backtracking.md',
  'notes/palindrome-partitioning.md',
  'notes/jump-game.md',
  'notes/merge-interval.md',
  'notes/meeting-rooms-ii-interval-heap.md',
  'notes/best-time-to-buy-and-sell-stock.md',
  'notes/best-time-to-buy-and-sell-stock-ii.md',
  'notes/candy.md',
  'notes/climbing-stairs-1d-dp.md',
  'notes/house-robber-1d-dp.md',
  'notes/basic-fibonacci-1d-array.md',
  'notes/0-1-knapsack-target-sum-top-down-approach.md',
  'notes/0-1-knapsack-partition-equal-subset-sum-bottom.md',
  'notes/unbounded-knapsack-coin-change.md',
  'notes/dual-sequence-longest-common-subsequence-lcs.md',
  'notes/edit-distance-dual-sequence-dp.md',
  'notes/dynamic-number-of-subproblems-longest-increasing.md',
  'notes/grid-unique-paths.md',
  'notes/interval-dp-busting-balloons.md',
  'notes/word-break.md',
  'notes/single-number-xor.md',
  'notes/trie-prefix-tree.md',
  'notes/lru-cache.md',
  'notes/fenwick-tree-binary-index-tree.md',
  'notes/merge-sort.md',
  'notes/sort-list.md',
  'notes/quick-sort.md'
];

// Function to get random pattern
function getRandomPattern() {
  const randomIndex = Math.floor(Math.random() * patternFiles.length);
  return '#/' + patternFiles[randomIndex];
}

window.$docsify = {
  name: 'DSA Patterns',
  repo: '',
  loadSidebar: true,
  alias: {
    '/.*/_sidebar.md': '/_sidebar.md'
  },
  subMaxLevel: 2,
  auto2top: true,
  homepage: 'README.md',
  search: {
    placeholder: 'Search patterns...',
    noData: 'No results found',
    depth: 3
  },
  pagination: {
    previousText: 'Previous',
    nextText: 'Next',
    crossChapter: true
  },
  plugins: [
    // Scroll the active sidebar link into view on every page change
    function(hook) {
      hook.doneEach(function() {
        // Defer until Docsify has applied the .active class to the sidebar
        setTimeout(function() {
          const actives = document.querySelectorAll('.sidebar li.active');
          const active = actives[actives.length - 1]; // deepest (leaf) match
          if (active) {
            active.scrollIntoView({ block: 'center', inline: 'nearest' });
          }
        }, 0);
      });
    },
    // Random button plugin
    function(hook) {
      hook.ready(function() {
        // Create random button
        const randomBtn = document.createElement('a');
        randomBtn.id = 'random-btn';
        randomBtn.innerHTML = '🎲 Random';
        randomBtn.title = 'Open a random pattern';
        randomBtn.style.cssText = `
          position: fixed;
          top: 15px;
          right: 20px;
          z-index: 100;
          background: linear-gradient(135deg, #268bd2, #2aa198);
          color: #fff;
          padding: 10px 18px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(38, 139, 210, 0.4);
          transition: all 0.3s ease;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        randomBtn.onmouseover = function() {
          this.style.transform = 'translateY(-2px)';
          this.style.boxShadow = '0 5px 20px rgba(38, 139, 210, 0.5)';
        };
        randomBtn.onmouseout = function() {
          this.style.transform = 'translateY(0)';
          this.style.boxShadow = '0 3px 12px rgba(38, 139, 210, 0.4)';
        };

        randomBtn.onclick = function(e) {
          e.preventDefault();
          window.location.hash = getRandomPattern();
        };

        document.body.appendChild(randomBtn);
      });
    },
    // Tag styling plugin
    function(hook) {
      hook.afterEach(function(html) {
        const topicColors = {
          'array': '#dc322f',
          'matrix': '#c4716c',
          'string': '#cb4b16',
          'linked list': '#b58900',
          'tree': '#859900',
          'graph': '#2aa198',
          'dynamic programming': '#268bd2',
          'dp': '#268bd2',
          'greedy': '#6c71c4',
          'backtracking': '#d33682',
          'sorting': '#dc322f',
          'searching': '#cb4b16',
          'binary search': '#cb4b16',
          'stack': '#b58900',
          'queue': '#859900',
          'heap': '#2aa198',
          'hash map': '#268bd2',
          'hash table': '#268bd2',
          'math': '#6c71c4',
          'bit manipulation': '#d33682',
          'two pointers': '#dc322f',
          'two pointer': '#dc322f',
          'cyclic sort': '#b58900',
          'sliding window': '#cb4b16',
          'dfs': '#859900',
          'bfs': '#2aa198',
          'recursion': '#6c71c4',
          'divide and conquer': '#d33682',
          'knapsack': '#268bd2',
          'trie': '#859900',
          'union find': '#2aa198',
          'topological sort': '#6c71c4',
          'monotonic stack': '#b58900',
          'prefix sum': '#cb4b16',
          'intervals': '#d33682',
          'design': '#839496'
        };

        const difficultyColors = {
          'easy': '#859900',
          'medium': '#b58900',
          'hard': '#dc322f'
        };

        const frequencyColors = {
          'very low': '#586e75',
          'low': '#839496',
          'medium': '#b58900',
          'high': '#cb4b16',
          'very high': '#dc322f'
        };

        // Style Topic field
        html = html.replace(/Topic:\s*([^\n<]+)/gi, function(_match, topics) {
          const topicList = topics.split(',').map(t => t.trim());
          const badges = topicList.map(topic => {
            const color = topicColors[topic.toLowerCase()] || '#839496';
            return `<span style="display: inline-block; background-color: ${color}; color: #fdf6e3; padding: 4px 12px; border-radius: 12px; font-size: 0.85em; font-weight: 500; margin-right: 8px; margin-bottom: 8px;">${topic}</span>`;
          }).join('');
          return `<strong style="color: #93a1a1; margin-right: 10px;">Topic:</strong>${badges}`;
        });

        // Style Difficulty field
        html = html.replace(/Difficulty:\s*([^\n<]+)/gi, function(_match, difficulty) {
          const level = difficulty.trim();
          const color = difficultyColors[level.toLowerCase()] || '#839496';
          const badge = `<span style="display: inline-block; background-color: ${color}; color: #fdf6e3; padding: 4px 12px; border-radius: 12px; font-size: 0.85em; font-weight: 500;">${level}</span>`;
          return `<strong style="color: #93a1a1; margin-right: 10px;">Difficulty:</strong>${badge}`;
        });

        // Style Interview Frequency field
        html = html.replace(/Interview Frequency:\s*([^\n<]+)/gi, function(_match, frequency) {
          const level = frequency.trim();
          const color = frequencyColors[level.toLowerCase()] || '#839496';
          const badge = `<span style="display: inline-block; background-color: ${color}; color: #fdf6e3; padding: 4px 12px; border-radius: 12px; font-size: 0.85em; font-weight: 500;">${level}</span>`;
          return `<strong style="color: #93a1a1; margin-right: 10px;">Interview Frequency:</strong>${badge}`;
        });

        return html;
      });
    }
  ]
}
