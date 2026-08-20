document.addEventListener('DOMContentLoaded', () => {
  const players = document.querySelectorAll('.ac-musicplayer');

  players.forEach((player, index) => {
    const audio = player.querySelector('audio');
    const trigger = player.querySelector('input[type="checkbox"]');
    const label = player.querySelector('.ac-playbtn');
    const seekbar = player.querySelector('.ac-seekbar');

    if (!audio || !trigger || !label || !seekbar) return;

    const uniqueId = `ac-trigger-${index}-${Math.random().toString(36).substring(2, 7)}`;
    trigger.id = uniqueId;
    label.setAttribute('for', uniqueId);

    trigger.addEventListener('change', () => {
      if (trigger.checked) {
        document.querySelectorAll('.ac-musicplayer').forEach((otherPlayer) => {
          if (otherPlayer !== player) {
            const otherAudio = otherPlayer.querySelector('audio');
            const otherTrigger = otherPlayer.querySelector('input[type="checkbox"]');
            if (otherAudio) otherAudio.pause();
            if (otherTrigger) otherTrigger.checked = false;
          }
        });

        audio.play().catch((err) => {
          console.warn('Error de reproducción:', err);
          trigger.checked = false;
        });
      } else {
        audio.pause();
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (!audio.duration) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      seekbar.value = pct;
      seekbar.style.background = `linear-gradient(to right, var(--pptradke-c2) ${pct}%, #444 ${pct}%)`;
    });

    seekbar.addEventListener('input', () => {
      if (!audio.duration) return;
      const targetTime = (seekbar.value / 100) * audio.duration;
      audio.currentTime = targetTime;
      seekbar.style.background = `linear-gradient(to right, var(--pptradke-c2) ${seekbar.value}%, #444 ${seekbar.value}%)`;
    });

    audio.addEventListener('ended', () => {
      trigger.checked = false;
      seekbar.value = 0;
      seekbar.style.background = `linear-gradient(to right, var(--pptradke-c2) 0%, #444 0%)`;
    });
  });
});
