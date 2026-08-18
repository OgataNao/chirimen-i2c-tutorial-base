function makeCounter(cfg){
  const state = { value: 0, interval: cfg.initial, initial: cfg.initial, timer: null };

  function tick(){
    state.value = (state.value + 1) % 101;   // 0〜100 でカウントアップ
    cfg.countEl.textContent = state.value;
  }

  function restart(){
    if(state.timer) clearInterval(state.timer);
    state.timer = setInterval(tick, state.interval);
  }

  cfg.btnEl.addEventListener('click', () => {
    const halved = state.interval / 2;
    if(halved <= 100){
      state.interval = state.initial;   // 100ms以下になったら初期速度に戻す
    } else {
      state.interval = halved;          // それ以外は半分の周期に高速化
    }
    restart();
  });

  restart();
}

makeCounter({ initial: 1000, /* ...カウンターA用の要素... */ });
makeCounter({ initial: 2000, /* ...カウンターB用の要素... */ });