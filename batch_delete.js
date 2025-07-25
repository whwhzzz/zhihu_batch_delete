(async function deleteZhihuAnswers() {
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  let count = 0;
  let max_count = 30

  while (count < max_count) {
    // 每次重新获取当前页面的所有卡片
    const cards = document.querySelectorAll('.CreationManage-CreationCard');
    if (cards.length === 0) {
      console.log('🚫 没有剩余内容可删除，退出');
      break;
    }

    const card = cards[0]; // 总是只操作第一篇
    try {
      const moreBtn = card.querySelector('button span svg.Zi--More')?.closest('button');
      if (!moreBtn) {
        console.warn('未找到“更多”按钮，跳过');
        continue;
      }
      moreBtn.click();
      await sleep(500);

      const deleteBtn = Array.from(document.querySelectorAll('button.Menu-item'))
        .find(btn => btn.innerText.trim() === '删除');
      if (!deleteBtn) {
        console.warn('未找到“删除”按钮，跳过');
        continue;
      }

      deleteBtn.click();
      await sleep(500);

      const confirmBtn = document.querySelector('.Modal button.Button--primary');
      if (confirmBtn) {
        confirmBtn.click();
        count++;
        console.log(`✅ 第 ${count} 篇已删除`);
      } else {
        console.warn('未找到确认按钮');
      }

      await sleep(1500);
    } catch (e) {
      console.error('❌ 删除失败:', e);
      continue;
    }
  }

  console.log(`🎉 共删除 ${count} 篇内容，任务结束`);
})();
