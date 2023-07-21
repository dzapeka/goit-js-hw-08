import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const VIMEO_PLAYER_CURRENT_TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const currentTime = localStorage.getItem(VIMEO_PLAYER_CURRENT_TIME_KEY) || 0;
player.setCurrentTime(currentTime);

player.on(
  'timeupdate',
  throttle(() => {
    player.getCurrentTime().then(seconds => {
      localStorage.setItem(VIMEO_PLAYER_CURRENT_TIME_KEY, seconds);
    });
  }, 1000)
);
