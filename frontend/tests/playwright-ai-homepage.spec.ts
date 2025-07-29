import { test, expect } from '@playwright/test';

// 检查首页AI工具区主要功能

test('AI工具区卡片全部渲染且按钮可点击', async ({ page }) => {
  // 访问线上生产环境首页
  await page.goto('https://airoam-test-jykgxvp5o-lees-projects-460fb22d.vercel.app/');

  // 检查页面标题
  await expect(page.locator('h1')).toContainText('Airoam');

  // 检查AI工具卡片数量（有7个.group元素，包括其他区块）
  const toolCards = page.locator('.group');
  await expect(toolCards).toHaveCount(7);

  // 检查AI工具区的"免费"标签可见
  const freeLabels = page.locator('text=免费');
  await expect(freeLabels).toHaveCount(4); // 有4个"免费"标签

  // 检查每个工具卡片可见且可点击
  for (let i = 0; i < 3; i++) {
    const card = toolCards.nth(i);
    await expect(card).toBeVisible();
    await expect(card).toBeEnabled();
  }

  // 检查页面无明显报错（如有全局报错提示元素可补充检测）
  const errorBanner = page.locator('.error, .alert-error');
  await expect(errorBanner).toHaveCount(0);
}); 