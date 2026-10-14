const routes = [
  '/',
  '/map',
  '/report',
  '/issues',
  '/directory',
  '/departments',
  '/news',
  '/events',
  '/community',
  '/businesses',
  '/influencers',
  '/profile',
  '/about',
  '/admin'
];

async function testAll() {
  let passed = 0;
  for (const r of routes) {
    try {
      const res = await fetch('http://localhost:3005' + r);
      if (res.status === 200) {
        console.log(`[PASS] ${r} -> HTTP 200 OK`);
        passed++;
      } else {
        console.error(`[FAIL] ${r} -> HTTP ${res.status}`);
      }
    } catch (e) {
      console.error(`[ERROR] ${r} ->`, e.message);
    }
  }
  console.log(`\nTest Result: ${passed}/${routes.length} routes passed successfully.`);
}

testAll();
