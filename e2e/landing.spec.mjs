import { test, expect } from '@playwright/test';

async function approachStory(page) {
  await page.evaluate(() => {
    const story=document.querySelector('[data-scroll-story]');
    scrollTo({top:story.getBoundingClientRect().top+scrollY-innerHeight+160,behavior:'instant'});
  });
  await expect(page.locator('[data-scroll-story]')).toHaveAttribute('data-scroll-mode',/desktop|mobile|reduced/);
}

test('language changes in place, updates metadata and survives a reload', async ({ page }) => {
  await page.goto('/');
  const url = page.url();
  await page.locator('[data-language="en"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toContainText('Your application, online.');
  await expect(page).toHaveTitle(/Self-hosted PaaS in Rust/);
  await expect(page.locator('nav')).toHaveAttribute('aria-label','Main navigation');
  expect(page.url()).toBe(url);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  await page.locator('[data-language="es"]').click();
  await expect(page.locator('h1')).toContainText('Tu aplicación, en línea.');
  await expect(page).toHaveTitle(/PaaS self-hosted en Rust/);
  expect(page.url()).toBe(url);
});

test('illustrative apps and CI failure controls communicate real state changes', async ({ page }) => {
  await page.goto('/');
  for (const name of ['booking','internal','website']) {
    await page.locator(`[data-example="${name}"]`).click();
    await expect(page.locator(`[data-panel="${name}"]`)).toBeVisible();
    await expect(page.locator(`[data-example="${name}"]`)).toHaveAttribute('aria-pressed','true');
    await expect(page.locator('[data-panel]:not([hidden])')).toHaveCount(1);
  }
  await page.locator('[data-ci="blocked"]').click();
  await expect(page.locator('[data-ci-state]')).toHaveAttribute('data-ci-state','blocked');
  await expect(page.locator('[data-ci-result="blocked"]')).toBeVisible();
  await expect(page.locator('[data-ci-result="passed"]')).toBeHidden();
  await page.locator('[data-ci="passed"]').click();
  await expect(page.locator('[data-ci-result="passed"]')).toBeVisible();
  await page.locator('summary').first().focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('details').first()).toHaveAttribute('open','');
  await page.keyboard.press('Enter');
  await expect(page.locator('details').first()).not.toHaveAttribute('open','');
});

test('scroll drives the diagram and reduced motion restores a static reading layout', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const story = page.locator('[data-scroll-story]');
  await approachStory(page);
  await expect(story).toHaveAttribute('data-scroll-mode', 'desktop');
  await expect(story).toHaveClass(/is-scroll-ready/);
  const initial = await page.locator('[data-story-wire="0"]').evaluate(e => parseFloat(getComputedStyle(e).strokeDashoffset));
  expect(initial).toBeGreaterThan(0);
  await page.evaluate(() => document.fonts.ready);
  const geometry = await story.evaluate(e => ({top:e.getBoundingClientRect().top + scrollY,height:e.offsetHeight}));
  await page.evaluate(y => window.scrollTo({top:y,behavior:'instant'}), geometry.top + 100);
  await expect(story).toHaveAttribute('data-story-phase', /[012]/);
  const pinnedTop = await page.locator('.story-figure').evaluate(e => e.getBoundingClientRect().top);
  await page.evaluate(y => window.scrollTo({top:y,behavior:'instant'}), geometry.top + geometry.height * .55);
  await expect(story).toHaveAttribute('data-story-phase', /[12]/);
  await expect.poll(() => page.locator('[data-story-wire="0"]').evaluate(e => parseFloat(getComputedStyle(e).strokeDashoffset))).toBeLessThan(initial);
  expect(Math.abs(await page.locator('.story-figure').evaluate(e=>e.getBoundingClientRect().top) - pinnedTop)).toBeLessThan(5);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(story).not.toHaveClass(/is-scroll-ready/);
  await expect(story).toHaveAttribute('data-scroll-mode', 'reduced');
});

test('both languages and every example fit mobile, tablet and desktop', async ({ page }) => {
  for (const width of [320,390,768,1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    for (const language of ['en','es']) {
      await page.locator(`[data-language="${language}"]`).click();
      for (const name of ['website','booking','internal']) {
        await page.locator(`[data-example="${name}"]`).click();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});

test('no JavaScript keeps essential content visible without dead enhancement controls', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4333/');
  await expect(page.locator('#inside')).toBeVisible();
  await expect(page.locator('#builder')).toBeVisible();
  await expect(page.locator('[data-panel="website"]')).toBeVisible();
  await expect(page.locator('[data-language="en"]')).toBeHidden();
  await expect(page.locator('[data-example="booking"]')).toBeHidden();
  await expect(page.locator('.is-scroll-ready')).toHaveCount(0);
  await expect(page.locator('[data-wave-toggle]')).toBeHidden();
  await expect(page.locator('[data-wave-column]').first()).toHaveCSS('animation-name','none');
  await context.close();
});

test('language works when local storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } }));
  await page.goto('/');
  await page.locator('[data-language="en"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang','en');
});

test('capture the final design in both languages and target viewports', async ({ page }) => {
  for (const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]) {
    await page.setViewportSize({width,height});
    await page.goto('/');
    for (const language of ['es','en']) {
      await page.locator(`[data-language="${language}"]`).click();
      await page.locator('[data-example="website"]').click();
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `.impeccable/review/${name}${language === 'en' ? '-en' : ''}.png`, fullPage: true });
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/');
  const story = page.locator('[data-scroll-story]');
  await approachStory(page);
  await expect(story).toHaveAttribute('data-scroll-mode','desktop');
  await page.evaluate(()=>document.fonts.ready);
  const scene = await story.evaluate(e=>({top:e.getBoundingClientRect().top+scrollY,height:e.offsetHeight}));
  for (const [name,progress,phase] of [['checks',.5,'1'],['people',.9,'2']]) {
    const y=scene.top-120+(scene.height-1000*.9+120)*progress;
    await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);
    await expect(story).toHaveAttribute('data-story-phase',phase);
    const wire = phase==='1' ? '0' : '1';
    await expect.poll(()=>page.locator(`[data-story-wire="${wire}"]`).evaluate(e=>parseFloat(getComputedStyle(e).strokeDashoffset))).toBeLessThan(1);
    await expect(page.locator(`[data-story-step="${phase}"] [data-enter]`)).toHaveAttribute('data-enter-state','visible');
    if (phase==='2') await expect(page.locator('[data-story-step="2"] h3')).toBeInViewport();
    await page.screenshot({path:`.impeccable/review/story-${name}.png`});
  }

});

test('progressive entrances appear on scroll and never hide keyboard focus or reduced-motion content', async ({page})=>{
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/');
  await approachStory(page);
  const copy=page.locator('.builder-copy');
  await expect(copy).toHaveAttribute('data-enter-state','pending');
  await copy.scrollIntoViewIfNeeded();
  await expect(copy).toHaveAttribute('data-enter-state','visible');
  await expect.poll(()=>copy.evaluate(e=>Number(getComputedStyle(e).opacity))).toBe(1);
  await page.goto('/');
  await approachStory(page);
  await expect(copy).toHaveAttribute('data-enter-state','pending');
  await page.locator('.builder-copy a').focus();
  await expect(copy).toHaveAttribute('data-enter-state','visible');
  await expect.poll(()=>copy.evaluate(e=>Number(getComputedStyle(e).opacity))).toBe(1);
  await page.goto('/');
  await approachStory(page);
  await expect(copy).toHaveAttribute('data-enter-state','pending');
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('[data-enter-state="pending"]')).toHaveCount(0);
  await expect.poll(()=>copy.evaluate(e=>Number(getComputedStyle(e).opacity))).toBe(1);
});

test('scroll stage has inset spacing and a noninteractive backdrop without breaking sticky flow', async ({page}) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({width, height: 1000});
    await page.goto('/');
    const stage = page.locator('#why');
    const backdrop = stage.locator('.scroll-backdrop');
    await expect(backdrop).toHaveAttribute('aria-hidden', 'true');
    const metrics = await stage.evaluate(e => {
      const s = getComputedStyle(e);
      const content = e.querySelector('.scroll-stage-content').getBoundingClientRect();
      const rect = e.getBoundingClientRect();
      return {left:rect.left, right:innerWidth-rect.right, inset:content.left-rect.left,
        top:parseFloat(s.paddingTop), bottom:parseFloat(s.paddingBottom),
        overflow:s.overflowY, background:s.backgroundColor,
        interactive:getComputedStyle(e.querySelector('.scroll-backdrop')).pointerEvents};
    });
    expect(metrics.left).toBeGreaterThanOrEqual(8);
    expect(metrics.right).toBeGreaterThanOrEqual(8);
    expect(metrics.inset).toBeGreaterThanOrEqual(16);
    expect(metrics.top).toBeGreaterThanOrEqual(48);
    expect(metrics.top).toBeLessThanOrEqual(80);
    expect(metrics.bottom).toBeGreaterThanOrEqual(48);
    expect(metrics.overflow).toBe('visible');
    expect(metrics.background).toBe('rgb(36, 58, 84)');
    expect(metrics.interactive).toBe('none');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('wave undulates only while visible, can be paused, and respects reduced motion', async ({page}) => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/');
  const stage = page.locator('#why');
  const column = page.locator('[data-wave-column]').first();
  await expect(stage).toHaveAttribute('data-wave-state','paused');
  await expect(column).toHaveCSS('animation-duration','6s');
  await stage.locator('.chapter-heading').scrollIntoViewIfNeeded();
  await expect(stage).toHaveAttribute('data-wave-state','running');
  await page.evaluate(()=>scrollTo({top:document.querySelector('#why').getBoundingClientRect().top+scrollY-24,behavior:'instant'}));
  await page.waitForTimeout(800);
  const rect = await stage.boundingBox();
  const clip = {x:rect.x+32,y:rect.y+300,width:200,height:60};
  const pixels = await page.screenshot({clip});
  await expect.poll(async()=>!(await page.screenshot({clip})).equals(pixels)).toBe(true);
  const transform = await column.evaluate(e=>getComputedStyle(e).transform);
  await expect.poll(()=>column.evaluate(e=>getComputedStyle(e).transform)).not.toBe(transform);
  await page.getByRole('button',{name:'Pausar ola',exact:true}).click();
  await expect(stage).toHaveAttribute('data-wave-state','paused');
  await page.locator('[data-language="en"]').click();
  await stage.locator('.chapter-heading').scrollIntoViewIfNeeded();
  const resume = page.getByRole('button',{name:'Resume wave',exact:true});
  await expect(resume).toBeVisible();
  const stopped = await column.evaluate(e=>getComputedStyle(e).transform);
  await page.waitForTimeout(200);
  expect(await column.evaluate(e=>getComputedStyle(e).transform)).toBe(stopped);
  await resume.click();
  await expect(stage).toHaveAttribute('data-wave-state','running');
  await page.locator('h1').scrollIntoViewIfNeeded();
  await expect(stage).toHaveAttribute('data-wave-state','paused');
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('[data-wave-toggle]')).toBeHidden();
  await expect(column).toHaveCSS('animation-name','none');
  await page.setViewportSize({width:390,height:844});
  await page.emulateMedia({reducedMotion:'no-preference'});
  await stage.locator('.chapter-heading').scrollIntoViewIfNeeded();
  await expect(stage).toHaveAttribute('data-wave-state','running');
  await page.evaluate(()=>scrollTo({top:document.querySelector('#why').getBoundingClientRect().top+scrollY-24,behavior:'instant'}));
  await page.waitForTimeout(800);
  const mobileRect = await stage.boundingBox();
  const mobileClip = {x:mobileRect.x+20,y:mobileRect.y+300,width:300,height:16};
  const mobilePixels = await page.screenshot({clip:mobileClip});
  await expect.poll(async()=>!(await page.screenshot({clip:mobileClip})).equals(mobilePixels)).toBe(true);
});

test('scroll engine is requested only when the below-fold story approaches', async ({page}) => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  for (const [width,height] of [[390,844],[1440,900]]) {
    await page.setViewportSize({width,height});
    const chunks = [];
    const track = request => { if (request.url().includes('/_astro/scroll-story.')) chunks.push(request.url()); };
    page.on('request',track);
    await page.goto('/',{waitUntil:'networkidle'});
    expect(chunks).toHaveLength(0);
    const story=page.locator('[data-scroll-story]');
    await story.scrollIntoViewIfNeeded();
    await expect.poll(()=>chunks.length).toBe(1);
    await expect(story).toHaveAttribute('data-scroll-mode',width >= 900 ? 'desktop' : 'mobile');
    page.off('request',track);
  }
});
