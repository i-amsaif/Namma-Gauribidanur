const dynamicRoutes = [
  '/issues/GBN-DEMO-000101',
  '/directory/off-tahsildar-gbn-04',
  '/news/news-ficci-flo-park-01',
  '/events/evt-hn-science-01',
  '/businesses/biz-01',
];

async function testDynamic() {
  let passed = 0;
  for (const r of dynamicRoutes) {
    try {
      const res = await fetch('http://localhost:3005' + r);
      if (res.status === 200) {
        console.log(`[PASS DYNAMIC] ${r} -> HTTP 200 OK`);
        passed++;
      } else {
        console.error(`[FAIL DYNAMIC] ${r} -> HTTP ${res.status}`);
      }
    } catch (e) {
      console.error(`[ERROR DYNAMIC] ${r} ->`, e.message);
    }
  }
  console.log(`Dynamic Route Results: ${passed}/${dynamicRoutes.length} passed.`);
}

testDynamic();
